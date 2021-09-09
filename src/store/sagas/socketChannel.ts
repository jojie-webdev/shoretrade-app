import { eventChannel } from 'redux-saga';
import {
  take,
  put,
  call,
  select,
  takeLatest,
  race,
  takeEvery,
} from 'redux-saga/effects';
import createSocketConnection from 'services/websocket';
import {
  authActions,
  getUserActions,
  socketActions,
  verifyActions,
} from 'store/actions';
import { GetUserPayload, UserCompany } from 'types/store/GetUserState';
import { SOCKET_EVENT } from 'types/store/SocketState';
import { Store } from 'types/store/Store';

const SOCKET_EVENTS: SOCKET_EVENT[] = [
  'NEW_ORDER',
  'NEW_CREDIT',
  'UPDATE_REMAINING_BOXES',
  'INAPP_NOTIFICATION',
];

const socketEventChannel = (config: { userId: string; companyId: string }) => {
  console.log('SOCKET: NEW CONNECTION', new Date());
  const socket = createSocketConnection();

  return eventChannel((emitter) => {
    socket.on('connect', () => {
      if (config.userId) {
        socket.emit('join', config.userId);
      }

      if (config.companyId) {
        socket.emit('join', config.companyId);
      }

      SOCKET_EVENTS.forEach((event) => {
        socket.on(event, (metadata) => {
          emitter({
            event,
            metadata,
          });
        });
      });

      emitter({ event: 'CONNECTED' });
    });

    // The subscriber must return an unsubscribe function
    return () => {
      console.log('SOCKET: DISCONNECT');
      socket.disconnect();
    };
  });
};

function* socketWatcher(): any {
  const connected: string =
    (yield select((state: Store) => state.socket.connected)) || false;
  const getUserPayload: GetUserPayload | null = yield select(
    (state: Store) => state.getUser.data
  );

  const userId = getUserPayload?.data.user.id || '';
  const companies: UserCompany[] = getUserPayload?.data.user.companies || [];

  const defaultCompany =
    companies.find((company) => company.relationship === 'ADMIN') ||
    companies.find(
      (company) =>
        company.relationship === 'ASSISTANT' ||
        company.relationship === 'SECONDARY'
    );

  if (defaultCompany && !connected) {
    const channel: any = yield call(socketEventChannel, {
      userId,
      companyId: defaultCompany?.id || '',
    });

    try {
      while (true) {
        const { logoutAction, socketData } = yield race({
          logoutAction: take(authActions.CLEAR),
          socketData: take(channel),
        });

        if (logoutAction) {
          console.log('SOCKET: TRIGGER DISCONNECT');
          channel.close();
        } else if (socketData.event === 'CONNECTED') {
          yield put(socketActions.update({ connected: true }));
        } else if (socketData.event) {
          yield put(
            socketActions.triggerEvent(socketData.event, socketData.metadata)
          );
        }
      }
    } finally {
      console.log('SOCKET: WATCHER EXITED');
      yield put(socketActions.update({ connected: false }));
    }
  }
}

function* initSocket(): any {
  yield takeEvery(
    [verifyActions.SUCCESS, getUserActions.SUCCESS],
    socketWatcher
  );
}

export default initSocket;
