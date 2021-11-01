import React, { useEffect, useState, useMemo } from 'react';

import { push } from 'connected-react-router';
import { BUYER_ACCOUNT_ROUTES, SELLER_ACCOUNT_ROUTES } from 'consts';
import { isMobile } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { extendCartExpiry, closeCart } from 'services/cart';
import {
  authActions,
  cartActions,
  deleteNotificationActions,
  editableListingActions,
  getCoopUsersActions,
  getNotificationsActions,
  logoutActions,
  readNotificationActions,
  getUserActions,
  globalModalActions,
} from 'store/actions';
import { NotificationType, NotifName } from 'types/store/GetNotificationsState';
import { Store } from 'types/store/Store';
import { notifURLMapper } from 'utils/Notification';
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
  const history = useHistory();
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
  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );
  const getNotifications = useSelector(
    (state: Store) => state.getNotifications
  );

  const getCartData =
    useSelector((state: Store) => state.getCart.data?.data) || null;

  const defaultCompany = useMemo(() => {
    if (!getUser) return null;

    return getUser.data?.data.user.companies.length
      ? getUser.data?.data.user.companies[0]
      : null;
  }, [getUser]);

  // const cart = useSelector((store: Store) => store.cart) || {};

  const globalModalType = useSelector((store: Store) => store.globalModal.type);

  // MARK:- Variables
  const isInnerRoute = (path: string) =>
    location.pathname.search(path.split('/')[2]) > 0;

  const userType = useSelector((state: Store) => state.auth.type) || '';

  const userData = getUser.data?.data.user;
  const notifsData = getNotifications.data?.data?.notifications || [];
  const totalUnreadNotifs = getNotifications?.data?.data.unread || 0;
  const totalNotifs = getNotifications.data?.data?.total || 0;
  const cartItems = Object.keys(getCartData?.items || {}).length;

  // MARK:- Methods
  const formatRouteString = (s: string) => {
    let str = s;
    str = s.replace('-', ' ');
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const token = useSelector((state: Store) => state.auth.token) || '';

  const callGlobalModalAction = (mode: 'NEUTRAL' | 'NEGATIVE' | 'POSITIVE') => {
    if (globalModalType === 'CART_EXPIRY_WARNING') {
      if (mode === 'POSITIVE') {
        extendCartExpiry(
          {
            employeeId: defaultCompany?.employeeId || '',
            cartId: getCartData?.id || '',
          },
          token
        );
      }

      if (mode === 'NEGATIVE') {
        closeCart(
          {
            employeeId: defaultCompany?.employeeId || '',
            cartId: getCartData?.id || '',
          },
          token
        );
      }
    }
    dispatch(globalModalActions.clear());
  };

  const logout = () => {
    dispatch(logoutActions.request());
    // dispatch(editableListingActions.clear());
    // dispatch(cartActions.clear());
    // dispatch(authActions.clear());
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

  const handleMarkasRead = (notificationId: string) => {
    dispatch(readNotificationActions.request({ id: notificationId }));
  };

  const handleMarkAllasRead = () => {
    dispatch(readNotificationActions.request({ id: 'all' }));
  };

  const handleOnDelete = (notificationId: string) => {
    dispatch(deleteNotificationActions.request({ id: notificationId }));
  };

  const handleNotifOnClick = (
    resource: NotificationType,
    appType: 'seller' | 'buyer',
    name?: NotifName
  ) => {
    const url = notifURLMapper(resource, appType, name);
    if (url != '') {
      history.push(url);
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

      if (innerRoute === 'Market requests') {
        setPageTitle('Market Requests');
      } else {
        setPageTitle(innerRoute);
      }
    }
  }, [location]);

  useEffect(() => {
    if (props.pageTitle) {
      if (props.pageTitle === 'Market requests') {
        setPageTitle('Market Requests');
      } else {
        setPageTitle(props.pageTitle);
      }
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

  // useEffect(() => {
  //   dispatch(getUserActions.request());
  // }, [buyerRequests.data?.data.marketRequests]);

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
    handleMarkasRead,
    handleMarkAllasRead,
    handleOnDelete,
    handleNotifOnClick,
    globalModalType,
    callGlobalModalAction,
  };

  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
