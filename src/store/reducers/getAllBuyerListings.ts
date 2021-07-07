import {
  GetAllBuyerListingsMeta,
  GetAllBuyerListingsPayload,
} from 'types/store/GetAllBuyerListingsState';
import { createAsyncReducer } from 'utils/Redux';

import { getAllBuyerListingsActions } from '../actions';

export default createAsyncReducer<
  GetAllBuyerListingsMeta,
  GetAllBuyerListingsPayload
>(getAllBuyerListingsActions, (state: any, _action: any) => {
  return {
    [`${getAllBuyerListingsActions.REQUEST}/CSV`]: {
      ...state,
      isDownloadingCsv: true,
    },
    [`${getAllBuyerListingsActions.SUCCESS}/CSV`]: {
      ...state,
      isDownloadingCsv: false,
    },
  };
});
