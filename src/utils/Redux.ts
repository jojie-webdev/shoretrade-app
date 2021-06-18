import pathOr from 'ramda/es/pathOr';
import { AsyncAction, SocketAction } from 'types/Action';
import { AsyncState, SocketState } from 'types/store/AsyncState';
export const createSetAction = <Payload = any>(namespace: string) => {
  const type = `${namespace}/SET`;
  return {
    set: (payload: Payload) => ({
      type,
      payload,
    }),
    SET: type,
  };
};
export const createUpdateAction = <Payload = any>(namespace: string) => {
  const type = `${namespace}/UPDATE`;
  return {
    update: (payload: Payload) => ({
      type,
      payload,
    }),
    UPDATE: type,
  };
};
export const createClearAction = (namespace: string) => {
  const type = `${namespace}/CLEAR`;
  return {
    clear: () => ({
      type,
      payload: {},
    }),
    CLEAR: type,
  };
};
export const createAsyncAction = <Meta = any, Payload = any>(
  namespace: string
) => {
  const requestType = `${namespace}/REQUEST`;
  const successType = `${namespace}/SUCCESS`;
  const failedType = `${namespace}/FAILED`;
  const clearType = `${namespace}/CLEAR`;
  return {
    request: (meta: Meta) => ({
      type: requestType,
      meta,
    }),
    success: (payload: Payload) => ({
      type: successType,
      payload,
    }),
    failed: (error: string) => ({
      type: failedType,
      error,
    }),
    clear: () => ({
      type: clearType,
    }),
    REQUEST: requestType,
    SUCCESS: successType,
    FAILED: failedType,
    CLEAR: clearType,
  };
};
type AsyncActionTypes = {
  REQUEST: string;
  SUCCESS: string;
  FAILED: string;
  CLEAR: string;
};

export const createAsyncReducer = <Meta = any, Payload = any>(
  { REQUEST, SUCCESS, FAILED, CLEAR }: AsyncActionTypes,
  customEventsHandler?: (
    state: AsyncState<Meta, Payload>,
    action: AsyncAction<Meta, Payload>,
    defaultState: AsyncState<Meta, Payload>
  ) => Record<string, AsyncState<Meta, Payload>>
) => {
  const DEFAULT_STATE: AsyncState<Meta, Payload> = {
    error: '',
    pending: null,
    request: null,
    data: null,
  };
  return (
    state: AsyncState<Meta, Payload> = DEFAULT_STATE,
    action: AsyncAction<Meta, Payload>
  ): AsyncState<Meta, Payload> => {
    return pathOr(state, [action.type], {
      [REQUEST]: {
        data: null,
        error: '',
        pending: true,
        request: pathOr(null, ['meta'], action),
      },
      [SUCCESS]: {
        ...state,
        pending: false,
        data: pathOr(null, ['payload'], action),
      },
      [FAILED]: {
        ...state,
        pending: false,
        error: pathOr('Unknown Error', ['error'], action),
      },
      [CLEAR]: DEFAULT_STATE,

      ...(customEventsHandler
        ? customEventsHandler(state, action, DEFAULT_STATE)
        : {}),
    });
  };
};

// ==== REDUCER ====

export const createSocketReducer = <Meta = any, Payload = any>(
  {
    CONNECT,
    SUCCESS,
    JOIN,
    // WATCH,
    HANDLE_EVENT,
    DISCONNECT,
  }: SocketActionTypes,
  customEventsHandler?: (
    state: SocketState<Meta, Payload>,
    action: SocketAction<Meta, Payload>,
    defaultState: SocketState<Meta, Payload>
  ) => Record<string, SocketState<Meta, Payload>>
) => {
  const DEFAULT_STATE: SocketState<Meta, Payload> = {
    error: '',
    socket: null,
    data: null,
  };
  return (
    state: SocketState<Meta, Payload> = DEFAULT_STATE,
    action: AsyncAction<Meta, Payload>
  ): SocketState<Meta, Payload> => {
    return pathOr(state, [action.type], {
      [CONNECT]: {
        data: null,
        socket: null,
        pending: true,
        error: '',
      },
      [SUCCESS]: {
        ...state,
        pending: false,
        socket: action.payload,
      },
      [HANDLE_EVENT]: {
        ...state,
        pending: false,
        data: action.payload,
      },
      [DISCONNECT]: DEFAULT_STATE,

      ...(customEventsHandler
        ? customEventsHandler(state, action, DEFAULT_STATE)
        : {}),
    });
  };
};

export const createSocketAction = <Meta = any, Payload = any>(
  namespace: string
) => {
  const connectType = `${namespace}/CONNECT`;
  const successType = `${namespace}/SUCCESS`;
  const joinType = `${namespace}/JOIN`;
  const watchType = `${namespace}/WATCH`;
  const handleEventType = `${namespace}/HANDLE_EVENT`;
  const disconnectType = `${namespace}/DISCONNECT`;
  return {
    connect: (meta: Meta) => ({
      type: connectType,
      meta,
    }),
    success: (payload: Payload) => ({
      type: successType,
      payload,
    }),
    join: (payload: Payload) => ({
      type: joinType,
      payload,
    }),
    // watch: (payload: Payload) => ({
    //   type: watchType,
    //   payload,
    // }),
    handleEvent: () => ({
      type: handleEventType,
    }),
    disconnect: () => ({
      type: disconnectType,
    }),
    CONNECT: connectType,
    JOIN: joinType,
    SUCCESS: successType,
    HANDLE_EVENT: handleEventType,
    DISCONNECT: disconnectType,
  };
};

type SocketActionTypes = {
  CONNECT: string;
  SUCCESS: string;
  JOIN: string;
  // WATCH: string;
  HANDLE_EVENT: string;
  DISCONNECT: string;
};
