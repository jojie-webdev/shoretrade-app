import {
  AddCardTokenMeta,
  AddCardTokenPayload,
} from 'types/store/AddCardTokenState';
import { createAsyncAction, createClearAction } from 'utils/Redux';

const ns = 'ADD_CARD_TOKEN';
const asyncAction = createAsyncAction<AddCardTokenMeta, AddCardTokenPayload>(
  ns
);
const clearAction = createClearAction(ns);

const addCardTokenActions = {
  ...asyncAction,
  ...clearAction,
};

export default addCardTokenActions;
