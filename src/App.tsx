import React from 'react';

import { ThemeProvider } from 'emotion-theming';
import theme from 'utils/Theme';

const App = (): JSX.Element => {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};

export default App;
