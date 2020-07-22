import React from 'react';

import { ThemeProvider } from 'emotion-theming';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'routes';
import theme from 'utils/Theme';

const App = (): JSX.Element => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Router>
  );
};

export default App;
