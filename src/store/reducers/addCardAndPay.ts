import {
  AddCardAndPayMeta,
  AddCardAndPayPayload,
} from 'types/store/AddCardAndPayState';
import { createAsyncReducer } from 'utils/Redux';

import { addCardAndPayActions } from '../actions';

export default createAsyncReducer<AddCardAndPayMeta, AddCardAndPayPayload>(
  addCardAndPayActions
);
