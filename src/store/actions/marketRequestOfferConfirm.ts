import { GenericResponse } from 'types/GenericResponse';
import { OfferConfirm } from 'types/store/MarketOfferState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'MARKET_REQUEST_OFFER_CONFIRM';
const asyncAction = createAsyncAction<OfferConfirm, GenericResponse>(ns);

const marketRequestOfferConfirmActions = {
  ...asyncAction,
};

export default marketRequestOfferConfirmActions;
