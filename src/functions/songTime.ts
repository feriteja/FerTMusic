export const songTime = (position: number, duration: number) => {
  let minutesDuration: string | number = Math.floor(duration / 60);
  let secondsDuration: string | number = Math.floor(
    duration - minutesDuration * 60,
  );
  let minutesposition: string | number = Math.floor(position / 60);
  let secondsposition: string | number = Math.floor(
    position - minutesposition * 60,
  );

  if (minutesposition < 10) {
    minutesposition = `0${minutesposition}`;
  }
  if (secondsposition < 10) {
    secondsposition = `0${secondsposition}`;
  }
  if (minutesDuration < 10) {
    minutesDuration = `0${minutesDuration}`;
  }
  if (secondsDuration < 10) {
    secondsDuration = `0${secondsDuration}`;
  }

  return `${minutesposition}:${secondsposition} / ${minutesDuration}:${secondsDuration}`;
};
