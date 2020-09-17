import { EditableListingPayload } from 'types/store/EditableListingState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'EDITABLE_LISTING';
const updateAction = createUpdateAction<EditableListingPayload>(ns);
const clearAction = createClearAction(ns);

const editableListingActions = {
  ...updateAction,
  ...clearAction,
};

export default editableListingActions;
