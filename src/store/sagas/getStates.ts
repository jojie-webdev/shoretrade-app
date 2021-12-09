import { put, call, takeLatest } from 'redux-saga/effects';
import { getStates } from 'services/license';
import { AsyncAction } from 'types/Action';
import { GetStatesMeta, GetStatesPayload } from 'types/store/GetStatesState';

import { getStatesActions } from '../actions';

function* getStatesRequest(
  action: AsyncAction<GetStatesMeta, GetStatesPayload>
) {
  try {
    const { data } = yield call(getStates);
    yield put(getStatesActions.success(data));
  } catch (e) {
    yield put(getStatesActions.failed(e.message));
  }
}

function* getStatesWatcher() {
  yield takeLatest(getStatesActions.REQUEST, getStatesRequest);
}

export default getStatesWatcher;
