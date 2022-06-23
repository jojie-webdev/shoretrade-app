import {
  GetCompanyPlanMeta,
  GetCompanyPlanPayload,
} from 'types/store/GetCompanyPlanState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_COMPANY_PLAN';
const asyncAction = createAsyncAction<
  GetCompanyPlanMeta,
  GetCompanyPlanPayload
>(ns);

const getCompanyPlanActions = {
  ...asyncAction,
};

export default getCompanyPlanActions;
