import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
} from 'types/store/GetListingFormDataState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_LISTING_FORM_DATA';
const asyncAction = createAsyncAction<
  GetListingFormDataMeta,
  GetListingFormDataPayload
>(ns);

const getListingFormDataActions = {
  ...asyncAction,
};

export default getListingFormDataActions;
