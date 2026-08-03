import { useEffect, useRef, useState } from 'react';
import {
  computePlayedWatchPercent,
  MAX_CONTINUOUS_PLAY_DELTA_SECS,
  MIN_WATCH_PERCENT,
  VIDEO_PROGRESS_SAVE_INTERVAL_MS,
} from '../../features/learning/trackingConstants';
import { extractYoutubeVideoId, loadYoutubeIframeApi } from '../../utils/youtube';

const YT_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

/**
 * YouTube progress uses real play time only.
 * Seeking ahead does not mark the lesson complete.
 */
const YoutubePlayer = ({
  lessonId,
  youtubeUrl,
  title,
  initialLastPositionSecs = 0,
  initialWatchPercent = 0,
  onProgressUpdate,
}) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const saveTimerRef = useRef(null);
  const maxPositionRef = useRef(initialLastPositionSecs);
  const playedSecsRef = useRef(0);
  const lastMediaTimeRef = useRef(initialLastPositionSecs);
  const lastPlayingTickRef = useRef(Date.now());
  const isPlayingRef = useRef(false);
  const completedRef = useRef(initialWatchPercent >= MIN_WATCH_PERCENT);
  const durationRef = useRef(0);
  const seededRef = useRef(false);
  const onProgressUpdateRef = useRef(onProgressUpdate);

  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
  }, [onProgressUpdate]);

  const [watchPercent, setWatchPercent] = useState(initialWatchPercent);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const videoId = extractYoutubeVideoId(youtubeUrl);

  const emitProgress = (forceCheckComplete = false) => {
    const player = playerRef.current;
    let duration = durationRef.current;
    let current = maxPositionRef.current;

    try {
      if (player?.getDuration) {
        duration = player.getDuration() || duration;
        durationRef.current = duration;
      }
      if (player?.getCurrentTime) {
        current = Math.max(0, player.getCurrentTime() || 0);
        maxPositionRef.current = Math.max(maxPositionRef.current, Math.floor(current));
      }
    } catch {
      // player may be destroyed
    }

    if (duration > 0 && !seededRef.current && initialWatchPercent > 0) {
      playedSecsRef.current = Math.max(
        playedSecsRef.current,
        (initialWatchPercent / 100) * duration,
      );
      seededRef.current = true;
    }

    const percent = duration > 0
      ? Math.max(
        initialWatchPercent,
        computePlayedWatchPercent(playedSecsRef.current, duration),
      )
      : Math.min(100, Math.round(playedSecsRef.current));

    setWatchPercent((prev) => Math.max(prev, percent));

    const reached = percent >= MIN_WATCH_PERCENT;
    if (reached) {
      completedRef.current = true;
    }

    // Only send completed:true when real watch threshold is met (never on seek/end alone).
    const isCompletePayload = reached && (forceCheckComplete || completedRef.current);

    onProgressUpdateRef.current?.(lessonId, {
      watchPercent: percent,
      lastPositionSecs: Math.floor(current),
      timeSpentSecs: Math.round(playedSecsRef.current),
      completed: Boolean(isCompletePayload && reached),
    });
  };

  useEffect(() => {
    completedRef.current = initialWatchPercent >= MIN_WATCH_PERCENT;
    setWatchPercent(initialWatchPercent);
    playedSecsRef.current = 0;
    seededRef.current = false;
    maxPositionRef.current = initialLastPositionSecs;
    lastMediaTimeRef.current = initialLastPositionSecs;
  }, [lessonId, initialWatchPercent, initialLastPositionSecs]);

  useEffect(() => {
    if (!videoId || !containerRef.current) return undefined;

    let destroyed = false;
    let playingTimer = null;

    const init = async () => {
      try {
        const YT = await loadYoutubeIframeApi();
        if (destroyed || !containerRef.current) return;

        playerRef.current = new YT.Player(containerRef.current, {
          videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (destroyed) return;
              setReady(true);
              try {
                durationRef.current = event.target.getDuration() || 0;
              } catch {
                // ignore
              }
              if (initialLastPositionSecs > 0) {
                try {
                  event.target.seekTo(initialLastPositionSecs, true);
                  maxPositionRef.current = initialLastPositionSecs;
                  lastMediaTimeRef.current = initialLastPositionSecs;
                } catch {
                  // ignore seek errors
                }
              }
              emitProgress();
            },
            onStateChange: (event) => {
              const state = event.data;
              isPlayingRef.current = state === YT_STATE.PLAYING;
              lastPlayingTickRef.current = Date.now();

              if (state === YT_STATE.PLAYING) {
                try {
                  lastMediaTimeRef.current = playerRef.current?.getCurrentTime?.() || lastMediaTimeRef.current;
                } catch {
                  // ignore
                }
              }

              if (state === YT_STATE.ENDED) {
                emitProgress(true);
              }
            },
          },
        });
      } catch (err) {
        if (!destroyed) {
          setError(err?.message || 'Impossibile caricare il player YouTube');
        }
      }
    };

    init();

    playingTimer = setInterval(() => {
      if (!isPlayingRef.current || completedRef.current) return;

      const now = Date.now();
      const wallDelta = (now - lastPlayingTickRef.current) / 1000;
      lastPlayingTickRef.current = now;

      let mediaDelta = wallDelta;
      try {
        const current = playerRef.current?.getCurrentTime?.() || 0;
        const jump = current - lastMediaTimeRef.current;
        // Prefer media timeline; ignore seek jumps.
        if (jump > 0 && jump <= MAX_CONTINUOUS_PLAY_DELTA_SECS) {
          mediaDelta = jump;
        } else if (jump > MAX_CONTINUOUS_PLAY_DELTA_SECS) {
          mediaDelta = 0;
        }
        lastMediaTimeRef.current = current;
      } catch {
        // fall back to wall clock while playing
      }

      if (mediaDelta > 0 && mediaDelta < 3) {
        playedSecsRef.current += mediaDelta;
      }
      emitProgress();
    }, 1000);

    saveTimerRef.current = setInterval(() => {
      emitProgress();
    }, VIDEO_PROGRESS_SAVE_INTERVAL_MS);

    return () => {
      destroyed = true;
      if (playingTimer) clearInterval(playingTimer);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
      try {
        playerRef.current?.destroy?.();
      } catch {
        // ignore
      }
      playerRef.current = null;
    };
  }, [lessonId, videoId, initialLastPositionSecs]);

  if (!videoId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
        URL YouTube non valido
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-gray-100 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
        <div ref={containerRef} title={title} className="h-full w-full" />
        {!ready ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
            Caricamento video...
          </div>
        ) : null}
      </div>
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
        <div className="flex items-center justify-between gap-3">
          <span>Progresso visione (YouTube)</span>
          <span className="font-semibold text-[#1d1d1d]">{watchPercent}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-[#55B18D] transition-all"
            style={{ width: `${watchPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Guarda almeno il {MIN_WATCH_PERCENT}% del video (senza saltare avanti) per completare
          la lezione. Se non completi la visione resta non vista.
        </p>
      </div>
    </div>
  );
};

export default YoutubePlayer;
