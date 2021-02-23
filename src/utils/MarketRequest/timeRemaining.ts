import moment from 'moment';

export function computeTimeRemaining(createdAt: string) {
  let result = 'Expired';

  const createdParsed = moment(createdAt);
  const expiry = moment(createdParsed.add(7, 'days'));
  const today = moment();

  if (expiry.diff(today) > 0) {
    result = today.to(expiry);
  }
  return result;
}
