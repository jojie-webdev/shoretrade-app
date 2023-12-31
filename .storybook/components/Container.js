/* eslint-disable react/prop-types */
import React from 'react';

import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { BrowserRouter } from 'react-router-dom';

import 'swiper/swiper-bundle.min.css';

import theme from '../../src/utils/Theme';

import '../../src/index.css';

const BaseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;
  width: 100%;
`;

const CenterContainer = styled(BaseContainer)`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

/**
 *
 * @typedef {Object} ContainerProps
 * @property {Object} [style]
 * @property {Object} children
 * @property {boolean} [center]
 * @property {string} [background]
 * @property {string} [appType]
 *
 */

/**
 *
 * @param {ContainerProps} props
 */
const Container = ({
  center = false,
  background,
  children,
  appType = 'seller',
  style,
}) => {
  const Wrapper = center ? CenterContainer : BaseContainer;
  const defaultBackground = appType === 'seller' ? '#111E2B' : '#F9FAFF';
  const textColor = appType === 'seller' ? 'white' : '#09131D';

  return (
    <BrowserRouter>
      <ThemeProvider theme={{ ...theme, appType }}>
        <Wrapper
          style={{
            color: textColor,
            backgroundColor: background || defaultBackground,
            ...style,
          }}
        >
          {children}
        </Wrapper>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Container;
