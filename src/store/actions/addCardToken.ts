import {
  AddCardTokenMeta,
  AddCardTokenPayload,
} from 'types/store/AddCardTokenState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'ADD_CARD_TOKEN';
const asyncAction = createAsyncAction<AddCardTokenMeta, AddCardTokenPayload>(
  ns
);

const addCardTokenActions = {
  ...asyncAction,
};

export default addCardTokenActions;
