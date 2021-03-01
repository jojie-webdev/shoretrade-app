import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getMarketInterests } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  GetMarketInterestsMeta,
  GetMarketInterestsPayload,
} from 'types/store/GetMarketInterestsState';
import { Store } from 'types/store/Store';

import { getMarketInterestsActions } from '../actions';

function* getMarketInterestsRequest(
  action: AsyncAction<GetMarketInterestsMeta, GetMarketInterestsPayload>
) {
  const state: Store = yield select();

  if (state.auth.token) {
    try {
      const { data } = yield call(
        getMarketInterests,
        { companyId: action.meta.companyId },
        state.auth.token
      );

      yield put(getMarketInterestsActions.success(data.data));
    } catch (e) {
      yield put(getMarketInterestsActions.failed(e.message));
    }
  } else {
    yield put(getMarketInterestsActions.failed('Token not found'));
  }
}

function* getMarketInterestsWatcher() {
  yield takeLatest(
    getMarketInterestsActions.REQUEST,
    getMarketInterestsRequest
  );
}

export default getMarketInterestsWatcher;
