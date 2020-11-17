import { push } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { endListing } from 'services/listing';
import { AsyncAction } from 'types/Action';
import { EndListingMeta, EndListingPayload } from 'types/store/EndListingState';
import { Store } from 'types/store/Store';

import { endListingActions, getAllListingsActions } from '../actions';

function* endListingRequest(
  action: AsyncAction<EndListingMeta, EndListingPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(endListing, action.meta, state.auth.token);
      yield put(endListingActions.success(data));
    } catch (e) {
      yield put(endListingActions.failed(e.message));
    }
  } else {
    yield put(endListingActions.failed('Token not found'));
  }
}

function* endListingSuccess(
  action: AsyncAction<EndListingMeta, EndListingPayload>
) {
  yield put(getAllListingsActions.request());
  yield put(push(SELLER_ROUTES.SELLING));
}

function* endListingWatcher() {
  yield takeLatest(endListingActions.REQUEST, endListingRequest);
  yield takeLatest(endListingActions.SUCCESS, endListingSuccess);
}

export default endListingWatcher;
