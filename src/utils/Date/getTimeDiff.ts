import moment from 'moment';

export default (time: Date): string => {
  const diff: number = -moment().diff(time, 'minutes');
  const days: number = Math.floor(diff / 1440);
  const hours: number = Math.floor(diff / 60) % 24;
  const minutes: number = diff % 60;

  const timeParts: Array<string> = [
    days ? `${days} day${days > 1 ? 's' : ''}` : '',
    hours ? `${hours} hr${hours > 1 ? 's' : ''}` : '',
    minutes ? `${minutes} min${minutes > 1 ? 's' : ''}` : '',
  ].filter((part: string): boolean => part !== '');

  return timeParts.join(' ');
};
