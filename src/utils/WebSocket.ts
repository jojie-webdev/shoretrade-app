import { Action, Store } from 'redux';
import createSocketConnection from 'services/websocket';
import {
  getAllBuyerListingsActions,
  getAllListingsActions,
  getBuyerHomepageActions,
  getListingActions,
  getListingsByTypeActions,
  getUserActions,
  socketCreditActions,
  socketGetAllListingsActions,
  socketGetListingActions,
  sockgetGetListingsByTypeActions,
} from 'store/actions';
import socketHomePageActions from 'store/actions/socketHomePage';
import getAllBuyerListings from 'store/reducers/getAllBuyerListings';

const createSocketMiddleware = () => {
  let socket: any;

  return (storeAPI: any) => (next: any) => (action: any) => {
    switch (action.type) {
      case '@@router/LOCATION_CHANGE': {
        if (!socket) {
          socket = createSocketConnection();
          const userData = storeAPI.getState().getUser.data;
          if (storeAPI.getState().getUser.data) {
            const companyId = userData.data.user.companies.length
              ? userData.data.user.companies[0].id
              : '';
            socket.emit('join', companyId);
          }
        }
        break;
      }
      case getUserActions.SUCCESS: {
        // get company id to join
        const companyId = action.payload.data.user.companies.length
          ? action.payload.data.user.companies[0].id
          : '';
        socket.emit('join', companyId);

        // NEW_CREDIT
        socket.on('NEW_CREDIT', (message: any) => {
          // dispatch action watched by sagas ?
          storeAPI.dispatch({
            type: socketCreditActions.HANDLE_EVENT,
            payload: message,
          });
        });

        break;
      }
      case getBuyerHomepageActions.REQUEST: {
        // UPDATE_REMAINING_BOXES
        socket.on('UPDATE_REMAINING_BOXES', (message: any) => {
          // dispatch action watched by sagas ?
          storeAPI.dispatch({
            type: socketHomePageActions.HANDLE_EVENT,
            payload: message,
          });
        });
        break;
      }
      case getAllListingsActions.REQUEST: {
        // UPDATE_REMAINING_BOXES
        socket.on('UPDATE_REMAINING_BOXES', (message: any) => {
          // dispatch action watched by sagas ?
          storeAPI.dispatch({
            type: socketGetAllListingsActions.HANDLE_EVENT,
            payload: message,
          });
        });
        break;
      }
      case getListingActions.REQUEST: {
        // UPDATE_REMAINING_BOXES
        socket.on('UPDATE_REMAINING_BOXES', (message: any) => {
          // dispatch action watched by sagas ?
          storeAPI.dispatch({
            type: socketGetListingActions.HANDLE_EVENT,
            payload: message,
          });
        });
        break;
      }
      case getListingsByTypeActions.REQUEST: {
        // UPDATE_REMAINING_BOXES
        socket.on('UPDATE_REMAINING_BOXES', (message: any) => {
          // dispatch action watched by sagas ?
          storeAPI.dispatch({
            type: sockgetGetListingsByTypeActions.HANDLE_EVENT,
            payload: message,
          });
        });
        break;
      }
      case getAllBuyerListingsActions.REQUEST: {
        // UPDATE_REMAINING_BOXES
        socket.on('UPDATE_REMAINING_BOXES', (message: any) => {
          // dispatch action watched by sagas ?
          storeAPI.dispatch({
            type: socketGetAllListingsActions.HANDLE_EVENT,
            payload: message,
          });
        });
        break;
      }
    }

    return next(action);
  };
};

export default createSocketMiddleware;
