import React, { useEffect, useState } from 'react';

import { SELLER_DASHBOARD_ROUTES, SELLER_ROUTES } from 'consts';
import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
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

  const dateRange =
    useSelector((state: Store) => state.sellerDashboardDate) ||
    fiscalYearDateRange;

  const dateStringFrom = pathOr('', ['start', 'dateString'], dateRange);
  const dateStringTo = pathOr('', ['end', 'dateString'], dateRange);

  useEffect(() => {
    // TODO: Add call to redux
    const fetchData = async () => {
      if (token) {
        setLoading(true);
        try {
          const resp = await getSellerTypeDashboard(
            {
              dateFrom: moment(dateStringFrom).startOf('day').toISOString(),
              dateTo: moment(dateStringTo).endOf('day').toISOString(),
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

  let breadCrumbSections = [];
  const offerListBreadCrumb = [
    { label: 'Categories', link: SELLER_ROUTES.DASHBOARD },
    {
      label: 'Categories Stats',
      link: `${SELLER_ROUTES.DASHBOARD}/categories/${
        months !== 'FY' ? months : 'FY'
      }`,
    },
    {
      label: title,
    },
  ];
  breadCrumbSections = offerListBreadCrumb;

  const generatedProps = {
    title,
    dateRange,
    data,
    isLoading,
    breadCrumbSections,
  };
  return <CategoryDetailView {...generatedProps} />;
};

export default CategoryDetail;
