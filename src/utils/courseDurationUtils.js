export const sumLessonDurationSecs = (lessons = []) =>
  lessons.reduce((total, lesson) => {
    const secs = Number(lesson?.durationSecs);
    return total + (Number.isFinite(secs) && secs > 0 ? secs : 0);
  }, 0);

export const formatSecondsAsDuration = (totalSecs = 0) => {
  const secs = Number(totalSecs);
  if (!Number.isFinite(secs) || secs <= 0) return '—';

  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const remainingSecs = secs % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  if (minutes > 0 && remainingSecs > 0) {
    return `${minutes}m ${remainingSecs}s`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${remainingSecs}s`;
};

export const secondsToRoundedMinutes = (totalSecs = 0) => {
  const secs = Number(totalSecs);
  if (!Number.isFinite(secs) || secs <= 0) return 0;
  return Math.max(1, Math.round(secs / 60));
};

export const minutesToRoundedHours = (totalMinutes = 0) => {
  const minutes = Number(totalMinutes);
  if (!Number.isFinite(minutes) || minutes <= 0) return undefined;
  return Math.max(1, Math.ceil(minutes / 60));
};
