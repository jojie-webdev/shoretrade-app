import React from 'react';

// import { useTheme } from 'utils/Theme';
import { HamburgerProps } from './Hamburger.props';
import { Container } from './Hamburger.style';

const Hamburger = (props: HamburgerProps): JSX.Element => {
  // const theme = useTheme();
  const { isActive, onClick, width, height, color } = props;

  return (
    <Container width={width} height={height} color={color}>
      <button
        onClick={onClick}
        className={`hamburger hamburger--slider ${isActive ? 'is-active' : ''}`}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </Container>
  );
};

export default Hamburger;
