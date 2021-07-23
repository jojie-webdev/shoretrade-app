import {
  SocketAllBuyerListingsMeta,
  SocketAllBuyerListingsPayload,
} from 'types/store/socketAllBuyerListingsState';
import { createSocketAction } from 'utils/Redux';

const ns = 'WEB_SOCKET/AllBuyerListings';

const SocketAllBuyerListingsAction = createSocketAction<
  SocketAllBuyerListingsMeta,
  SocketAllBuyerListingsPayload
>(ns);

const SocketAllBuyerListingsActions = {
  ...SocketAllBuyerListingsAction,
};

export default SocketAllBuyerListingsActions;
