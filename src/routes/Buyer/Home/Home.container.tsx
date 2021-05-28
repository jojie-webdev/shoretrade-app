import React, { useState, useEffect } from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getPaymentModeActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import useHomeOld from 'utils/Hooks/useHomeOld';

import { HomeGeneratedProps, CreditState, HomeData } from './Home.props';
import HomeView from './Home.view';
import HomeViewOld from './Home.view.old';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const isOld = useHomeOld();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  // MARK:- Store
  const buyerHomePageData = useSelector(
    (state: Store) => state.getBuyerHomepage
  );

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

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');
  const company = GetDefaultCompany();
  const featured: string[] =
    (isMobile ? bannerData?.app : bannerData?.web) || [];
  const loadingHomePage = buyerHomePageData.pending === null;

  // MARK:- State
  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  // MARK:- Methods
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
    if (company) {
      setCurrentCompany(company);
    }
  }, [company]);

  useEffect(() => {
    dispatch(getPaymentModeActions.request({}));
  }, []);

  // MARK:- Bottom Variables
  const creditBalance = currentCompany?.credit || '0';
  const creditState: CreditState = getCreditState();

  const generatedProps: HomeGeneratedProps = {
    isPendingAccount,
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

  return isOld ? (
    <HomeViewOld {...generatedProps} />
  ) : (
    <HomeView {...generatedProps} />
  );
};

export default Home;
