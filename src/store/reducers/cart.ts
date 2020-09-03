import omit from 'ramda/es/omit';
import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { CartState, CartPayload } from 'types/store/CartState';

import { cartActions } from '../actions';

const DEFAULT_STATE: CartState = {};

const DEFAULT_ACTION: Action<CartPayload> = {
  type: '',
  payload: {
    id: '',
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [cartActions.ADD]: {
      ...state,
      [new Date().getTime().toString()]: action.payload,
    },
    [cartActions.REMOVE]: action?.payload?.id
      ? omit([action.payload.id], state)
      : state,
    [cartActions.CLEAR]: {},
  });
};
