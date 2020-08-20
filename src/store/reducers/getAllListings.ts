import {
  GetAllListingsMeta,
  GetAllListingsPayload,
} from 'types/store/GetAllListingsState';
import { createAsyncReducer } from 'utils/Redux';

import { getAllListingsActions } from '../actions';

export default createAsyncReducer<GetAllListingsMeta, GetAllListingsPayload>(
  getAllListingsActions
);
