import { UploadBulkMeta, UploadBulkPayload } from 'types/store/UploadBulkState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPLOAD_BULK';
const asyncAction = createAsyncAction<UploadBulkMeta, UploadBulkPayload>(ns);

const uploadBulkActions = {
  ...asyncAction,
};

export default uploadBulkActions;
