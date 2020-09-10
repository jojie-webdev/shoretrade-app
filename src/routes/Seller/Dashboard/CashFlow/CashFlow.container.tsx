import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGraphData } from 'routes/Seller/Dashboard/CashFlow/CashFlow.transforms';
import { getSellerGraphDashboard } from 'services/company';
import { Store } from 'types/store/Store';
import getFiscalYear from 'utils/Date/getFiscalYear';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import CashFlowView from './CashFlow.view';

const fiscalYearDateRange = getValidDateRangeByFinancialYear();

const CashFlow = (): JSX.Element => {
  const { months = 'FY' } = useParams();
  const token = useSelector((state: Store) => state.auth.token) || '';

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<{ values: number[]; dates: string[] }>({
    values: [],
    dates: [],
  });

  const name = () => {
    const fiscalYear = getFiscalYear();

    if (months === 'FY')
      return `FY ${`${fiscalYear}`.slice(2)}/${`${fiscalYear + 1}`.slice(2)}`;

    const start = moment(months).format('D MMM');
    const end = moment(months).endOf('month').format('D MMM YYYY');

    return start.includes('Invalid') ? 'Invalid Date' : `${start} - ${end}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      let dateFrom = '';
      let dateTo = '';

      if (months === 'FY') {
        dateFrom = fiscalYearDateRange.start.dateString.replace(/-/g, '');
        dateTo = fiscalYearDateRange.end.dateString.replace(/-/g, '');
      } else {
        dateFrom = moment(months).format('YYYYMMDD');
        dateTo = moment(months).endOf('month').format('YYYYMMDD');
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
    name: name(),
    isLoading,
    data,
  };
  return <CashFlowView {...generatedProps} />;
};

export default CashFlow;
