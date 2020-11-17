import {
  GetCustomFormDataMeta,
  GetCustomFormDataPayload,
} from 'types/store/GetCustomFormDataState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_CUSTOM_FORM_DATA';
const asyncAction = createAsyncAction<
  GetCustomFormDataMeta,
  GetCustomFormDataPayload
>(ns);

const getCustomFormDataActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getCustomFormDataActions;
