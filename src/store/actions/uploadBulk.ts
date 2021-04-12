import { UploadBulkMeta, UploadBulkPayload } from 'types/store/UploadBulkState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPLOAD_BULK';
const asyncAction = createAsyncAction<UploadBulkMeta, UploadBulkPayload>(ns);

const createModifyAction = () => {
  const localNS = 'MODIFY';
  const localType = `${ns}/${localNS}`;
  return {
    add: (payload: any) => ({
      type: localType,
      payload,
    }),
    [localNS]: localType,
  };
};

const modifyAction = createModifyAction();

const uploadBulkActions = {
  ...asyncAction,
  ...modifyAction,
};

export default uploadBulkActions;
