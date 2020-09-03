import {
  DeleteLinkedAccountMeta,
  DeleteLinkedAccountPayload,
} from 'types/store/DeleteLinkedAccountState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'DELETE_LINKED_ACCOUNT';
const asyncAction = createAsyncAction<
  DeleteLinkedAccountMeta,
  DeleteLinkedAccountPayload
>(ns);

const deleteLinkedAccountActions = {
  ...asyncAction,
};

export default deleteLinkedAccountActions;
