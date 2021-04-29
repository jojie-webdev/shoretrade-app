import React, { useState, useEffect } from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  updateAddressActions,
  cartActions,
  getBuyerOrdersActions,
  getBuyerOrdersPlacedActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import {
  GetBuyerOrdersToShipPending,
  GetBuyerOrdersToShip,
  GetBuyerOrdersInTransit,
  GetBuyerOrdersDelivered,
} from 'store/selectors/buyer/';
import { PlaceData } from 'types/PlaceData';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import { transformOrder, groupByDate } from '../Orders/Orders.transform';
import { HomeGeneratedProps, CreditState, HomeData } from './Home.props';
import {
  addressToPlaceData,
  placeDataToUpdateAddressMeta,
} from './Home.transform';
import HomeView from './Home.view';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  // MARK:- Store
  const buyerHomePageData = useSelector(
    (state: Store) => state.getBuyerHomepage
  );

  const getAllOrders = () => {
    dispatch(getBuyerOrdersActions.request());
  };

  const pendingGetOrdersPlaced =
    useSelector((state: Store) => state.getBuyerOrdersPlaced.pending) || false;

  const getOrdersPlaced = (filter?: {
    page: string;
    term: string;
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
    limit: number;
  }) => {
    dispatch(getBuyerOrdersPlacedActions.request(filter));
  };

  const pendingOrders = GetBuyerOrdersToShipPending().map(transformOrder);
  console.log(groupByDate('estCatchmentDate')(pendingOrders));

  const loading =
    useSelector((state: Store) => state.searchAndCountProductType.pending) ||
    false;

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

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
  const featured: string[] = bannerData?.web || [];
  const loadingHomePage = buyerHomePageData.pending === null ? true : false;

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
    getOrdersPlaced({
      limit: 10,
      page: '1',
      term: '',
      dateFrom: null,
      dateTo: null,
    });
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
    pendingOrders: groupByDate('estCatchmentDate')(pendingOrders),
  };

  return <HomeView {...generatedProps} />;
};

export default Home;
