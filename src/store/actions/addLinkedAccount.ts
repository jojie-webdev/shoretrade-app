import {
  AddLinkedAccountMeta,
  AddLinkedAccountPayload,
} from 'types/store/AddLinkedAccountState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'ADD_LINKED_ACCOUNT';
const asyncAction = createAsyncAction<
  AddLinkedAccountMeta,
  AddLinkedAccountPayload
>(ns);

const addLinkedAccountActions = {
  ...asyncAction,
};

export default addLinkedAccountActions;
