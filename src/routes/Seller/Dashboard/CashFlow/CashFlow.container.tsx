import React from 'react';

import { SELLER_ROUTES } from 'consts/routes';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Store } from 'types/store/Store';

import { salesDataToCashFlowGraph } from './CashFlow.transforms';
import CashFlowView from './CashFlow.view';

const CashFlow = (): JSX.Element => {
  const location: { state: any } = useLocation();
  const { months = 'FY' }: { months: string; isEarning: string } = useParams();

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
