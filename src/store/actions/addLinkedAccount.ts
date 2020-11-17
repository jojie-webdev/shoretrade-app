import {
  AddLinkedAccountMeta,
  AddLinkedAccountPayload,
} from 'types/store/AddLinkedAccountState';
import { createAsyncAction, createClearAction } from 'utils/Redux';

const ns = 'ADD_LINKED_ACCOUNT';
const asyncAction = createAsyncAction<
  AddLinkedAccountMeta,
  AddLinkedAccountPayload
>(ns);
const clearAction = createClearAction(ns);
const addLinkedAccountActions = {
  ...asyncAction,
  ...clearAction,
};

export default addLinkedAccountActions;
