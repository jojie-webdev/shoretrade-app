import { put, takeLatest } from 'redux-saga/effects';
import { Action } from 'types/Action';
import { EditableListingPayload } from 'types/store/EditableListingState';

import { editableListingActions, getListingFormDataActions } from '../actions';

function* editableListingRunner(action: Action<EditableListingPayload>) {
  if (action.payload.type) {
    yield put(
      getListingFormDataActions.request({
        typeId: action.payload.type,
        currentListingId: action.payload.currentListingId || '',
      })
    );
  }
}

function* editableListingWatcher() {
  yield takeLatest(editableListingActions.UPDATE, editableListingRunner);
}

export default editableListingWatcher;
