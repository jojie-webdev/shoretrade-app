import partial from 'ramda/es/partial';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select, all } from 'redux-saga/effects';
import { getShippingQuote } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetShippingQuoteMeta,
  GetShippingQuotePayload,
  GetShippingQuoteRequestData,
  GetShippingQuoteResponse,
  GetShippingQuoteResponseItem,
} from 'types/store/GetShippingQuoteState';
import { Store } from 'types/store/Store';
import { requestLimiter } from 'utils/requestLimiter';

import { getShippingQuoteActions } from '../actions';

function* getShippingQuoteRequest(
  action: AsyncAction<GetShippingQuoteMeta, GetShippingQuotePayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { destination, sellers } = action.meta;

      const getMultipleShippingQuoteResponse: {
        data: GetShippingQuoteResponse;
      }[] = yield all(
        Object.keys(sellers).map((key) => {
          return call<any>(
            getShippingQuote,

            {
              destination,

              listing: sellers[key],
            },

            state.auth.token
          );
        })
      );

      const payload: Record<string, GetShippingQuoteResponseItem> = Object.keys(
        sellers
      ).reduce((accum, current, index): Record<
        string,
        GetShippingQuoteResponseItem
      > => {
        const quoteData = pathOr({}, [index, 'data', 'data', 'data'], getMultipleShippingQuoteResponse)
        return {
          ...accum,

          [current]: quoteData
        };
      }, {});

      yield put(
        getShippingQuoteActions.success({
          data: payload,

          status: 200,

          message: 'These are all the quote options.',
        })
      );
    } catch (e) {
      yield put(getShippingQuoteActions.failed(e.message));
    }
  } else {
    yield put(getShippingQuoteActions.failed('Token not found'));
  }
}

function* getShippingQuoteWatcher() {
  yield takeLatest(
    getShippingQuoteActions.REQUEST,
    partial(requestLimiter, [
      getShippingQuoteRequest,
      getShippingQuoteActions.failed,
    ])
  );
}

export default getShippingQuoteWatcher;
