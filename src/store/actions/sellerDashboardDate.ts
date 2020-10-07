import { createSetAction } from 'utils/Redux';

const ns = 'SELLER_DASHBOARD_DATE';

//TODO: dashboard date type
const setAction = createSetAction<any>(ns);

const sellerDashboardActions = {
  ...setAction,
};

export default sellerDashboardActions;
