import omit from 'ramda/es/omit';
import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { UploadBulkState } from 'types/store/UploadBulkState';

import { modifyBulkUploadActions } from '../actions';

const DEFAULT_STATE: {
  modifiedData: Record<number, Partial<UploadBulkState>>;
  currentData: Partial<UploadBulkState> & {
    index?: number;
    currentStep?: number;
  };
} = {
  modifiedData: {},
  currentData: {},
};

const DEFAULT_ACTION: Action<
  Partial<UploadBulkState> & { index?: number; currentStep?: number }
> = {
  type: '',
  payload: {},
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [modifyBulkUploadActions.UPDATE]: {
      currentData: {},
      modifiedData: {
        ...state.modifiedData,
        ...(action.payload &&
        state.currentData &&
        state.currentData.index !== undefined
          ? {
              [state.currentData.index]: {
                ...state.modifiedData[state.currentData.index],
                ...omit(['index', 'currentStep'], action.payload),
              },
            }
          : {}),
      },
    },
    [modifyBulkUploadActions.EDIT]: {
      ...state,
      currentData: action.payload,
    },
    [modifyBulkUploadActions.CLEAR_SELECTION]: {
      ...state,
      currentData: {},
    },
    [modifyBulkUploadActions.CLEAR]: DEFAULT_STATE,
  });
};
