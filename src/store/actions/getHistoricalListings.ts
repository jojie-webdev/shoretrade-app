import {
  GetHistoricalListingsMeta,
  GetHistoricalListingsPayload,
} from 'types/store/GetHistoricalListingsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_HISTORICAL_LISTINGS';
const asyncAction = createAsyncAction<
  GetHistoricalListingsMeta,
  GetHistoricalListingsPayload
>(ns);

const getHistoricalListingsActions = {
  ...asyncAction,
};

export default getHistoricalListingsActions;
