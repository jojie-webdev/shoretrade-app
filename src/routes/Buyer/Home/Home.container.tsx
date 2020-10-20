import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateAddressActions, cartActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
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
    (state: Store) => state.getBuyerHomepage
  );

  const companyAdressDefault = GetDefaultCompany();

  const getAddress = useSelector((state: Store) => state.getAddresses);

  const loading =
    useSelector((state: Store) => state.searchAndCountProductType.pending) ||
    false;

  // MARK:- Variables
  const {
    categories,
    favouriteListing,
    favouriteSellers,
    recentListing,
    sellers,
    bannerData,
  } = (buyerHomePageData.data?.data.data || {}) as HomeData;

  const company = GetDefaultCompany();
  const addresses = getAddress.data?.data.addresses || [];
  const featured: string[] = bannerData?.web || [];
  const loadingHomePage = buyerHomePageData.pending === null ? true : false;

  // MARK:- State
  const [companyId, setCompanyId] = useState('');
  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  // MARK:- Methods
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
    setCompanyId(companyAdressDefault?.id || '');
  }, [companyAdressDefault]);

  useEffect(() => {
    if (company) {
      setCurrentCompany(company);
    }
  }, [company]);

  // MARK:- Bottom Variables
  const creditBalance = currentCompany?.credit || '0';
  const creditState: CreditState = getCreditState();

  const generatedProps: HomeGeneratedProps = {
    // Credit Data
    loading,
    featured,
    creditState,
    creditBalance,
    // Carousel Data
    recentlyAdded: recentListing,
    categories,
    favourites: favouriteListing,
    favouriteSellers,
    sellers,
    loadingHomePage,
  };

  return <HomeView {...generatedProps} />;
};

export default Home;
