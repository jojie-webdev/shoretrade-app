import { API } from 'consts';
import { io } from 'socket.io-client';

function createSocketConnection() {
  return io(API.URL, {
    transports: ['websocket'],
    reconnectionAttempts: 10,
  });
}

export default createSocketConnection;
