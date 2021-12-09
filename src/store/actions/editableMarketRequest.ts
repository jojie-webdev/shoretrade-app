import { EditableMarketRequestMeta } from 'types/store/EditableMarketRequest';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'EDITABLE_MARKET_REQUEST';
const updateAction = createUpdateAction<EditableMarketRequestMeta>(ns);
const clearAction = createClearAction(ns);

const navigationActions = {
  ...updateAction,
  ...clearAction,
};

export default navigationActions;
