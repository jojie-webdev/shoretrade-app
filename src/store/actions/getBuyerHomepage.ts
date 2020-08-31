import { createAsyncAction } from 'utils/Redux';
import {
    GetBuyerHomepageMeta,
    GetBuyerHomepagePayload,
} from 'types/store/GetBuyerHomepageState';

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
