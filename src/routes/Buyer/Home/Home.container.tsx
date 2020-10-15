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
  updateAddressActions,
  cartActions,
} from 'store/actions';
import { GetAddressOptions, GetDefaultCompany } from 'store/selectors/buyer';
import { PlaceData } from 'types/PlaceData';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import chunkArray from 'utils/chunkArray';

import { HomeGeneratedProps, CreditState } from './Home.props';
import {
  addressToPlaceData,
  placeDataToUpdateAddressMeta,
} from './Home.transform';
import HomeView from './Home.view';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();

  //#region Address Related
  const companyAdressDefault = GetDefaultCompany();
  const [companyId, setCompanyId] = useState('');
  const getAddress = useSelector((state: Store) => state.getAddresses);
  const addresses = getAddress.data?.data.addresses || [];
  const addressOptions = GetAddressOptions();

  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';

  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

  const currentAddress = addresses.find((a) => a.id === selectedAddress);

  const initialAddress = currentAddress
    ? addressToPlaceData(currentAddress)
    : null;
  const [address, setAddress] = useState<PlaceData | null>(initialAddress);

  const changeDefaultAddress = async (id: string) => {
    const filtererdAddress = await addresses.filter(
      (addr) => addr.id === id
    )[0];
    const isDefault = true;
    await dispatch(
      updateAddressActions.request(
        placeDataToUpdateAddressMeta(
          addressToPlaceData(filtererdAddress) as PlaceData,
          filtererdAddress.unitNumber,
          companyId,
          isDefault,
          id
        )
      )
    );
    await dispatch(cartActions.clear());
  };

  useEffect(() => {
    if (currentAddress) {
      setAddress(addressToPlaceData(currentAddress));
    }
  }, [currentAddress]);

  useEffect(() => {
    setCompanyId(companyAdressDefault?.id || '');
  }, [companyAdressDefault]);
  //#endregion

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

  const xlBreakpoint = useMediaQuery({
    query: BREAKPOINTS.xl,
  });

  const xxlBreakpoint = useMediaQuery({
    query: BREAKPOINTS.xxl,
  });

  const lgBreakpoint = useMediaQuery({
    query: BREAKPOINTS.lg,
  });

  const chunkNumber = (): number => {
    if (lgBreakpoint || xlBreakpoint || xxlBreakpoint) return 4;

    return 1;
  };

  const laptop = lgBreakpoint || xlBreakpoint || xxlBreakpoint;

  const generatedProps: HomeGeneratedProps = {
    search,
    searchTerm,
    setSearchTerm,
    loading,
    results,
    onReset,
    recent,
    featured,
    addresses,
    addressOptions,
    selectedAddress,
    selectAddress,
    saveSearchHistory,
    creditState,
    creditBalance,
    recentlyAdded,
    chunkedCategories: chunkArray(categories, laptop ? 4 : 1),
    chunkedFavorites: chunkArray(favourites, chunkNumber()),
    chunkedRecentlyAdded: chunkArray(recentlyAdded, chunkNumber()),
    chunkedFavouriteSellers: chunkArray(favouriteSellers, chunkNumber()),
    chunkedSellers: chunkArray(sellers, chunkNumber()),
    changeDefaultAddress,
  };

  return <HomeView {...generatedProps} />;
};

export default Home;
