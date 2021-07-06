import {
  GetAvailableCratesMeta,
  GetAvailableCratesPayload,
} from 'types/store/GetAvailableCrates';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_AVAILABLE_CRATES';

const asyncAction = createAsyncAction<
  GetAvailableCratesMeta,
  GetAvailableCratesPayload
>(ns);

const getAvailableCratesActions = {
  ...asyncAction,
};

export default getAvailableCratesActions;
