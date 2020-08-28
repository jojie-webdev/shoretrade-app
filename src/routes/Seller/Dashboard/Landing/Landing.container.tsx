import React, { useEffect, useState } from 'react';

import { SELLER_DASHBOARD_ROUTES } from 'consts';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getSellerDashboard } from 'services/company';
import { Store } from 'types/store/Store';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import { DashboardLandingGeneratedProps } from './Landing.props';
import DashboardView from './Landing.view';

const DEFAULT_DATA = {
  categories: [],
  months: [],
  paid: '',
  pending: '',
};

const fiscalYear =
  moment().get('month') < 7 ? moment().get('year') - 1 : moment().get('year');

const fiscalYearDateRange = getValidDateRangeByFinancialYear(fiscalYear);

const Dashboard = (): JSX.Element => {
  const token = useSelector((state: Store) => state.auth.token) || '';

  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState(fiscalYearDateRange);
  const [data, setData] = useState(DEFAULT_DATA);

  const toggleModal = () => setIsCalendarModalOpen(!isCalendarModalOpen);

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

  const toCategories = () => {
    let pathname = '';
    if (dateRange === fiscalYearDateRange) {
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

  const generatedProps: DashboardLandingGeneratedProps = {
    isCalendarModalOpen,
    toggleModal,
    isLoading,
    data,
    toCategories: toCategories(),
  };
  return <DashboardView {...generatedProps} />;
};

export default Dashboard;
