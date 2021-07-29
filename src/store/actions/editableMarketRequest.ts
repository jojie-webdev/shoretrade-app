import { createUpdateAction, createClearAction } from 'utils/Redux';
import { EditableMarketRequestPayload } from 'types/store/EditableMarketRequest';

const ns = 'EDITABLE_MARKET_REQUEST';
const updateAction = createUpdateAction<EditableMarketRequestPayload>(ns);
const clearAction = createClearAction(ns);

const navigationActions = {
  ...updateAction,
  ...clearAction,
};

export default navigationActions;
