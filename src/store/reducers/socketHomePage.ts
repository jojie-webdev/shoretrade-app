import {
  SocketHomePageMeta,
  SocketHomePagePayload,
} from 'types/store/socketHomePageState';
import { createSocketReducer } from 'utils/Redux';

import { socketHomePageActions } from '../actions';

export default createSocketReducer<SocketHomePageMeta, SocketHomePagePayload>(
  socketHomePageActions
);
