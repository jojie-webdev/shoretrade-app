import React from 'react';

import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

import theme from '../../src/utils/Theme';

const BaseContainer = styled.div`
  flex: 1;
  padding: 10px;
`;

const CenterContainer = styled(BaseContainer)`
  justify-content: center;
  align-items: center;
`;

/**
 *
 * @typedef {Object} ContainerProps
 * @property {Object} children
 * @property {boolean} [center]
 * @property {string} [background]
 */

/**
 *
 * @param {ContainerProps} props
 */
// eslint-disable-next-line react/prop-types
const Container = ({ center = false, backgroundColor, children }) => {
  const Wrapper = center ? CenterContainer : BaseContainer;
  return (
    <ThemeProvider theme={{ ...theme }}>
      <Wrapper style={{ backgroundColor: backgroundColor }}>{children}</Wrapper>
    </ThemeProvider>
  );
};

export default Container;
