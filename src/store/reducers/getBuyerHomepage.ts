import { createAsyncReducer } from 'utils/Redux';
import { GetBuyerHomepageMeta, GetBuyerHomepagePayload } from 'types/store/GetBuyerHomepageState';
import { getBuyerHomepageActions } from '../actions';

export default createAsyncReducer<
    GetBuyerHomepageMeta,
    GetBuyerHomepagePayload>
    (getBuyerHomepageActions);