import {
  GetMarketInterestsMeta,
  GetMarketInterestsPayload,
} from 'types/store/GetMarketInterestsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_MARKET_INTERESTS';
const asyncAction = createAsyncAction<
  GetMarketInterestsMeta,
  GetMarketInterestsPayload
>(ns);

const GetMarketInterestsActions = {
  ...asyncAction,
};

export default GetMarketInterestsActions;
