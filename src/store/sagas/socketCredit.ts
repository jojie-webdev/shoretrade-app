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
import createWebSocketConnection from 'services/websocket';
import io, { Socket } from 'socket.io-client';
import { AsyncAction } from 'types/Action';
import {
  SocketCreditMeta,
  SocketCreditPayload,
} from 'types/store/SocketCreditState';

import { getUserActions, socketCreditActions } from '../actions';

function createSocketChannel(socket: any, companyId: string) {
  return eventChannel((emit) => {
    const eventHandler = (event: any) => {
      console.log(event);
      emit(event);
    };

    const errorHandler = (errorEvent: any) => {
      emit(new Error(errorEvent.reason));
    };
    socket.emit('join', companyId);
    socket.on('NEW_CREDIT', eventHandler);
    socket.on('error', errorHandler);
    const unsubscribe = () => {
      socket.off('join', eventHandler);
    };

    return unsubscribe;
  });
}

function* emitResponse(socket: Socket) {
  yield apply(socket, socket.emit, ['message received']);
}

function* watchSocketChannel(
  action: AsyncAction<SocketCreditMeta, SocketCreditPayload>
): any {
  const socket: Socket = yield call(createWebSocketConnection);
  yield put(socketCreditActions.success(socket));
  const socketChannel = yield call(
    createSocketChannel,
    socket,
    action.meta.companyId
  );

  while (true) {
    try {
      const payload = yield take(socketChannel);
      console.log(payload);
      yield put({ type: socketCreditActions.HANDLE_EVENT, payload }); // for tracking/testing
      yield put(getUserActions.request()); // refresh credit
    } catch (err) {
      console.log('socket error: ', err);
    }
  }
}

function* joinChannelWatcher() {
  yield takeLatest(socketCreditActions.CONNECT, watchSocketChannel);
}

export default joinChannelWatcher;
