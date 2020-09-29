import { createUpdateAction, createClearAction } from 'utils/Redux';
import { EditSelectedListingPayload } from 'types/store/EditSelectedListingState';

const ns = 'EDIT_SELECTED_LISTING';
const updateAction = createUpdateAction<EditSelectedListingPayload>(ns);
const clearAction = createClearAction(ns);

const navigationActions = {
  ...updateAction,
  ...clearAction,
};

export default navigationActions;
