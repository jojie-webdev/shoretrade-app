import { NotificationType } from 'types/store/NotifyState';

const ns = 'NOTIFY';
const ADD = `${ns}/ADD`;
const CLEAR = `${ns}/CLEAR`;

const notifyActions = {
  add: (type: NotificationType) => ({
    type: ADD,
    payload: type,
  }),
  ADD,
  clear: () => ({
    type: CLEAR,
    payload: '',
  }),
  CLEAR: CLEAR,
};

export default notifyActions;
