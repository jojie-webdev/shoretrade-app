import { API } from 'consts';
import { eventChannel } from 'redux-saga';
import {
  all,
  apply,
  call,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import io, { Socket } from 'socket.io-client';
import { AsyncAction } from 'types/Action';
import { WebSocketMeta, WebSocketPayload } from 'types/store/WebSocketState';

import { webSocketActions } from '../actions';

function createSocketConnection(url: string) {
  return io(API.URL, {
    transports:
      process.env.NODE_ENV === 'development' ? ['websocket'] : undefined,
  });
}

function createSocketChannel(socket: any, companyId: string) {
  return eventChannel((emit) => {
    const eventHandler = (event: any) => {
      emit(event.payload);
    };

    const errorHandler = (errorEvent: any) => {
      emit(new Error(errorEvent.reason));
    };
    socket.emit('join', companyId, () => {
      socket.on('NEW_CREDIT', eventHandler);
      socket.on('error', errorHandler);
    });
    const unsubscribe = () => {
      socket.off('message', eventHandler);
    };

    return unsubscribe;
  });
}

function* emitResponse(socket: Socket) {
  yield apply(socket, socket.emit, ['message received']);
}

// function* writeSocket(socket: Socket) {
//     while (true) {
//         const { eventName, payload } = yield take(actions.WEBSOCKET_SEND);
//         socket.emit(eventName, payload);
//     }
// }

function* watchSocketChannel(
  action: AsyncAction<WebSocketMeta, WebSocketPayload>
): any {
  console.log(action);
  const socket = yield call(createSocketConnection, API.URL);
  const socketChannel = yield call(
    createSocketChannel,
    socket,
    action.meta.companyId
  );

  console.log(socket);

  while (true) {
    try {
      const payload = yield take(socketChannel);
      yield put({ type: 'TEST', payload });
      yield fork(emitResponse, socket);
    } catch (err) {
      console.log('socket error: ', err);
    }
  }
}

function* joinChannelWatcher() {
  yield takeLatest(webSocketActions.REQUEST, watchSocketChannel);
}

// export default function* root() {
//   yield all([fork(watchSocketChannel)]);
// }

export default joinChannelWatcher;
