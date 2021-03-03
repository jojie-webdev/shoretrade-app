import { push } from 'connected-react-router';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createMarketOffer } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  CreateMarketOfferMeta,
  CreateMarketOfferPayload,
} from 'types/store/CreateMarketOfferState';
import { Store } from 'types/store/Store';

import { createMarketOfferActions } from '../actions';

function* createMarketRequestOfferDatabase(
  action: AsyncAction<CreateMarketOfferMeta, CreateMarketOfferPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    const cleanedData = [...action.meta].map((item) => {
      if (item.listStateOptions) {
        delete item.listStateOptions;
        delete item.type;
        delete item.image;
        delete item.measurementUnit;
      }
      return {
        ...item,
      };
    });
    const payload = { marketOffers: cleanedData };

    try {
      const { data } = yield call(createMarketOffer, payload, state.auth.token);
      yield put(createMarketOfferActions.success(data));
    } catch (e) {
      yield put(createMarketOfferActions.failed(e.message));
    }
  } else {
    yield put(createMarketOfferActions.failed('Token not found'));
  }
}

function* createMarketRequestOfferSuccess() {
  yield put(
    push(SELLER_MARKET_BOARD_ROUTES.LANDING, {
      currentTab: 'My Active Offers',
    })
  );
}

function* createMarketRequestOfferWatcher() {
  yield takeLatest(
    createMarketOfferActions.REQUEST,
    createMarketRequestOfferDatabase
  );
  yield takeLatest(
    createMarketOfferActions.SUCCESS,
    createMarketRequestOfferSuccess
  );
}

export default createMarketRequestOfferWatcher;
