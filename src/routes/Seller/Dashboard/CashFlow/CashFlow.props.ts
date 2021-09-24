export interface CashFlowGeneratedProps {
  innerRouteTitle: string;
  paidCashFlow: {
    values: any[];
    dates: any[];
  };
  pendingCashFlow: {
    values: any[];
    dates: any[];
  };
  breadCrumbSections: any[];
}
