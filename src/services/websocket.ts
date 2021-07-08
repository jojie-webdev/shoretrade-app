import React from 'react';

import { API } from 'consts';
import { io, Socket } from 'socket.io-client';

function createSocketConnection() {
  return io(API.URL, {
    transports:
      process.env.NODE_ENV === 'development' ? ['websocket'] : undefined,
  });
}

export default createSocketConnection;
