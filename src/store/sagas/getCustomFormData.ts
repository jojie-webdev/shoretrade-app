import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getCustomFormData } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetCustomFormDataMeta,
  GetCustomFormDataPayload,
} from 'types/store/GetCustomFormDataState';
import { Store } from 'types/store/Store';

import { getCustomFormDataActions } from '../actions';

function* getCustomFormDataRequest(
  action: AsyncAction<GetCustomFormDataMeta, GetCustomFormDataPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getCustomFormData, state.auth.token);
      yield put(getCustomFormDataActions.success(data));
    } catch (e) {
      yield put(getCustomFormDataActions.failed(e.message));
    }
  } else {
    yield put(getCustomFormDataActions.failed('Token not found'));
  }
}

function* getCustomFormDataWatcher() {
  yield takeLatest(getCustomFormDataActions.REQUEST, getCustomFormDataRequest);
}

export default getCustomFormDataWatcher;
