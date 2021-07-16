import {
  AddCardAndPayMeta,
  AddCardAndPayPayload,
} from 'types/store/AddCardAndPayState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'ADD_CARD_AND_PAY';
const asyncAction = createAsyncAction<AddCardAndPayMeta, AddCardAndPayPayload>(
  ns
);

const addCardAndPayActions = {
  ...asyncAction,
};

export default addCardAndPayActions;
