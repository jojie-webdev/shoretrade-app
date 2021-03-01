import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  getActiveOffersActions,
  getAllMarketRequestActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { TabOptions } from './Landing.props';
import MarketBoardLandingView from './Landing.view';

const MarketBoardLanding = (): JSX.Element => {
  const dispatch = useDispatch();

  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );
  const activeOffers = useSelector((store: Store) => store.getActiveOffers);

  const [currentTab, setCurrentTab] = useState<TabOptions>('Buyer Requests');
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

  const generatedProps = {
    buyerRequests: buyerRequests.data?.data.marketRequests || [],
    activeOffers: activeOffers.data?.data.marketOffers || [],
    isLoading: buyerRequests.pending || activeOffers.pending || false,
    currentTab,
    onChangeCurrentTab,
    searchTerm,
    setSearchTerm,
  };
  return <MarketBoardLandingView {...generatedProps} />;
};

export default MarketBoardLanding;
