import {
  GetBuyerHomepageMeta,
  GetBuyerHomepagePayload,
} from 'types/store/GetBuyerHomepageState';
import { createAsyncReducer } from 'utils/Redux';

import { getBuyerHomepageActions } from '../actions';

export default createAsyncReducer<
  GetBuyerHomepageMeta,
  GetBuyerHomepagePayload
>(getBuyerHomepageActions);
