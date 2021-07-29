import { Action } from 'types/Action';

import {
  EditableMarketRequestPayload,
  EditableMarketRequestState,
} from 'types/store/EditableMarketRequest';
import pathOr from 'ramda/es/pathOr';
import { editableMarketRequestActions } from '../actions';

const DEFAULT_STATE: EditableMarketRequestState = {};

const DEFAULT_ACTION: Action<EditableMarketRequestPayload> = {
  type: '',
  payload: {},
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  const localReducer = (): EditableMarketRequestState => {
    if (action.payload?.typeId) {
      return {
        companyId: state.companyId,
        addressId: state.addressId,
        buyerId: state.buyerId,
        typeId: action.payload.typeId,
      };
    }

    return {
      ...state,
      ...action.payload,
    };
  };
  return pathOr(state, [action.type], {
    [editableMarketRequestActions.UPDATE]: localReducer(),
    [editableMarketRequestActions.CLEAR]: DEFAULT_STATE,
  });
};
