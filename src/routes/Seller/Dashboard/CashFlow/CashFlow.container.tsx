import React, { useEffect, useState } from 'react';

import { SELLER_ROUTES } from 'consts/routes';
import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getSellerGraphDashboard } from 'services/company';
import { Store } from 'types/store/Store';
import getFiscalYear from 'utils/Date/getFiscalYear';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';

import { salesDataToCashFlowGraph } from './CashFlow.transforms';
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

  const paidCashFlow = salesDataToCashFlowGraph(salesData, 'PAID', months);
  const pendingCashFlow = salesDataToCashFlowGraph(
    salesData,
    'PENDING',
    months
  );

  const generatedProps = {
    innerRouteTitle,
    paidCashFlow,
    pendingCashFlow,
    breadCrumbSections,
  };
  return <CashFlowView {...generatedProps} />;
};

export default CashFlow;
