import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updateFavouriteSeller } from 'services/favourite';
import updateFavoriteSellerActions from 'store/actions/updateFavoriteSeller';
// import { getBuyerHomepageActions } from 'store/actions';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateFavoriteSellerMeta,
  UpdateFavoriteSellerPayload,
} from 'types/store/UpdateFavoriteSellerState';

export function* updateFavoriteSellerRequest(
  action: AsyncAction<UpdateFavoriteSellerMeta, UpdateFavoriteSellerPayload>,
) {
  const state: Store = yield select();

  try {
    // Uncomment below to test async error handling
    // yield new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     reject(new Error('Custom error'));
    //   }, 3000);
    // });

    if (!state.auth.token) {
      throw new Error('Token not found');
    }
    const { data } = yield call(
      updateFavouriteSeller,
      action.meta,
      state.auth.token
    );

    if (data) {
      yield put(updateFavoriteSellerActions.success(data));
    }
  } catch (e) {
    yield put(
      updateFavoriteSellerActions.failed(
        'Could not update favorite seller request'
      )
    );
  }
}

function* updateFavoriteSellerSuccess(
  action: AsyncAction<UpdateFavoriteSellerMeta, UpdateFavoriteSellerPayload>
) {
  // TODO: Disabled until getBuyerHomepageActions is supported
  // yield put(getBuyerHomepageActions.request());
}

function* updateFavoriteSellerWatcher() {
  yield takeLatest(
    updateFavoriteSellerActions.REQUEST,
    updateFavoriteSellerRequest
  );
  yield takeLatest(
    updateFavoriteSellerActions.SUCCESS,
    updateFavoriteSellerSuccess
  );
  // yield takeLatest(loginActions.FAILED, loginFailed);
}

export default updateFavoriteSellerWatcher;
