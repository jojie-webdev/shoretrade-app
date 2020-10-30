import moment from 'moment';
import { groupBy } from 'ramda';

import { OrderItem } from '../Orders.props';

const isToday = (date: Date) => moment(date).isSame(moment(), 'day');
const isTomorrow = (date: Date) =>
  moment(date).isSame(moment().add(1, 'day'), 'day');

export const groupByDate = groupBy((order: OrderItem) => {
  const momentDateFormat = 'MMM. D, YYYY';

  const date = order.isAquafuture
    ? order.estCatchmentDate
    : order.estDeliveryDate;

  if (isToday(date)) {
    return 'Today';
  }

  if (isTomorrow(date)) {
    return 'Tomorrow';
  }

  return moment(date).format(momentDateFormat);
});

export const sortByDateAsc = (orders: OrderItem[]) =>
  orders.sort((a, b) => {
    const date1 = a.isAquafuture ? a.estCatchmentDate : a.estDeliveryDate;

    const date2 = b.isAquafuture ? b.estCatchmentDate : b.estDeliveryDate;

    return date1.getTime() - date2.getTime();
  });
