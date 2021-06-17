import React from 'react';

import { API } from 'consts';
import { io, Socket } from 'socket.io-client';

export const createWebSocketConnection = io(API.URL, {
  transports:
    process.env.NODE_ENV === 'development'
      ? ['websocket', 'polling', 'flashsocket']
      : undefined,
});
