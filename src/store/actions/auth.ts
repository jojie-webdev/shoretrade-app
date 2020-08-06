import { AuthState } from 'types/store/AuthState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'AUTH';
const updateAction = createUpdateAction<AuthState>(ns);
const clearAction = createClearAction(ns);

const authActions = {
  ...updateAction,
  ...clearAction,
};

export default authActions;
