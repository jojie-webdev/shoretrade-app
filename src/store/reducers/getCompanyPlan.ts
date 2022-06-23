import {
  GetCompanyPlanMeta,
  GetCompanyPlanPayload,
} from 'types/store/GetCompanyPlanState';
import { createAsyncReducer } from 'utils/Redux';

import { getCompanyPlanActions } from '../actions';

export default createAsyncReducer<GetCompanyPlanMeta, GetCompanyPlanPayload>(
  getCompanyPlanActions
);
