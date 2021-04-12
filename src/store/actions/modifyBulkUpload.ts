import { UploadBulkState } from 'types/store/UploadBulkState';
import { createClearAction } from 'utils/Redux';

const ns = 'MODIFY_BULK_UPLOAD';
const clearAction = createClearAction(ns);

const createUpdateAction = () => {
  const localNS = 'UPDATE';
  const localType = `${ns}/${localNS}`;
  return {
    update: (payload: Partial<UploadBulkState> & { index: number }) => ({
      type: localType,
      payload,
    }),
    [localNS]: localType,
  };
};

const createEditAction = () => {
  const localNS = 'EDIT';
  const localType = `${ns}/${localNS}`;
  return {
    edit: (
      payload: Partial<UploadBulkState> & { index: number; currentStep: number }
    ) => ({
      type: localType,
      payload,
    }),
    [localNS]: localType,
  };
};

const updateAction = createUpdateAction();
const editAction = createEditAction();

const navigationActions = {
  ...updateAction,
  ...editAction,
  ...clearAction,
};

export default navigationActions;
