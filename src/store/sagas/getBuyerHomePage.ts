import { put, call, takeLatest, select } from 'redux-saga/effects';
import {
    GetBuyerHomepageMeta,
    GetBuyerHomepagePayload,
} from 'types/store/GetBuyerHomepageState';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import { getBuyerHomepage } from 'services/company';
import { getBuyerHomepageActions } from '../actions';


function* getBuyerHomepageRequest(action: AsyncAction<GetBuyerHomepageMeta, GetBuyerHomepagePayload>,) {

    const state: Store = yield select();
    if (state.auth.token && state.currentAddress.id) {
        try {
            const data = yield call(getBuyerHomepage, { addressId: state.currentAddress.id }, state.auth.token)
            yield put(getBuyerHomepageActions.success(data))
        } catch (error) {
            yield put(getBuyerHomepageActions.failed(error.message))
        }

    } else {
        yield put(getBuyerHomepageActions.failed('Token not found.'))
    }

}

function* getBuyerHomepageWatcher() {
    yield takeLatest(getBuyerHomepageActions.REQUEST, getBuyerHomepageRequest);
}

export default getBuyerHomepageWatcher;