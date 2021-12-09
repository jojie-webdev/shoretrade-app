import React, { useEffect } from 'react';

import { SELLER_DASHBOARD_ROUTES, SELLER_ROUTES } from 'consts';
import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSellerDashboardTopCategoriesActions } from 'store/actions';
import { Store } from 'types/store/Store';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import CategoriesView from './Categories.view';

const fiscalYearDateRange = getValidDateRangeByFinancialYear();

const Categories = (): JSX.Element => {
  const dispatch = useDispatch();
  const { months = 'FY' }: { months: string } = useParams();

  const topCategoriesData = useSelector(
    (state: Store) => state.getSellerDashboardTopCategories.data?.data
  ) || {
    topCategories: [],
    previousTopCategories: [],
  };

  const isLoading =
    useSelector(
      (state: Store) => state.getSellerDashboardTopCategories.pending
    ) || false;

  const dateRange =
    useSelector((state: Store) => state.sellerDashboardDate) ||
    fiscalYearDateRange;

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

  let breadCrumbSections = [];
  const offerListBreadCrumb = [
    { label: 'Categories', link: SELLER_ROUTES.DASHBOARD },
    {
      label: 'Categories Stats',
    },
  ];
  breadCrumbSections = offerListBreadCrumb;

  useEffect(() => {
    const dateStringFrom = pathOr('', ['start', 'dateString'], dateRange);
    const dateStringTo = pathOr('', ['end', 'dateString'], dateRange);

    dispatch(
      getSellerDashboardTopCategoriesActions.request({
        dateFrom: moment(dateStringFrom).startOf('day').toISOString(),
        dateTo: moment(dateStringTo).endOf('day').toISOString(),
      })
    );
    // eslint-disable-next-line
  }, []);

  const generatedProps = {
    dateRange,
    isLoading,
    toCategoryDetails,
    breadCrumbSections,
    topCategoriesData,
  };
  return <CategoriesView {...generatedProps} />;
};

export default Categories;
