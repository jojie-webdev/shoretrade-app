import { GetStatesMeta, GetStatesPayload } from 'types/store/GetStatesState';
import { createAsyncReducer } from 'utils/Redux';

import { getStatesActions } from '../actions';

export default createAsyncReducer<GetStatesMeta, GetStatesPayload>(
  getStatesActions
);
