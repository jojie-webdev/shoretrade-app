import { createAsyncAction } from 'utils/Redux';
import { 
  GetListingsBySalesChannelMeta, 
  GetListingsBySalesChannelPayload 
} from 'types/store/GetListingsBySalesChannelState';

const ns = 'GET_LISTINGS_BY_SALES_CHANNEL';
const asyncAction = createAsyncAction<
  GetListingsBySalesChannelMeta,
  GetListingsBySalesChannelPayload
>(ns);

const getListingsBySalesChannelActions = {
  ...asyncAction
};

export default getListingsBySalesChannelActions;
