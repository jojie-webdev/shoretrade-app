import omit from 'ramda/es/omit';
import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import {
  MarketOfferPayload,
  MarketOfferState,
} from 'types/store/MarketOfferState';

import { marketOfferActions } from '../actions';

const DEFAULT_STATE: MarketOfferState = {};

const DEFAULT_ACTION: Action<MarketOfferPayload> = {
  type: '',
  payload: {
    id: '',
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [marketOfferActions.ADD]: {
      ...state,
      ...action.payload,
    },
    [marketOfferActions.REMOVE]: action?.payload?.id
      ? omit([action.payload.id], state)
      : state,
    [marketOfferActions.CLEAR]: {},
  });
};
