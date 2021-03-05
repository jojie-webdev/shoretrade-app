import React, { useEffect, useState } from 'react';

import { SELLER_ROUTES, SELLER_DASHBOARD_ROUTES } from 'consts';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSellerDashboard } from 'services/company';
import {
  getMarketNotificationActions,
  readMarketNotificationActions,
  sellerDashboardActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import { DashboardLandingGeneratedProps, onApply } from './Landing.props';
import DashboardView from './Landing.view';

const DEFAULT_DATA = {
  categories: [],
  months: [],
  paid: '',
  pending: '',
};

const fiscalYearDateRange = getValidDateRangeByFinancialYear();

//TODO: refactor other dashboard data since dateRange is on redux
const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state: Store) => state.auth.token) || '';

  const dateRange =
    useSelector((state: Store) => state.sellerDashboardDate) ||
    fiscalYearDateRange;

  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(DEFAULT_DATA);

  const toggleModal = () => setIsCalendarModalOpen(!isCalendarModalOpen);

  const onApplyCustom = ({ start, end }: onApply) => {
    if (!start || !end) return;

    const startDate = {
      id: 'custom',
      dateString: start.format('YYYY-MM-DD'),
      year: start.get('year'),
      month: start.get('month') + 1,
      day: start.get('date'),
    };

    const endDate = {
      id: 'custom',
      dateString: end.format('YYYY-MM-DD'),
      year: end.get('year'),
      month: end.get('month') + 1,
      day: end.get('date'),
    };

    dispatch(
      sellerDashboardActions.set({
        start: startDate,
        end: endDate,
      })
    );

    toggleModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        setLoading(true);
        try {
          const resp = await getSellerDashboard(
            {
              dateFrom: dateRange.start.dateString.replace(/-/g, ''),
              dateTo: dateRange.end.dateString.replace(/-/g, ''),
            },
            token
          );
          setData(resp.data?.data || DEFAULT_DATA);
        } catch (e) {
          setData(DEFAULT_DATA);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange, token]);

  const setDateRange = (dateRange: any) => {
    dispatch(sellerDashboardActions.set(dateRange));
  };

  const toPaidGraph = () => {
    let pathname = '';
    if (dateRange.start.id === fiscalYearDateRange.start.id) {
      pathname = SELLER_DASHBOARD_ROUTES.CASH_FLOW('FY');
    } else {
      pathname = SELLER_DASHBOARD_ROUTES.CASH_FLOW(
        `${moment(dateRange.start.dateString).format('MM-DD-YYYY')}_${moment(
          dateRange.end.dateString
        ).format('MM-DD-YYYY')}`
      );
    }

    return {
      pathname,
      state: { innerRouteTitle: 'Historical Sales' },
    };
  };

  const toCategories = () => {
    let pathname = '';
    if (dateRange.start.id === fiscalYearDateRange.start.id) {
      pathname = SELLER_DASHBOARD_ROUTES.CATEGORIES('FY');
    } else {
      pathname = SELLER_DASHBOARD_ROUTES.CATEGORIES(
        `${moment(dateRange.start.dateString).format('MM-DD-YYYY')}_${moment(
          dateRange.end.dateString
        ).format('MM-DD-YYYY')}`
      );
    }

    return {
      pathname,
      state: { data: data.categories },
    };
  };

  const toCategoryDetails = (id: string, title: string) => {
    let pathname = '';
    if (dateRange.start.id === fiscalYearDateRange.start.id) {
      pathname = SELLER_DASHBOARD_ROUTES.CATEGORY_DETAIL(title, 'FY', id);
    } else {
      pathname = SELLER_DASHBOARD_ROUTES.CATEGORY_DETAIL(
        title,
        `${moment(dateRange.start.dateString).format('MM-DD-YYYY')}_${moment(
          dateRange.end.dateString
        ).format('MM-DD-YYYY')}`,
        id
      );
    }

    return {
      pathname,
    };
  };

  // Market Notification Logic - Start
  useEffect(() => {
    dispatch(getMarketNotificationActions.request({}));
  }, []);

  const marketNotification = useSelector(
    (state: Store) => state.getMarketNotification.data?.data.currentNotification
  );

  const currentNotificationType = marketNotification?.type || '';

  const onClickMarketNotification = () => {
    if (
      currentNotificationType === 'NEW_MARKET_REQUEST' ||
      currentNotificationType === 'MARKET_OFFER_NEGOTIATED'
    ) {
      history.push(SELLER_ROUTES.MARKET_BOARD);
    }

    if (currentNotificationType === 'MARKET_OFFER_ACCEPTED') {
      history.push(SELLER_ROUTES.SOLD);
    }

    if (marketNotification?.id) {
      dispatch(
        readMarketNotificationActions.request({
          notificationId: marketNotification.id,
        })
      );
    }
  };

  // Market Notification Logic - End

  const generatedProps: DashboardLandingGeneratedProps = {
    isCalendarModalOpen,
    toggleModal,
    isLoading,
    data,
    toPaidGraph: toPaidGraph(),
    toCategories: toCategories(),
    toCategoryDetails,
    dateRange,
    setDateRange,
    onApplyCustom,
    currentNotificationType,
    onClickMarketNotification,
  };
  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
