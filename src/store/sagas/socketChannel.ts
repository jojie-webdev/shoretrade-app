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
import { getSocketToken } from 'services/auth';
import createSocketConnection from 'services/websocket';
import { authActions, getUserActions, socketActions } from 'store/actions';
import { GetUserPayload, UserCompany } from 'types/store/GetUserState';
import { SOCKET_EVENT } from 'types/store/SocketState';
import { Store } from 'types/store/Store';

const SOCKET_EVENTS: SOCKET_EVENT[] = [
  'NEW_ORDER',
  'NEW_CREDIT',
  'UPDATE_REMAINING_BOXES',
  'INAPP_NOTIFICATION',
];

const socketEventChannel = (config: {
  token: string;
  userId: string;
  companyId: string;
}) => {
  console.log('SOCKET: NEW CONNECTION', new Date());
  const socket = createSocketConnection();

  return eventChannel((emitter) => {
    socket.on('connect', () => {
      console.log('SOCKET: CONNECTED');

      if (config.userId && config.companyId) {
        getSocketToken(config.token).then((socketToken) => {
          socket.emit('authenticate', {
            id: config.userId,
            token: socketToken,
          });

          // wait for auth to be successful
          setTimeout(() => {
            socket.emit('join', {
              userId: config.userId,
              companyId: config.companyId,
            });
          }, 3000);
        });
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

    socket.on('disconnect', () => {
      emitter({ event: 'DISCONNECTED' });
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

  const token = getUserPayload?.data.token || '';

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
      token,
      userId,
      companyId: defaultCompany?.id || '',
    });

    try {
      while (true) {
        const { logoutAction, socketData } = yield race({
          logoutAction: take(authActions.CLEAR),
          socketData: take(channel),
        });

        if (logoutAction || socketData.event === 'DISCONNECTED') {
          console.log('SOCKET: TRIGGER DISCONNECT');
          channel.close();
        } else if (socketData.event === 'CONNECTED') {
          yield put(socketActions.update({ connected: true }));
        } else if (socketData.event) {
          console.log('SOCKET: EVENT', socketData.event);
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
  yield takeEvery([getUserActions.SUCCESS], socketWatcher);
}

export default initSocket;
