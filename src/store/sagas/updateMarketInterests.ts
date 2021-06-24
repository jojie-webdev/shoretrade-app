import { put, call, takeLatest, select, delay } from 'redux-saga/effects';
import { updateMarketInterests } from 'services/company';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateMarketInterestsMeta,
  UpdateMarketInterestsPayload,
} from 'types/store/UpdateMarketInterestsState';

import { updateMarketInterestsActions } from '../actions';

function* updateMarketInterestsRequest(
  action: AsyncAction<UpdateMarketInterestsMeta, UpdateMarketInterestsPayload>
) {
  const state: Store = yield select();

  if (state.auth.token) {
    try {
      const { data } = yield call(
        updateMarketInterests,
        { ...action.meta },
        state.auth.token
      );

      yield delay(1200);
      yield put(updateMarketInterestsActions.success(data));
    } catch (e) {
      yield put(updateMarketInterestsActions.failed(e.message));
    }
  } else {
    yield put(updateMarketInterestsActions.failed('Token not found'));
  }
}

function* updateMarketInterestsWatcher() {
  yield takeLatest(
    updateMarketInterestsActions.REQUEST,
    updateMarketInterestsRequest
  );
}

export default updateMarketInterestsWatcher;
