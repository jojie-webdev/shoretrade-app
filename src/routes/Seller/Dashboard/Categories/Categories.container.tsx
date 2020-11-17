import React, { useEffect, useState } from 'react';

import { SELLER_DASHBOARD_ROUTES } from 'consts';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getSellerDashboard } from 'services/company';
import { Store } from 'types/store/Store';
import getFiscalYear from 'utils/Date/getFiscalYear';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import CategoriesView from './Categories.view';

const fiscalYearDateRange = getValidDateRangeByFinancialYear();

const Categories = (): JSX.Element => {
  const location = useLocation();
  const { months = 'FY' }: { months: string } = useParams();
  const token = useSelector((state: Store) => state.auth.token) || '';

  //@ts-ignore
  const [data, setData] = useState(location.state?.data || []);
  const [isLoading, setLoading] = useState(false);

  const dateRange = () => {
    const fiscalYear = getFiscalYear();

    if (months === 'FY')
      return `FY ${`${fiscalYear}`.slice(2)}/${`${fiscalYear + 1}`.slice(2)}`;

    const monthsParam = months.split('_');

    if (monthsParam.length === 2) {
      const start = moment(monthsParam[0], 'MM-DD-YYYY').format('D MMM');
      const end = moment(monthsParam[1], 'MM-DD-YYYY').format('D MMM YYYY');

      return start.includes('Invalid') ? 'Invalid Date' : `${start} - ${end}`;
    } else {
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token && data.length === 0) {
        let dateFrom = '';
        let dateTo = '';

        if (months === 'FY') {
          dateFrom = fiscalYearDateRange.start.dateString.replace(/-/g, '');
          dateTo = fiscalYearDateRange.end.dateString.replace(/-/g, '');
        } else {
          const monthsParam = months.split('_');

          if (monthsParam.length !== 2) {
            return;
          }

          dateFrom = moment(monthsParam[0], 'MM-DD-YYYY').format('YYYYMMDD');
          dateTo = moment(monthsParam[1], 'MM-DD-YYYY').format('YYYYMMDD');
        }

        if (dateFrom.includes('Invalid')) return;

        setLoading(true);
        try {
          const resp = await getSellerDashboard(
            {
              dateFrom: dateFrom,
              dateTo: dateTo,
            },
            token
          );
          setData(resp.data?.data?.categories || []);
        } catch (e) {
          setData({});
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [token, data]);

  const toCategoryDetails = (id: string, title: string) => {
    let pathname = '';
    if (months === 'FY') {
      pathname = SELLER_DASHBOARD_ROUTES.CATEGORY_DETAIL(title, 'FY', id);
    } else {
      pathname = SELLER_DASHBOARD_ROUTES.CATEGORY_DETAIL(title, months, id);
    }

    return {
      pathname,
    };
  };

  const generatedProps = {
    dateRange: dateRange(),
    data,
    isLoading,
    toCategoryDetails,
  };
  return <CategoriesView {...generatedProps} />;
};

export default Categories;
