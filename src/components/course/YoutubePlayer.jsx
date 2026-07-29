import { useEffect, useRef, useState } from 'react';
import {
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

const YoutubePlayer = ({
  lessonId,
  youtubeUrl,
  title,
  initialLastPositionSecs = 0,
  onProgressUpdate,
}) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const saveTimerRef = useRef(null);
  const maxPositionRef = useRef(initialLastPositionSecs);
  const playingTimeRef = useRef(0);
  const lastPlayingTickRef = useRef(Date.now());
  const isPlayingRef = useRef(false);
  const completedRef = useRef(false);
  const onProgressUpdateRef = useRef(onProgressUpdate);

  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
  }, [onProgressUpdate]);
  const [watchPercent, setWatchPercent] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const videoId = extractYoutubeVideoId(youtubeUrl);

  const emitProgress = (forceComplete = false) => {
    const player = playerRef.current;
    let duration = 0;
    let current = maxPositionRef.current;

    try {
      if (player?.getDuration) duration = player.getDuration() || 0;
      if (player?.getCurrentTime) {
        current = Math.max(maxPositionRef.current, Math.floor(player.getCurrentTime() || 0));
        maxPositionRef.current = current;
      }
    } catch {
      // player may be destroyed
    }

    const percent = duration > 0
      ? Math.min(100, Math.round((current / duration) * 100))
      : Math.min(100, Math.round(playingTimeRef.current));

    setWatchPercent((prev) => Math.max(prev, percent));

    const shouldComplete =
      !completedRef.current && (forceComplete || percent >= MIN_WATCH_PERCENT);
    if (shouldComplete || (forceComplete && percent >= MIN_WATCH_PERCENT)) {
      completedRef.current = true;
    }

    const isCompletePayload = completedRef.current && percent >= MIN_WATCH_PERCENT;

    const effectiveTimeSpent = Math.max(
      Math.round(playingTimeRef.current),
      current,
      duration > 0 && percent >= MIN_WATCH_PERCENT
        ? Math.ceil(duration * (percent / 100))
        : 0,
    );

    onProgressUpdateRef.current?.(lessonId, {
      watchPercent: percent,
      lastPositionSecs: current,
      timeSpentSecs: effectiveTimeSpent,
      completed: isCompletePayload,
    });
  };

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
              if (initialLastPositionSecs > 0) {
                try {
                  event.target.seekTo(initialLastPositionSecs, true);
                  maxPositionRef.current = initialLastPositionSecs;
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
      const delta = (now - lastPlayingTickRef.current) / 1000;
      lastPlayingTickRef.current = now;
      if (delta > 0 && delta < 3) {
        playingTimeRef.current += delta;
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
          Tracciamento preciso via YouTube API. Completa almeno {MIN_WATCH_PERCENT}% del video.
        </p>
      </div>
    </div>
  );
};

export default YoutubePlayer;
