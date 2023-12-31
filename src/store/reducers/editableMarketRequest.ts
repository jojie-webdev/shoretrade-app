import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { EditableMarketRequestMeta } from 'types/store/EditableMarketRequest';

import { editableMarketRequestActions } from '../actions';

const DEFAULT_STATE: EditableMarketRequestMeta = {};

const DEFAULT_ACTION: Action<EditableMarketRequestMeta> = {
  type: '',
  payload: {},
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  const localReducer = (): EditableMarketRequestMeta => {
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
