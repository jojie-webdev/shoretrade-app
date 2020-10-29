import { EditSelectedListingPayload } from 'types/store/EditSelectedListingState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'EDIT_SELECTED_LISTING';
const updateAction = createUpdateAction<EditSelectedListingPayload>(ns);
const clearAction = createClearAction(ns);

const navigationActions = {
  ...updateAction,
  ...clearAction,
};

export default navigationActions;
