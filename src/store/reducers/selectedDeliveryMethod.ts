import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import {
  SelectedDeliveryMethodState,
  SelectedDeliveryMethodPayload,
} from 'types/store/SelectedDeliveryMethodState';

import { selectedDeliveryMethodActions } from '../actions';

const DEFAULT_STATE: SelectedDeliveryMethodState = {};

const DEFAULT_ACTION: Action<SelectedDeliveryMethodPayload> = {
  type: '',
  payload: {},
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  const localReducer = (): SelectedDeliveryMethodState => {
    return {
      ...state,
      ...action.payload,
    };
  };

  return pathOr(state, [action.type], {
    [selectedDeliveryMethodActions.UPDATE]: localReducer(),
    [selectedDeliveryMethodActions.CLEAR]: DEFAULT_STATE,
  });
};
