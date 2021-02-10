import {
  UpdateMarketInterestsMeta,
  UpdateMarketInterestsPayload,
} from 'types/store/UpdateMarketInterestsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_MARKET_INTERESTS';
const asyncAction = createAsyncAction<
  UpdateMarketInterestsMeta,
  UpdateMarketInterestsPayload
>(ns);

const UpdateMarketInterestsActions = {
  ...asyncAction,
};

export default UpdateMarketInterestsActions;
