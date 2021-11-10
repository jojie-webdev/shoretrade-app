import { UseHistoricalListingPayload } from 'types/store/UseHistoricalListingState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'USE_HISTORICAL_LISTING';
const updateAction = createUpdateAction<UseHistoricalListingPayload>(ns);
const clearAction = createClearAction(ns);

const navigationActions = {
  ...updateAction,
  ...clearAction,
};

export default navigationActions;
