import { Theme } from 'types/Theme';
import styled from 'utils/styled';

// Code copied from https://github.com/jonsuh/hamburgers
export const Container = styled.div<{
  height?: number;
  width?: number;
  color?: keyof Theme['brand'] | keyof Theme['grey'];
}>`
  .hamburger {
    padding: 4px;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    // color: ${(props) => (props.color ? props.color : 'inherit')};
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    overflow: visible;
  }



  .hamburger.is-active .hamburger-inner,
  .hamburger.is-active .hamburger-inner::before,
  .hamburger.is-active .hamburger-inner::after {
    background-color: ${(props) =>
      props.theme.appType === 'buyer'
        ? props.theme.grey.shade9
        : props.theme.grey.noshade};
  }

  .hamburger-box {
    width: ${(props) => (props.width ? `${props.width}px` : '40px')};
    height: ${(props) => (props.height ? `${props.height}px` : '24px')};
    display: inline-block;
    position: relative;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
  }

  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: ${(props) => (props.width ? `${props.width}px` : '40px')};
    height: 4px;
    background-color: ${(props) =>
      props.theme.appType === 'buyer'
        ? props.theme.grey.shade9
        : props.theme.grey.noshade};
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  .hamburger-inner::before,
  .hamburger-inner::after {
    content: '';
    display: block;
  }

  .hamburger-inner::before {
    top: -10px;
  }

  .hamburger-inner::after {
    bottom: -10px;
  }

  .hamburger--slider .hamburger-inner {
    top: 2px;
  }

  .hamburger--slider .hamburger-inner::before {
    top: 10px;
    transition-property: transform, opacity;
    transition-timing-function: ease;
    transition-duration: 0.15s;
  }

  .hamburger--slider .hamburger-inner::after {
    top: 20px;
  }

  .hamburger--slider.is-active .hamburger-inner {
    transform: translate3d(0, 10px, 0) rotate(45deg);
  }
  .hamburger--slider.is-active .hamburger-inner::before {
    transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
    opacity: 0;
  }
  .hamburger--slider.is-active .hamburger-inner::after {
    transform: translate3d(0, -20px, 0) rotate(-90deg);
  }
`;
