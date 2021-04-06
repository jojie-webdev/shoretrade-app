import { EditableMarketRequestPayload } from 'types/store/EditableMarketRequest';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'EDITABLE_MARKET_REQUEST';
const updateAction = createUpdateAction<EditableMarketRequestPayload>(ns);
const clearAction = createClearAction(ns);

const editableMarketRequestActions = {
  ...updateAction,
  ...clearAction,
};

export default editableMarketRequestActions;
