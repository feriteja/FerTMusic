export const songTime = (position: number, duration: number) => {
  const minutesDuration = Math.floor(duration / 60);
  const secondsDuration = Math.floor(duration - minutesDuration * 60);
  const minutesposition = Math.floor(position / 60);
  const secondsposition = Math.floor(position - minutesposition * 60);

  return `${minutesposition}:${secondsposition}/${minutesDuration}:${secondsDuration}`;
};
