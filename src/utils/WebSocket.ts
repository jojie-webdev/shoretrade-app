import { Action, Store } from 'redux';
import createSocketConnection from 'services/websocket';
import { getUserActions, socketCreditActions } from 'store/actions';
import socketHomePageActions from 'store/actions/socketHomePage';

const createSocketMiddleware = () => {
  let socket: any;

  return (storeAPI: any) => (next: any) => (action: any) => {
    switch (action.type) {
      case getUserActions.SUCCESS: {
        //authenticated
        socket = createSocketConnection();
        console.log(action);

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
    }

    return next(action);
  };
};

export default createSocketMiddleware;
