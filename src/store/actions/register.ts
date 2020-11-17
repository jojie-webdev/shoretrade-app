import { RegisterMeta, RegisterPayload } from 'types/store/RegisterState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'REGISTER';
const asyncAction = createAsyncAction<RegisterMeta, RegisterPayload>(ns);

const registerActions = {
  ...asyncAction,
};

export default registerActions;
