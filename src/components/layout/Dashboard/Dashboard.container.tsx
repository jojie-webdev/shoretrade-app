import React, { useEffect, useState, useMemo } from 'react';

import { push } from 'connected-react-router';
import { BUYER_ACCOUNT_ROUTES, SELLER_ACCOUNT_ROUTES } from 'consts';
import { isMobile } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  authActions,
  cartActions,
  editableListingActions,
  getNotificationsActions,
  logoutActions,
  socketCreditActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import {
  DashboardPublicProps,
  DashboardGeneratedProps,
} from './Dashboard.props';
import DashboardView from './Dashboard.view';
const Dashboard = (props: DashboardPublicProps): JSX.Element => {
  // MARK:- Store / Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  // MARK:- State
  const [pageTitle, setPageTitle] = useState(props.pageTitle || '');
  const shouldIncludePadding =
    props.shouldIncludePadding !== undefined
      ? props.shouldIncludePadding
      : true;

  const [openSidebar, setOpenSidebar] = useState(false);

  const onClickOpenSideBar = (value: boolean) => {
    if (value) {
      document.getElementsByTagName('body')[0].classList.add('no-scroll');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    }
    setOpenSidebar(value);
  };

  // body background set for seller
  if (theme.appType === 'seller' && isMobile) {
    document.getElementsByTagName('body')[0].style.backgroundColor =
      theme.grey.shade9;
  }

  const getUser = useSelector((state: Store) => state.getUser);
  const getNotifications = useSelector(
    (state: Store) => state.getNotifications
  );
  const defaultCompany = useMemo(() => {
    if (!getUser) return null;

    return getUser.data?.data.user.companies.length
      ? getUser.data?.data.user.companies[0]
      : null;
  }, [getUser]);

  const cart = useSelector((store: Store) => store.cart) || {};

  // MARK:- Variables
  const isInnerRoute = (path: string) =>
    location.pathname.search(path.split('/')[2]) > 0;

  const userType = useSelector((state: Store) => state.auth.type) || '';

  const socketCreditData =
    useSelector((state: Store) => state.socketCredit.data) || null;

  const userData = getUser.data?.data.user;
  console.log(getNotifications);
  const notifsData = getNotifications.data?.data?.notifications || [];
  const totalUnreadNotifs = getNotifications?.data?.data.unread || 0;
  const totalNotifs = getNotifications.data?.data?.total || 0;
  const cartItems = Object.keys(cart).length;

  // MARK:- Methods
  const formatRouteString = (s: string) => {
    let str = s;
    str = s.replace('-', ' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const logout = () => {
    dispatch(logoutActions.request());
    dispatch(editableListingActions.clear());
    dispatch(cartActions.clear());
    dispatch(authActions.clear());
  };

  const onClickAccount = () => {
    if (userType === 'seller') {
      dispatch(push(SELLER_ACCOUNT_ROUTES.LANDING));
      return;
    }

    if (userType === 'buyer') {
      dispatch(push(BUYER_ACCOUNT_ROUTES.LANDING));
      return;
    }
  };

  // MARK:- Effects
  useEffect(() => {
    // This is a hacky way for an edge case in add product
    // We need this so that the absolutes such as
    // progress indicator and box summary can fit in the screen
    if (!props.pageTitle) {
      let innerRoute = location.pathname.split('/')[2];
      innerRoute = formatRouteString(innerRoute || '').replace(
        'product',
        'listing'
      );

      setPageTitle(innerRoute);
    }
  }, [location]);

  useEffect(() => {
    if (props.pageTitle) {
      setPageTitle(props.pageTitle);
    }
  }, [props.pageTitle]);

  useEffect(() => {
    return () => {
      // cleanup
      document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    dispatch(getNotificationsActions.request());
  }, []);

  // MARK:- Render
  const generatedProps: DashboardGeneratedProps = {
    ...props,
    pageTitle,
    isInnerRoute,
    shouldIncludePadding,
    userData,
    logout,
    credit: defaultCompany?.credit || '',
    openSidebar,
    onClickOpenSideBar,
    cartItems,
    onClickAccount,
    notifsData,
    totalNotifs,
    totalUnreadNotifs,
  };

  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
