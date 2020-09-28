import { EndListingMeta, EndListingPayload } from 'types/store/EndListingState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'END_LISTING';
const asyncAction = createAsyncAction<EndListingMeta, EndListingPayload>(ns);

const endListingActions = {
  ...asyncAction,
};

export default endListingActions;
