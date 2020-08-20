import { RegisterMeta, RegisterPayload } from 'types/store/RegisterState';
import { createAsyncReducer } from 'utils/Redux';

import { registerActions } from '../actions';

export default createAsyncReducer<RegisterMeta, RegisterPayload>(
  registerActions
);
