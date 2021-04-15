import { ADD_PRODUCT_ROUTES, SELLER_ROUTES } from 'consts';
import { put, takeLatest, select } from 'redux-saga/effects';
import { Action } from 'types/Action';
import { Store } from 'types/store/Store';

import { getCoopUsersActions, getUserActions } from '../actions';

function* routerRequest(
  action: Action<{
    location: {
      pathname: string;
      search: string;
      hash: string;
      key: string;
    };
    action: string;
    isFirstRendering: boolean;
  }>
) {
  const state: Store = yield select();
  const { isFirstRendering, location } = action.payload;
  const { pathname } = location;

  if (
    !isFirstRendering &&
    (pathname === SELLER_ROUTES.ADD_PRODUCT ||
      pathname === ADD_PRODUCT_ROUTES.BULK_UPLOAD_PREVIEW)
  ) {
    yield put(getCoopUsersActions.request());
  }
}

function* routerWatcher() {
  yield takeLatest('@@router/LOCATION_CHANGE', routerRequest);
}

export default routerWatcher;
