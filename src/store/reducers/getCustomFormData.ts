import {
  GetCustomFormDataMeta,
  GetCustomFormDataPayload,
} from 'types/store/GetCustomFormDataState';
import { createAsyncReducer } from 'utils/Redux';

import { getCustomFormDataActions } from '../actions';

export default createAsyncReducer<
  GetCustomFormDataMeta,
  GetCustomFormDataPayload
>(getCustomFormDataActions);
