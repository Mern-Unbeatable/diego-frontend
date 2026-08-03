export const extractYoutubeVideoId = (url) => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '').trim();
      return id || null;
    }
    const fromQuery = parsed.searchParams.get('v');
    if (fromQuery) return fromQuery;
    const embedMatch = parsed.pathname.match(/\/embed\/([^/?]+)/);
    if (embedMatch?.[1]) return embedMatch[1];
    return null;
  } catch {
    return null;
  }
};

let youtubeApiPromise = null;

export const loadYoutubeIframeApi = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('YouTube API requires browser'));
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise((resolve, reject) => {
      const onReady = () => {
        if (window.YT?.Player) {
          resolve(window.YT);
        } else {
          reject(new Error('YouTube IFrame API failed to initialize'));
        }
      };

      const existing = document.getElementById('youtube-iframe-api');
      if (!existing) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.onerror = () => reject(new Error('Failed to load YouTube IFrame API'));
        document.body.appendChild(tag);
      }

      if (window.YT?.Player) {
        resolve(window.YT);
        return;
      }

      window.onYouTubeIframeAPIReady = onReady;
    });
  }

  return youtubeApiPromise;
};
