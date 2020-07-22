import React from 'react';

import { ThemeProvider } from 'emotion-theming';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'routes';
import theme from 'utils/Theme';

// Initialize languages
import './locales/i18n';

import './index.css';
import * as serviceWorker from './serviceWorker';

const App = () => (
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
