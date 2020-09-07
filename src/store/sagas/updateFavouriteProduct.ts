import { BUYER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updateFavouriteProduct } from 'services/favourite';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateFavouriteProductMeta,
  UpdateFavouriteProductPayload,
} from 'types/store/UpdateFavouriteProductState';

import {
  updateFavouriteProductActions,
  getListingActions,
  getBuyerHomepageActions,
} from '../actions';

function* updateFavouriteProductRequest(
  action: AsyncAction<UpdateFavouriteProductMeta, UpdateFavouriteProductPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        updateFavouriteProduct,
        action.meta,
        state.auth.token
      );
      yield put(updateFavouriteProductActions.success(data));
    } catch (e) {
      yield put(updateFavouriteProductActions.failed(e.message));
    }
  } else {
    yield put(updateFavouriteProductActions.failed('Token not found'));
  }
}

function* updateFavouriteProductSuccess(
  action: AsyncAction<UpdateFavouriteProductMeta, UpdateFavouriteProductPayload>
) {
  const state: Store = yield select();
  const currentListingId =
    state.updateFavouriteProduct.request?.listingId || '';
  if (
    state.router.location.pathname === BUYER_ROUTES.PRODUCT_PREVIEW() &&
    currentListingId
  ) {
    yield put(
      getListingActions.request({
        listingId: currentListingId,
      })
    );
  }

  yield put(getBuyerHomepageActions.request());
}

function* updateFavouriteProductWatcher() {
  yield takeLatest(
    updateFavouriteProductActions.REQUEST,
    updateFavouriteProductRequest
  );
  yield takeLatest(
    updateFavouriteProductActions.SUCCESS,
    updateFavouriteProductSuccess
  );
}

export default updateFavouriteProductWatcher;
