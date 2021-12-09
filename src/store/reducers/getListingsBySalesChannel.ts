import { getListingsBySalesChannelActions } from 'store/actions';
import {
  GetListingsBySalesChannelMeta,
  GetListingsBySalesChannelPayload,
} from 'types/store/GetListingsBySalesChannelState';
import { createAsyncReducer } from 'utils/Redux';

export default createAsyncReducer<
  GetListingsBySalesChannelMeta,
  GetListingsBySalesChannelPayload
>(getListingsBySalesChannelActions);
