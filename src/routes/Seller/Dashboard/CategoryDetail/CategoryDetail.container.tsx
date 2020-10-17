import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSellerTypeDashboard } from 'services/company';
import { Store } from 'types/store/Store';
import getFiscalYear from 'utils/Date/getFiscalYear';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import CategoryDetailView from './CategoryDetail.view';

const fiscalYearDateRange = getValidDateRangeByFinancialYear();

const CategoryDetail = (): JSX.Element => {
  const {
    title,
    months = 'FY',
    id,
  }: { title: string; months: string; id: string } = useParams();
  const token = useSelector((state: Store) => state.auth.token) || '';

  const [data, setData] = useState([]);
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
      if (token && months && id) {
        let dateFrom = '';
        let dateTo = '';

        if (months === 'FY') {
          dateFrom = fiscalYearDateRange.start.dateString.replace(/-/g, '');
          dateTo = fiscalYearDateRange.end.dateString.replace(/-/g, '');
        } else {
          const monthsParam = months.split('_');

          dateFrom = moment(monthsParam[0], 'MM-DD-YYYY').format('YYYYMMDD');
          dateTo = moment(monthsParam[1], 'MM-DD-YYYY').format('YYYYMMDD');
        }

        if (dateFrom.includes('Invalid')) return;

        setLoading(true);
        try {
          const resp = await getSellerTypeDashboard(
            {
              dateFrom: dateFrom,
              dateTo: dateTo,
              categoryId: id,
            },
            token
          );
          setData(resp.data?.data?.types || []);
        } catch (e) {
          setData([]);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [token, months, id]);

  const generatedProps = {
    title,
    dateRange: dateRange(),
    data,
    isLoading,
  };
  return <CategoryDetailView {...generatedProps} />;
};

export default CategoryDetail;
