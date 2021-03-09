import React, { useEffect, useState } from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getActiveOffersActions,
  getAllMarketRequestActions,
} from 'store/actions';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { Store } from 'types/store/Store';

import { TabOptions } from './Landing.props';
import MarketBoardLandingView from './Landing.view';

const MarketBoardLanding = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: { state?: { currentTab?: string } } = useLocation();
  const locationTab = location.state?.currentTab || 'Buyer Requests';

  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );
  const activeOffers = useSelector((store: Store) => store.getActiveOffers);

  const [currentTab, setCurrentTab] = useState<TabOptions>(
    locationTab as TabOptions
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [initial, setInitial] = useState(true);

  const onChangeCurrentTab = (newTab: TabOptions) => setCurrentTab(newTab);

  useEffect(() => {
    if (currentTab === 'Buyer Requests') {
      dispatch(getAllMarketRequestActions.request({}));
    } else {
      dispatch(getActiveOffersActions.request({}));
    }

    setInitial(false);
    setSearchTerm('');
  }, [currentTab]);

  useEffect(() => {
    if (initial) return;

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      if (currentTab === 'Buyer Requests') {
        dispatch(
          getAllMarketRequestActions.request({
            queryParams: {
              term: searchTerm.length > 2 ? searchTerm : '',
            },
          })
        );
      } else {
        dispatch(
          getActiveOffersActions.request({
            queryParams: {
              term: searchTerm.length > 2 ? searchTerm : '',
            },
          })
        );
      }
    }, 800);

    setTimer(timerId);
  }, [searchTerm]);

  const onClickOffer = (data: GetAllMarketRequestResponseItem) => {
    history.push(SELLER_MARKET_BOARD_ROUTES.OFFER, {
      buyerRequest: data,
    });
  };

  const onClickActiveOffer = (data: GetActiveOffersRequestResponseItem) => {
    history.push(SELLER_MARKET_BOARD_ROUTES.NEGOTIATE, {
      activeOffer: data,
    });
  };

  const generatedProps = {
    buyerRequests: buyerRequests.data?.data.marketRequests || [],
    activeOffers: activeOffers.data?.data.marketOffers || [],
    isLoading: buyerRequests.pending || activeOffers.pending || false,
    currentTab,
    onChangeCurrentTab,
    searchTerm,
    setSearchTerm,
    onClickOffer,
    onClickActiveOffer,
  };
  return <MarketBoardLandingView {...generatedProps} />;
};

export default MarketBoardLanding;
