import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllBuyerListings } from 'services/listing';
// import { AsyncAction } from 'types/Action';
// import {
//   GetAllBuyerListingsMeta,
//   GetAllBuyerListingsPayload,
// } from 'types/store/GetAllBuyerListingsState';
import { Store } from 'types/store/Store';
import { downloadCsv } from 'utils/downloadCsv';

import { getAllBuyerListingsActions } from '../actions';

function* getAllBuyerListingsRequest(action: any) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getAllBuyerListings, state.auth.token, {
        sortBy: action.payload?.sortField,
        term: action.payload?.searchTerm,
        page: action.payload?.page,
        limit: action.payload?.limit,
        sortOrder: action.payload?.sortOrder,
      });
      yield put(getAllBuyerListingsActions.success(data));
    } catch (e) {
      yield put(getAllBuyerListingsActions.failed(e.message));
    }
  } else {
    yield put(getAllBuyerListingsActions.failed('Token not found'));
  }
}

function* getAllBuyerListingsCSV(action: any) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getAllBuyerListings, state.auth.token, {
        sortBy: action.payload?.sortField,
        term: action.payload?.searchTerm,
        csv: action.payload?.csv,
        page: action.payload?.page,
        limit: action.payload?.limit,
        sortOrder: action.payload?.sortOrder,
        ids: action.payload?.ids,
      });
      downloadCsv(data, `All listing.csv`);
      yield put(getAllBuyerListingsActions.requestCsvSuccess());
    } catch (e) {
      yield put(getAllBuyerListingsActions.failed(e.message));
    }
  } else {
    yield put(getAllBuyerListingsActions.failed('Token not found'));
  }
}

function* getAllBuyerListingsWatcher() {
  yield takeLatest(
    getAllBuyerListingsActions.REQUEST,
    getAllBuyerListingsRequest
  );
  yield takeLatest(
    `${getAllBuyerListingsActions.REQUEST}/CSV`,
    getAllBuyerListingsCSV
  );
}

export default getAllBuyerListingsWatcher;
