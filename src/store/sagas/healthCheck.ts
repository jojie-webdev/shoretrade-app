import { call, takeEvery, put } from 'redux-saga/effects';
import { getServerHealth } from 'services/system';
import { logoutActions } from 'store/actions';

function* healthCheckWatcher(): any {
  console.log('test');
  try {
    const { data } = yield call(getServerHealth);

    if (data.database === 'down' || data.server === 'down') {
      yield put(logoutActions.request());
    }
  } catch (e) {
    // Force logout
    yield put(logoutActions.request());
  }
}

function* initHealthCheck(): any {
  yield takeEvery(
    ({ type = '' }) => type.toUpperCase().includes('/FAILED'),
    healthCheckWatcher
  );
}

export default initHealthCheck;
