import {
  CreateNegotiation_2Meta,
  CreateNegotiation_2Payload,
} from 'types/store/CreateNegotiation_2State';
import { createAsyncAction } from 'utils/Redux';

const ns = 'CREATE_NEGOTIATION_2';
const asyncAction = createAsyncAction<
  CreateNegotiation_2Meta,
  CreateNegotiation_2Payload
>(ns);

const createNegotiation_2Actions = {
  ...asyncAction,
};

export default createNegotiation_2Actions;
