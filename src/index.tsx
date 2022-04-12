import React, { useState } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { ConnectedRouter } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import { ThemeProvider } from 'emotion-theming';
import ErrorBoundary from 'ErrorBoundary';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from 'routes/index.routes';
import { store, persistor, sagaMiddleware, history } from 'store';
import sagas from 'store/sagas';
import { Store } from 'types/store/Store';
import ScrollToTop from 'utils/ScrollToTop';
import sfmTheme from 'utils/SFMTheme';
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
// Update what theme to use based on location
const Theme = ({ children }: { children: React.ReactNode }) => {
  const pathname = useSelector(
    (state: Store) => state.router.location.pathname
  );
  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses || []
  );

  const isSeller =
    pathname.startsWith('/seller') || pathname === SELLER_ROUTES.REGISTER;

  const currentDefaultAddressCountryCode = (
    addresses.find((i) => i.default) || { countryCode: '' }
  ).countryCode;

  const isSFM =
    currentDefaultAddressCountryCode === 'AU' ||
    currentDefaultAddressCountryCode === 'NZ';

  if (isSFM) {
    document.body.classList.add('sfm');
  } else {
    document.body.classList.remove('sfm');
  }

  const themeToUse = isSFM ? sfmTheme : theme;

  return (
    <ThemeProvider
      theme={{ ...themeToUse, appType: isSeller ? 'seller' : 'buyer', isSFM }}
    >
      {children}
    </ThemeProvider>
  );
};

const App = () => {
  // eslint-disable-next-line
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
