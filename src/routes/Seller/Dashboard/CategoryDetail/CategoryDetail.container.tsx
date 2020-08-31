import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { props } from 'ramda';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSellerTypeDashboard } from 'services/company';
import { Store } from 'types/store/Store';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import CategoryDetailView from './CategoryDetail.view';

const fiscalYear =
  moment().get('month') < 7 ? moment().get('year') - 1 : moment().get('year');

const fiscalYearDateRange = getValidDateRangeByFinancialYear(fiscalYear);

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
    if (months === 'FY')
      return `FY ${`${fiscalYear}`.slice(2)}/${`${fiscalYear + 1}`.slice(2)}`;

    const monthsParam = months.split('_');

    if (monthsParam.length === 2) {
      const start = moment(monthsParam[0]).format('D MMM');
      const end = moment(monthsParam[1]).format('D MMM YYYY');

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

          dateFrom = moment(monthsParam[0]).format('YYYYMMDD');
          dateTo = moment(monthsParam[1]).format('YYYYMMDD');
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