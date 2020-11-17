import { put, select, takeLatest } from 'redux-saga/effects';
import { Action } from 'types/Action';
import { EditableListingPayload } from 'types/store/EditableListingState';
import { Store } from 'types/store/Store';

import {
  editableListingActions,
  getListingFormDataActions,
  getMarketEstimateActions,
} from '../actions';

function* editableListingRunner(action: Action<EditableListingPayload>) {
  if (action.payload.type) {
    yield put(
      getListingFormDataActions.request({
        typeId: action.payload.type,
        currentListingId: action.payload.currentListingId || '',
      })
    );
  }

  if (action.payload.sizeFrom || action.payload.isUngraded !== undefined) {
    const state: Store = yield select();
    const {
      sizeTo,
      sizeFrom,
      type,
      states: specifications,
    } = state.editableListing;
    if (type) {
      yield put(
        getMarketEstimateActions.request({
          typeId: type || '',
          sizeFrom: sizeFrom || '',
          sizeTo: sizeTo || '',
          specifications: (specifications || []).join(),
        })
      );
    }
  }
}

function* editableListingWatcher() {
  yield takeLatest(editableListingActions.UPDATE, editableListingRunner);
}

export default editableListingWatcher;
