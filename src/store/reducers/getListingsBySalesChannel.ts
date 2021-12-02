import { 
  GetListingsBySalesChannelMeta,
  GetListingsBySalesChannelPayload 
} from 'types/store/GetListingsBySalesChannelState';
import { createAsyncReducer } from 'utils/Redux';
import { getListingsBySalesChannelActions } from 'store/actions';

export default createAsyncReducer<GetListingsBySalesChannelMeta, GetListingsBySalesChannelPayload>(
  getListingsBySalesChannelActions
);
