import { GetStatesMeta, GetStatesPayload } from 'types/store/GetStatesState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_STATES';
const asyncAction = createAsyncAction<GetStatesMeta, GetStatesPayload>(ns);

const getStatesActions = {
  ...asyncAction,
};

export default getStatesActions;
