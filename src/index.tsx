import React, { useState } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'emotion-theming';
import { props } from 'ramda';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from 'routes/index.routes';
import { store, persistor, sagaMiddleware, history } from 'store';
import sagas from 'store/sagas';
import { Store } from 'types/store/Store';
import theme from 'utils/Theme';

// Initialize languages
import './locales/i18n';

// load css
import './normalize.css';
import 'swiper/swiper-bundle.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

// create the saga middleware
sagaMiddleware.run(sagas);

// Update theme appType based on path
const Theme = ({ children }: { children: React.ReactNode }) => {
  const pathname = useSelector(
    (state: Store) => state.router.location.pathname
  );
  const isSeller = pathname.startsWith('/seller');

  return (
    <ThemeProvider theme={{ ...theme, appType: isSeller ? 'seller' : 'buyer' }}>
      {children}
    </ThemeProvider>
  );
};

const App = () => {
  const [rehydrated, setRehydrated] = useState(false);
  const onRehydate = async () => {
    setRehydrated(true);
  };
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor(onRehydate)}>
          <ConnectedRouter history={history}>
            <Theme>
              <Routes />
            </Theme>
          </ConnectedRouter>
        </PersistGate>
      </ReduxProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
