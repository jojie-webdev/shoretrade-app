import React, { useEffect, useState } from 'react';

import { SELLER_ROUTES } from 'consts/routes';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getGraphData } from 'routes/Seller/Dashboard/CashFlow/CashFlow.transforms';
import { getSellerGraphDashboard } from 'services/company';
import { Store } from 'types/store/Store';
import getFiscalYear from 'utils/Date/getFiscalYear';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import CashFlowView from './CashFlow.view';

const fiscalYearDateRange = getValidDateRangeByFinancialYear();

const CashFlow = (): JSX.Element => {
  const location: { state: any } = useLocation();
  const {
    months = 'FY',
    isEarning,
  }: { months: string; isEarning: string } = useParams();
  const token = useSelector((state: Store) => state.auth.token) || '';

  const innerRouteTitle =
    location.state?.innerRouteTitle || 'Cash Flow Details';
  let breadCrumbSections = [];
  const offerListBreadCrumb = [
    { label: 'Dashboard', link: SELLER_ROUTES.DASHBOARD },
    {
      label: innerRouteTitle,
    },
  ];
  breadCrumbSections = offerListBreadCrumb;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<{ values: number[]; dates: string[] }>({
    values: [],
    dates: [],
  });

  const name = () => {
    const fiscalYear = getFiscalYear();

    if (months === 'FY')
      return `FY ${`${fiscalYear}`.slice(2)}/${`${fiscalYear + 1}`.slice(2)}`;

    if (months.includes('_')) {
      const monthsParam = months.split('_');

      if (monthsParam.length === 2) {
        const start = moment(monthsParam[0], 'MM-DD-YYYY').format('D MMM');
        const end = moment(monthsParam[1], 'MM-DD-YYYY').format('D MMM YYYY');

        return start.includes('Invalid') ? 'Invalid Date' : `${start} - ${end}`;
      } else {
        return 'Invalid Date';
      }
    } else {
      const start = moment(months, 'MM-DD-YYYY').format('D MMM');
      const end = moment(months, 'MM-DD-YYYY')
        .endOf('month')
        .format('D MMM YYYY');

      return start.includes('Invalid') ? 'Invalid Date' : `${start} - ${end}`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let dateFrom = '';
      let dateTo = '';

      if (months === 'FY') {
        dateFrom = fiscalYearDateRange.start.dateString.replace(/-/g, '');
        dateTo = fiscalYearDateRange.end.dateString.replace(/-/g, '');
      } else {
        if (months.includes('_')) {
          const monthsParam = months.split('_');

          if (monthsParam.length !== 2) {
            return;
          }

          dateFrom = moment(monthsParam[0], 'MM-DD-YYYY').format('YYYYMMDD');
          dateTo = moment(monthsParam[1], 'MM-DD-YYYY').format('YYYYMMDD');
        } else {
          dateFrom = moment(months, 'MM-DD-YYYY').format('YYYYMMDD');
          dateTo = moment(months, 'MM-DD-YYYY')
            .endOf('month')
            .format('YYYYMMDD');
        }
      }

      if (dateFrom.includes('Invalid')) return;

      setLoading(true);
      try {
        const resp = await getSellerGraphDashboard(
          {
            dateFrom: dateFrom,
            dateTo: dateTo,
          },
          token
        );
        setData(getGraphData(resp.data.data, dateFrom));
      } catch (e) {
        setData({
          values: [],
          dates: [],
        });
      }

      setLoading(false);
    };
    fetchData();
  }, [months]);

  const generatedProps = {
    innerRouteTitle,
    name: name(),
    isLoading,
    data,
    breadCrumbSections,
    isEarning: isEarning === 'true' ? true : false,
  };
  return <CashFlowView {...generatedProps} />;
};

export default CashFlow;
