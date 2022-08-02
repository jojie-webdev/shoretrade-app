import { SelectedDeliveryMethodPayload } from 'types/store/SelectedDeliveryMethodState';
import { createUpdateAction, createClearAction } from 'utils/Redux';

const ns = 'SELECTED_DELIVERY_METHOD';

const updateAction = createUpdateAction<SelectedDeliveryMethodPayload>(ns);
const clearAction = createClearAction(ns);

const selectedDeliveryMethodActions = {
  ...updateAction,
  ...clearAction,
};

export default selectedDeliveryMethodActions;
