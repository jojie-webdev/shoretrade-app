import { Action, Store } from 'redux';
import createSocketConnection from 'services/websocket';
import { getUserActions } from 'store/actions';

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
        socket.on('NEW_CREDIT', (message: any) => {
           // dispatch action watched by sagas ?
          storeAPI.dispatch({
            type: 'SOCKET_MESSAGE_RECEIVED',
            payload: message,
          });
        });
        break;
      }
      case 'SEND_WEBSOCKET_MESSAGE': {
        socket.send(action.payload);
        return;
      }
    }

    return next(action);
  };
};

export default createSocketMiddleware;
