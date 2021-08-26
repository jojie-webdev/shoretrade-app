import moment from 'moment';

export default () =>
  moment().get('month') >= 6 ? moment().get('year') : moment().get('year') - 1;
