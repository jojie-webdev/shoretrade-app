import omit from 'ramda/es/omit';
import pathOr from 'ramda/es/pathOr';
import { Action } from 'types/Action';
import { UploadBulkState } from 'types/store/UploadBulkState';

import { modifyBulkUploadActions } from '../actions';

const DEFAULT_STATE: Record<number, Partial<UploadBulkState>> = {};

const DEFAULT_ACTION: Action<Partial<UploadBulkState> & { index: number }> = {
  type: '',
  payload: {
    index: 0,
  },
};

export default (state = DEFAULT_STATE, action = DEFAULT_ACTION) => {
  return pathOr(state, [action.type], {
    [modifyBulkUploadActions.UPDATE]: {
      ...state,
      ...(action.payload
        ? {
            [action.payload.index]: {
              ...omit(['index'], action.payload),
            },
          }
        : {}),
    },
    [modifyBulkUploadActions.CLEAR]: {},
  });
};
