import { push } from 'connected-react-router';
import { ADD_PRODUCT_ROUTES } from 'consts';
import unnest from 'ramda/src/unnest';
import { select, put, takeLatest } from 'redux-saga/effects';
import { toEmployeeOptions } from 'routes/Seller/AddProduct/AddProduct.container';
import { Action } from 'types/Action';
import { Store } from 'types/store/Store';
import { UploadBulkState } from 'types/store/UploadBulkState';

import { editableListingActions, modifyBulkUploadActions } from '../actions';

//TODO: bulk upload catch recurrence
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
          isBulkUpload: true,
          type: action.payload.type,
          employee: action.payload.employeeId,
          company,
          currentStep: action.payload.currentStep,
          states: action.payload.specifications,
          sizeFrom: action.payload.sizeFrom,
          sizeTo: action.payload.sizeTo,
          isUngraded: action.payload.isUngraded,
          isAquafuture: action.payload.isAquafuture,
          boxes: action.payload.boxes,
          sellInMultiplesOfMinOrder: action.payload.sellInMultiplesOfMinOrder,
          minOrder: action.payload.minOrder,
          pricePerKilo: action.payload.pricePerKilo,
          //@ts-ignore
          catchDate: action.payload.catchDate,
          origin: action.payload.origin,
          addressId: action.payload.addressId,
          //@ts-ignore
          ends: action.payload.ends,
          description: action.payload.description,
        })
      );

      // assume we are on bulk upload page
      yield put(push(ADD_PRODUCT_ROUTES.LANDING));
    }
  }
}

function* modifyBulkUploadUpdate(
  action: Action<
    Partial<UploadBulkState> & { index: number; currentStep: number }
  >
) {
  // assume we are on add listing page
  yield put(editableListingActions.clear());
  yield put(push(ADD_PRODUCT_ROUTES.BULK_UPLOAD_PREVIEW));
}

function* editSelectedListingWatcher() {
  yield takeLatest(modifyBulkUploadActions.EDIT, modifyBulkUploadEdit);
  yield takeLatest(modifyBulkUploadActions.UPDATE, modifyBulkUploadUpdate);
}

export default editSelectedListingWatcher;
