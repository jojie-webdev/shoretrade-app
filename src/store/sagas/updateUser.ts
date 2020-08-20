import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { pathOr } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { uploadImageData } from 'services/upload';
import { updateUser } from 'services/user';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateUserMeta,
  UpdateUserPayload,
  UpdateUserRequestData,
  UpdateUserImageRequestData,
} from 'types/store/UpdateUserState';

import { updateUserActions, getUserActions } from '../actions';

function* updateUserRequest(
  action: AsyncAction<UpdateUserMeta, UpdateUserPayload>
) {
  const state: Store = yield select();
  const userId = state.getUser.data?.data.user.id || '';

  let metaData: UpdateUserRequestData | UpdateUserImageRequestData;

  let wasUpdatingLogo = false;

  if (state.auth.token) {
    try {
      // If we're updating the user/company logo
      if ('logo' in action.meta) {
        // const { data: profileImage } = yield call(uploadImageData, {
        //   fileName: action.meta.logo.fileName || '',
        //   data: action.meta.logo.data,
        //   type: action.meta.logo.type || '',
        //   asset: 'company',
        // });

        metaData = {
          userId,
          logo: '', // profileImage.url,
          companyId: action.meta.companyId,
        };

        wasUpdatingLogo = true;
      } else {
        metaData = { userId, ...action.meta };
        wasUpdatingLogo = false;
      }

      const { data } = yield call(updateUser, metaData, state.auth.token);
      yield put(updateUserActions.success({ ...data, wasUpdatingLogo }));
    } catch (e) {
      yield put(updateUserActions.failed(e.message));
    }
  } else {
    yield put(updateUserActions.failed('Token not found'));
  }
}

function* updateUserSuccess(
  action: AsyncAction<UpdateUserMeta, UpdateUserPayload>
) {
  const wasUpdatingLogo = pathOr(false, ['payload', 'wasUpdatingLogo'], action);

  yield put(getUserActions.request());
  if (!wasUpdatingLogo) {
    // TODO: Change this to fetch user and AlertSuccess
    yield put(push(SELLER_ACCOUNT_ROUTES.LANDING));
  }
}

function* updateUserWatcher() {
  yield takeLatest(updateUserActions.REQUEST, updateUserRequest);
  yield takeLatest(updateUserActions.SUCCESS, updateUserSuccess);
}

export default updateUserWatcher;
