import { EndListingMeta, EndListingPayload } from 'types/store/EndListingState';
import { createAsyncReducer } from 'utils/Redux';

import { endListingActions } from '../actions';

export default createAsyncReducer<EndListingMeta, EndListingPayload>(
  endListingActions
);
