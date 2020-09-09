import { HistoryState } from 'types/store/HistoryState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'HISTORY';
const updateAction = createUpdateAction<HistoryState>(ns);
const clearAction = createClearAction(ns);

const historyActions = {
  ...updateAction,
  ...clearAction,
};

export default historyActions;
