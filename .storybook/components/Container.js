import React from 'react';

import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

import theme from '../../src/utils/Theme';

import '../../src/index.css';

const BaseContainer = styled.div`
  flex: 1;
  padding: 10px;
  height: 100%;
  width: 100%;
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
 * @property {string} [appType]
 */

/**
 *
 * @param {ContainerProps} props
 */
// eslint-disable-next-line react/prop-types
const Container = ({
  center = false,
  backgroundColor,
  children,
  appType = 'seller',
}) => {
  const Wrapper = center ? CenterContainer : BaseContainer;

  return (
    <ThemeProvider theme={{ ...theme, appType }}>
      <Wrapper style={{ backgroundColor: backgroundColor }}>{children}</Wrapper>
    </ThemeProvider>
  );
};

export default Container;
