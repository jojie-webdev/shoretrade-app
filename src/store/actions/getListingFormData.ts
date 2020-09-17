import { createAsyncAction } from 'utils/Redux';
import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
} from 'types/store/GetListingFormDataState';

const ns = 'GET_LISTING_FORM_DATA';
const asyncAction = createAsyncAction<
  GetListingFormDataMeta,
  GetListingFormDataPayload
>(ns);

const getListingFormDataActions = {
  ...asyncAction,
};

export default getListingFormDataActions;
