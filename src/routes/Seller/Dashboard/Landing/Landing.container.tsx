import React, { useEffect, useState } from 'react';

import { SELLER_ROUTES, SELLER_DASHBOARD_ROUTES } from 'consts';
import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getMarketNotificationActions,
  getSellerDashboardSalesActions,
  getSellerDashboardTopCategoriesActions,
  readMarketNotificationActions,
  sellerDashboardActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer/company';
import { GetActivePlanResponseData } from 'types/store/GetActivePlanState';
import { Store } from 'types/store/Store';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import { DashboardLandingGeneratedProps, onApply } from './Landing.props';
// import { salesDataToMonthlyGraph } from './Landing.transforms';
import DashboardView from './Landing.view';

const fiscalYearDateRange = getValidDateRangeByFinancialYear();

//TODO: refactor other dashboard data since dateRange is on redux
const Dashboard = (): JSX.Element => {
  const defaultCompany = GetDefaultCompany();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const companyRelationship =
    user &&
    user.companies.find((company) => company.id === defaultCompany?.id)
      ?.relationship;

  const userPending =
    user !== undefined &&
    !(user.companies || []).some((a) =>
      a.addresses.some((b) => b.approved === 'APPROVED')
    );

  const dateRange =
    useSelector((state: Store) => state.sellerDashboardDate) ||
    fiscalYearDateRange;

  const salesData = useSelector(
    (state: Store) => state.getSellerDashboardSales.data?.data
  ) || {
    graph: [],
    total: {
      paid: 0,
      pending: 0,
    },
    previousMonthTotal: {
      paid: 0,
      pending: 0,
    },
  };

  const topCategoriesData = useSelector(
    (state: Store) => state.getSellerDashboardTopCategories.data?.data
  ) || {
    topCategories: [],
    previousTopCategories: [],
  };

  const activePlan = useSelector(
    (store: Store) => store.getActivePlan.data?.data
  );

  const subscription = useSelector((store: Store) => store.subscription);

  const isDashboardPending =
    useSelector((state: Store) => state.getSellerDashboardSales.pending) ||
    false;
  const isLoading = isDashboardPending; //|| subscription.status === null;

  const toggleModal = () => setIsCalendarModalOpen(!isCalendarModalOpen);

  const onApplyCustom = ({ start, end }: onApply) => {
    if (!start || !end) return;

    const startDate = {
      id: 'custom',
      dateString: start.format('YYYY-MM-DD'),
      year: start.get('year'),
      month: start.get('month') + 1,
      day: start.get('date'),
      isoString: start.startOf('day').toISOString(),
    };

    const endDate = {
      id: 'custom',
      dateString: end.format('YYYY-MM-DD'),
      year: end.get('year'),
      month: end.get('month') + 1,
      day: end.get('date'),
      isoString: end.endOf('day').toISOString(),
    };

    dispatch(
      sellerDashboardActions.set({
        start: startDate,
        end: endDate,
      })
    );

    toggleModal();
  };

  const setDateRange = (dateRange: any) => {
    dispatch(
      sellerDashboardActions.set({
        start: {
          ...dateRange.start,
          isoString: moment(dateRange.start.dateString)
            .startOf('day')
            .toISOString(),
        },
        end: {
          ...dateRange.end,
          isoString: moment(dateRange.end.dateString)
            .endOf('day')
            .toISOString(),
        },
      })
    );
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
      state: { innerRouteTitle: 'Paid/Pending' },
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
      // state: { data: data.categories },
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

  useEffect(() => {
    const dateStringFrom = pathOr('', ['start', 'dateString'], dateRange);
    const dateStringTo = pathOr('', ['end', 'dateString'], dateRange);
    dispatch(
      getSellerDashboardSalesActions.request({
        dateFrom: moment(dateStringFrom).startOf('day').toISOString(),
        dateTo: moment(dateStringTo).endOf('day').toISOString(),
      })
    );
    dispatch(
      getSellerDashboardTopCategoriesActions.request({
        dateFrom: moment(dateStringFrom).startOf('day').toISOString(),
        dateTo: moment(dateStringTo).endOf('day').toISOString(),
      })
    );
    dispatch(getMarketNotificationActions.request({}));
    // eslint-disable-next-line
  }, []);

  // Market Notification Logic - Start
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
    // data,
    toPaidGraph: toPaidGraph(),
    toCategories: toCategories(),
    toCategoryDetails,
    dateRange,
    setDateRange,
    onApplyCustom,
    currentNotificationType,
    onClickMarketNotification,
    userPending,
    salesData,
    topCategoriesData,
    activePlan,
    companyRelationship,
  };
  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
