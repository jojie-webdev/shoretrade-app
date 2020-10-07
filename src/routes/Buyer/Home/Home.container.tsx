import React, { ChangeEvent, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { currentAddressActions, getBuyerHomepageActions } from 'store/actions';
import { GetAddressOptions, GetDefaultCompany } from 'store/selectors/buyer';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import { HomeGeneratedProps, CreditState } from './Home.props';
import HomeView from './Home.view';

const Home = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const location = useLocation();
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

  const favourites = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.favouriteListing
    ) || []
  ).filter((result) =>
    search ? result.type.toLowerCase().includes(search.toLowerCase()) : true
  );

  const categories = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.categories
    ) || []
  ).filter((category) =>
    search ? category.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  const recentlyAdded = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.recentListing
    ) || []
  ).filter((recent) =>
    search ? recent.type.toLowerCase().includes(search.toLowerCase()) : true
  );

  const sellers =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.sellers
    ) || [];

  const favouriteSellers =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.favouriteSellers
    ) || [];

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onLoad = () => {
    dispatch(getBuyerHomepageActions.request());
  };

  const resetSearchValue = () => {
    setSearch('');
  };

  const company = GetDefaultCompany();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  useEffect(() => {
    if (company) {
      setCurrentCompany(company);
      setLoading(false);
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

  const generatedProps: HomeGeneratedProps = {
    addresses,
    selectedAddress,
    selectAddress,
    favourites,
    categories,
    search,
    onChangeSearchValue,
    resetSearchValue,
    loading,
    creditState,
    creditBalance,
    featured,
    recentlyAdded,
    favouriteSellers,
    sellers,
  };

  return <HomeView {...generatedProps} />;
};

export default Home;
