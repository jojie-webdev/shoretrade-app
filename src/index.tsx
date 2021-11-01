import React, { useState } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { ConnectedRouter } from 'connected-react-router';
import { API, SELLER_ROUTES } from 'consts';
import { ThemeProvider } from 'emotion-theming';
import ErrorBoundary from 'ErrorBoundary';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from 'routes/index.routes';
import io from 'socket.io-client';
import { store, persistor, sagaMiddleware, history } from 'store';
import sagas from 'store/sagas';
import { Store } from 'types/store/Store';
import ScrollToTop from 'utils/ScrollToTop';
import theme from 'utils/Theme';

// Initialize languages
import './locales/i18n';

// load css
import './normalize.css';
import 'swiper/swiper-bundle.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// create the saga middleware
sagaMiddleware.run(sagas);

// Update theme appType based on path
const Theme = ({ children }: { children: React.ReactNode }) => {
  const pathname = useSelector(
    (state: Store) => state.router.location.pathname
  );
  const isSeller =
    pathname.startsWith('/seller') || pathname === SELLER_ROUTES.REGISTER;

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
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor(onRehydate)}>
          <ConnectedRouter history={history}>
            <ScrollToTop />
            <React.StrictMode>
              <Theme>
                <Routes />
              </Theme>
            </React.StrictMode>
          </ConnectedRouter>
        </PersistGate>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
