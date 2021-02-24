import { UploadBulkMeta, UploadBulkPayload } from 'types/store/UploadBulkState';
import { createAsyncReducer } from 'utils/Redux';

import { uploadBulkActions } from '../actions';

export default createAsyncReducer<UploadBulkMeta, UploadBulkPayload>(
  uploadBulkActions
);
