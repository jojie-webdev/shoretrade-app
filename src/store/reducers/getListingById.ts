import { 
  GetListingByIdMeta, 
  GetListingByIdPayload 
} from 'types/store/GetListingByIdState';
import { createAsyncReducer } from 'utils/Redux';
import { getListingByIdActions } from 'store/actions';

export default createAsyncReducer<GetListingByIdMeta, GetListingByIdPayload>(
  getListingByIdActions
);
