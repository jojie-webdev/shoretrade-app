import moment from 'moment';

export default () =>
  moment().get('month') < 8 ? moment().get('year') - 1 : moment().get('year');
