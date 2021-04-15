import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import {
  EditableListingState,
  EditableListingPayload,
} from 'types/store/EditableListingState';

import { editableListingActions } from '../actions';

const DEFAULT_STATE: EditableListingState = {};

const DEFAULT_ACTION: Action<EditableListingPayload> = {
  type: '',
  payload: {},
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  const localReducer = (): EditableListingState => {
    if (action.payload?.isBulkUpload) {
      return action.payload;
    }

    if (action.payload?.type) {
      return {
        company: state.company,
        employee: state.employee,
        type: action.payload.type,
        currentListingId: action.payload.currentListingId,
        currentStep: action.payload.currentStep,
      };
    }

    if (action.payload?.customTypeData) {
      return {
        company: state.company,
        employee: state.employee,
        isCustomType: action.payload.isCustomType,
        customTypeData: action.payload.customTypeData,
      };
    }
    return {
      ...state,
      ...action.payload,
    };
  };
  return pathOr(state, [action.type], {
    [editableListingActions.UPDATE]: localReducer(),
    [editableListingActions.CLEAR]: DEFAULT_STATE,
  });
};
