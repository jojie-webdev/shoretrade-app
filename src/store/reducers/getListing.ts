import pathOr from 'ramda/es/pathOr';
import { GetListingMeta, GetListingPayload } from 'types/store/GetListingState';
import { createAsyncReducer } from 'utils/Redux';

import { getListingActions } from '../actions';

export default createAsyncReducer<GetListingMeta, GetListingPayload>(
  getListingActions,
  // customEventsHandler
  // Preserve existing listing data if getting the same listing id
  (state, action) => {
    return {
      [getListingActions.REQUEST]: {
        data:
          action.meta?.listingId === state.request?.listingId
            ? state.data
            : null,
        error: '',
        pending: true,
        request: pathOr(null, ['meta'], action),
      },
    };
  }
);
