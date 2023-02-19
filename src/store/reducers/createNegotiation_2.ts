import { createAsyncReducer } from 'utils/Redux';
import {
  CreateNegotiation_2Meta,
  CreateNegotiation_2Payload,
} from 'types/store/CreateNegotiation_2State';
import { createNegotiation_2Actions } from '../actions';

export default createAsyncReducer<
  CreateNegotiation_2Meta,
  CreateNegotiation_2Payload
>(createNegotiation_2Actions);
