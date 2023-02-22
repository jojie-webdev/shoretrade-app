import { ShowNegotiableState } from 'types/store/ShowNegotiableState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'SHOW_NEGOTIABLE';
const updateAction = createUpdateAction<ShowNegotiableState>(ns);
const clearAction = createClearAction(ns);

const showNegotiableActions = {
  ...updateAction,
  ...clearAction,
};

export default showNegotiableActions;
