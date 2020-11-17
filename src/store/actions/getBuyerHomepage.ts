import {
  GetBuyerHomepageMeta,
  GetBuyerHomepagePayload,
} from 'types/store/GetBuyerHomepageState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_BUYER_HOMEPAGE';
const asyncAction = createAsyncAction<
  GetBuyerHomepageMeta,
  GetBuyerHomepagePayload
>(ns);

const getBuyerHomepageActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getBuyerHomepageActions;
