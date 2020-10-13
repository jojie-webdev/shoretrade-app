import React, { ChangeEvent, useState, useEffect } from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import { remove } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import {
  searchAndCountProductTypeActions,
  currentAddressActions,
  historyActions,
  getBuyerHomepageActions,
} from 'store/actions';
import { GetAddressOptions, GetDefaultCompany } from 'store/selectors/buyer';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import chunkArray from 'utils/chunkArray';

import { HomeGeneratedProps, CreditState } from './Home.props';
import HomeView from './Home.view';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();

  const addresses = GetAddressOptions();
  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';
  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation(); // check this out

  const loading =
    useSelector((state: Store) => state.searchAndCountProductType.pending) ||
    false;

  const results =
    useSelector(
      (state: Store) => state.searchAndCountProductType.data?.data.types
    ) || [];

  const recentlyAdded =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.recentListing
    ) || [];

  const sellers =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.sellers
    ) || [];

  const favouriteSellers =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.favouriteSellers
    ) || [];

  const search = () => {
    dispatch(
      searchAndCountProductTypeActions.request({
        term: searchTerm,
        address: '',
      })
    );
  };

  const onReset = () => {
    setSearchTerm('');
  };

  const recent =
    useSelector((state: Store) => state.history.buyerRecentSearch) || [];

  const saveSearchHistory = (id: string, label: string, count: string) => {
    const historyLimit = 20;
    const isExisting = recent.findIndex((r) => r.value === id) !== -1;
    if (!isExisting) {
      dispatch(
        historyActions.update({
          buyerRecentSearch: [
            ...(recent.length === historyLimit ? remove(0, 1, recent) : recent),
            {
              value: id,
              label,
              count,
            },
          ],
        })
      );
    }
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      search();
    }, 800);

    setTimer(timerId);
  }, [searchTerm]);

  const company = GetDefaultCompany();
  // const [loading, setLoading] = useState<boolean>(true);
  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  useEffect(() => {
    if (company) {
      setCurrentCompany(company);
      // setLoading(false);
    }
  });

  const bannerData =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.bannerData.app
    ) || [];

  const creditBalance = currentCompany?.credit || '0';

  const getCreditState = (): CreditState => {
    if (Number(currentCompany?.credit || 0) === 0) {
      return 'empty';
    }

    if (Number(currentCompany?.credit || 0) < 250) {
      return 'lessThan';
    }

    if (currentCompany?.debtFinancing && !currentCompany.isApproved) {
      return 'pending';
    }

    return 'normal';
  };

  const creditState: CreditState = getCreditState();

  const featured: string[] = bannerData;
  const favourites =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.favouriteListing
    ) || [];

  const categories =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.categories
    ) || [];

  const mdBreakpoint = useMediaQuery({
    query: BREAKPOINTS.md,
  });

  const generatedProps: HomeGeneratedProps = {
    search,
    searchTerm,
    setSearchTerm,
    loading,
    results,
    onReset,
    recent,
    addresses,
    selectedAddress,
    selectAddress,
    saveSearchHistory,
    favourites,
    categories,
    creditState,
    creditBalance,
    featured,
    recentlyAdded,
    favouriteSellers,
    sellers,
    chunkedCategories: chunkArray(categories, mdBreakpoint ? 3 : 4),
    chunkedFavorites: chunkArray(favourites, 3),
    chunkedRecentlyAdded: chunkArray(recentlyAdded, mdBreakpoint ? 3 : 4),
    chunkedFavouriteSellers: chunkArray(favouriteSellers, mdBreakpoint ? 3 : 4),
    chunkedSellers: chunkArray(sellers, mdBreakpoint ? 3 : 4),
  };

  return <HomeView {...generatedProps} />;
};

export default Home;
