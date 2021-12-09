import { put, call, takeLatest, select } from 'redux-saga/effects';
import { sendOrderRating } from 'services/rating';
import { AsyncAction } from 'types/Action';
import {
  SendOrderRatingMeta,
  SendOrderRatingPayload,
} from 'types/store/SendOrderRatingState';
import { Store } from 'types/store/Store';

import { sendOrderRatingActions } from '../actions';

function* sendOrderRatingRequest(
  action: AsyncAction<SendOrderRatingMeta, SendOrderRatingPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        sendOrderRating,
        action.meta,
        state.auth.token
      );
      yield put(sendOrderRatingActions.success(data));
    } catch (e) {
      yield put(sendOrderRatingActions.failed(e.message));
    }
  } else {
    yield put(sendOrderRatingActions.failed('Token not found'));
  }
}

function* sendOrderRatingWatcher() {
  yield takeLatest(sendOrderRatingActions.REQUEST, sendOrderRatingRequest);
}

export default sendOrderRatingWatcher;
