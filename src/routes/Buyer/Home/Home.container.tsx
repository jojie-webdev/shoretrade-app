import React, { useState, useEffect } from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getMarketInterestsActions, orderActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import useHomeOld from 'utils/Hooks/useHomeOld';
import { useTheme } from 'utils/Theme';

import { HOME_BANNER } from './Home.constants';
import { HomeGeneratedProps, CreditState, HomeData } from './Home.props';
import HomeView from './Home.view';
import HomeViewOld from './Home.view.old';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const isOld = useHomeOld();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const theme = useTheme();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [loadingHomePage, setLoadingHomePage] = useState(true);

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
  let featured: string[] = (isMobile ? bannerData?.app : bannerData?.web) || [];

  if (!theme.isSFM) {
    featured = isMobile ? HOME_BANNER.mobile : HOME_BANNER.desktop;
  }

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );
  const subscription = useSelector((store: Store) => store.subscription);

  // MARK:- State
  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  const marketSector = useSelector(
    (state: Store) => state.getMarketInterests.data?.data.sectorAlias
  );

  useEffect(() => {
    dispatch(orderActions.clear());
  }, []);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      const loadingHomePage = buyerHomePageData.pending !== false; // || subscription.status === null;
      setLoadingHomePage(loadingHomePage);
    }, 3000);
    setTimer(timerId);
  }, [buyerHomePageData.pending]);

  useEffect(() => {
    if (company) {
      dispatch(getMarketInterestsActions.request({ companyId: company.id }));
    }
  }, [company]);

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

  // MARK:- Bottom Variables
  const creditBalance = currentCompany?.credit || '0';
  const creditState: CreditState = getCreditState();
  const currentMarketSector = marketSector ? marketSector : '';
  const isApprovedCompany = companyPlan?.isApprovedCompany || false;
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
    companyPlan,
    currentMarketSector,
    isApprovedCompany,
  };

  return isOld ? (
    <HomeViewOld {...generatedProps} />
  ) : (
    <HomeView {...generatedProps} />
  );
};

export default Home;
