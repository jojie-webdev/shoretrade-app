import React, { useState } from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useHistory, useLocation } from 'react-router-dom';
import { MarketOfferItem } from 'types/store/CreateMarketOfferState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';

import RequestAndNegotiateView from './RequestAndNegotiate.view';

const RequestAndNegotiate = (): JSX.Element => {
  const history = useHistory();
  const {
    state,
  }: {
    state: { buyerRequest?: GetAllMarketRequestResponseItem };
  } = useLocation();
  const buyerRequest = state?.buyerRequest;

  const [offer, setOffer] = useState<MarketOfferItem[]>([]);

  if (!buyerRequest) {
    history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING);
    return <></>;
  }

  const generatedProps = {
    buyerRequest,
    offer,
    setOffer,
  };
  return <RequestAndNegotiateView {...generatedProps} />;
};

export default RequestAndNegotiate;
