import { GlobalModalState } from 'types/store/GlobalModalState';
import { createClearAction, createSetAction } from 'utils/Redux';

const ns = 'GLOBAL_MODAL';
const setAction = createSetAction<GlobalModalState>(ns);
const clearAction = createClearAction(ns);

const globalModalActions = {
  ...setAction,
  ...clearAction,
};

export default globalModalActions;
