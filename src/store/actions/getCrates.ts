import { GetCratesMeta, GetCratesPayload } from 'types/store/GetCrates';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_CRATES';

const asyncAction = createAsyncAction<GetCratesMeta, GetCratesPayload>(ns);

const getCratesActions = {
  ...asyncAction,
};

export default getCratesActions;
