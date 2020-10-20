import React, { useState, useEffect } from 'react';

import { remove } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import {
  searchAndCountProductTypeActions,
  currentAddressActions,
  historyActions,
  updateAddressActions,
  cartActions,
} from 'store/actions';
import { GetAddressOptions, GetDefaultCompany } from 'store/selectors/buyer';
import { PlaceData } from 'types/PlaceData';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import { HomeGeneratedProps, CreditState, HomeData } from './Home.props';
import {
  addressToPlaceData,
  placeDataToUpdateAddressMeta,
} from './Home.transform';
import HomeView from './Home.view';

const Home = (): JSX.Element => {
  // MARK:- Hooks
  const dispatch = useDispatch();

  // MARK:- Store
  const buyerHomePageData = useSelector(
    (state: Store) => state.getBuyerHomepage.data?.data.data || {}
  );

  const results =
    useSelector(
      (state: Store) => state.searchAndCountProductType.data?.data.types
    ) || [];

  const companyAdressDefault = GetDefaultCompany();

  const getAddress = useSelector((state: Store) => state.getAddresses);

  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';

  const loading =
    useSelector((state: Store) => state.searchAndCountProductType.pending) ||
    false;

  const recent =
    useSelector((state: Store) => state.history.buyerRecentSearch) || [];

  const bannerData =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.bannerData.web
    ) || [];

  // MARK:- Variables
  const {
    categories,
    favouriteListing,
    favouriteSellers,
    recentListing,
    sellers,
  } = buyerHomePageData as HomeData;

  const addressOptions = GetAddressOptions();
  const company = GetDefaultCompany();
  const addresses = getAddress.data?.data.addresses || [];
  const currentAddress = addresses.find((a) => a.id === selectedAddress);
  const initialAddress = currentAddress
    ? addressToPlaceData(currentAddress)
    : null;

  // MARK:- State
  const [companyId, setCompanyId] = useState('');
  const [address, setAddress] = useState<PlaceData | null>(initialAddress);
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  // MARK:- Methods
  const search = () => {
    dispatch(
      searchAndCountProductTypeActions.request({
        term: searchTerm,
        address: '',
      })
    );
  };

  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

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

  const onReset = () => {
    setSearchTerm('');
  };

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

  // MARK:- Effects
  useEffect(() => {
    if (currentAddress) {
      setAddress(addressToPlaceData(currentAddress));
    }
  }, [currentAddress]);

  useEffect(() => {
    setCompanyId(companyAdressDefault?.id || '');
  }, [companyAdressDefault]);

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

  useEffect(() => {
    if (company) {
      setCurrentCompany(company);
      // setLoading(false);
    }
  });

  // MARK:- Bottom Variables
  const creditBalance = currentCompany?.credit || '0';
  const creditState: CreditState = getCreditState();
  const featured: string[] = bannerData;

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
    recentlyAdded: recentListing,
    categories,
    favourites: favouriteListing,
    favouriteSellers,
    sellers,
    changeDefaultAddress,
  };

  return <HomeView {...generatedProps} />;
};

export default Home;
