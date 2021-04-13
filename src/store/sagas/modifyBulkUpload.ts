import { push } from 'connected-react-router';
import { ADD_PRODUCT_ROUTES, SELLER_ROUTES } from 'consts';
import moment from 'moment';
import unnest from 'ramda/src/unnest';
import { select, put, takeLatest } from 'redux-saga/effects';
import { toEmployeeOptions } from 'routes/Seller/AddProduct/AddProduct.container';
import { Action, AsyncAction } from 'types/Action';
import { EditableListingState } from 'types/store/EditableListingState';
import { EditSelectedListingPayload } from 'types/store/EditSelectedListingState';
import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';
import { GetCoopUsersResponseItem } from 'types/store/GetCoopUsersState';
import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
  GetListingFormDataResponse,
} from 'types/store/GetListingFormDataState';
import { Store } from 'types/store/Store';
import { UploadBulkState } from 'types/store/UploadBulkState';

import {
  editSelectedListingActions,
  editableListingActions,
  getListingFormDataActions,
  modifyBulkUploadActions,
} from '../actions';

function* modifyBulkUploadEdit(
  action: Action<
    Partial<UploadBulkState> & { index: number; currentStep: number }
  >
) {
  if (action.payload.currentStep) {
    const state: Store = yield select();
    const coopUsers = state.getCoopUsers.data?.data.users || [];
    const employeeList = unnest(coopUsers.map(toEmployeeOptions));
    const company =
      employeeList.find((e) => e.value === action.payload.employeeId)
        ?.company || '';
    if (company) {
      // this will reset editable listing state and fire getListingFormDataActions
      // step 2 will be triggered when getListingFormDataActions is success
      yield put(
        editableListingActions.update({
          type: action.payload.type,
          employee: action.payload.employeeId,
          company,
          currentStep: action.payload.currentStep,
        })
      );

      // assume we are on bulk upload page
      yield put(push(ADD_PRODUCT_ROUTES.LANDING));
    }
  }
}

function* editSelectedListingWatcher() {
  yield takeLatest(modifyBulkUploadActions.EDIT, modifyBulkUploadEdit);
}

export default editSelectedListingWatcher;
