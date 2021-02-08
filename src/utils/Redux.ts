import pathOr from 'ramda/es/pathOr';
import { AsyncAction } from 'types/Action';
import { AsyncState } from 'types/store/AsyncState';
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
