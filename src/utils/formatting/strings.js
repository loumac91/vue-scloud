export function formatTime(timeString) {
  let hours = Math.floor(timeString / 3600);
  let minutes = `0${Math.floor((timeString % 3600) / 60)}`.slice(-2);
  let seconds = `0${Math.floor(timeString % 60)}`.slice(-2);

  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
