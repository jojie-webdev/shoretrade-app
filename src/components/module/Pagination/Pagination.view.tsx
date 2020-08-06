import React from 'react';

// import { useTheme } from 'utils/Theme';
import { ChevronLeft, ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';

import { PaginationProps } from './Pagination.props';
import {
  Container,
  PaginationButton,
  PaginationDot,
  InfiniteDot,
} from './Pagination.style';

const Pagination = (props: PaginationProps): JSX.Element => {
  // const theme = useTheme();

  const { numPages, currentValue, onClickButton, variant = 'number' } = props;

  const numArray = [];

  for (let x = 0; x < numPages; x++) {
    numArray.push(x + 1);
  }

  function onClickManualControl(type: 'forward' | 'backward') {
    if (type === 'backward' && currentValue - 1 >= 1) {
      onClickButton(currentValue - 1);
      return;
    }

    if (type === 'forward' && currentValue + 1 <= numPages) {
      onClickButton(currentValue + 1);
      return;
    }
  }

  let pagination;

  if (variant === 'number') {
    pagination = (
      <>
        <PaginationButton onClick={() => onClickManualControl('backward')}>
          <ChevronLeft />
        </PaginationButton>
        {numArray.map((value) => (
          <PaginationButton
            key={`pagination-${value}`}
            active={currentValue === value}
            onClick={() => onClickButton(value)}
          >
            <Typography
              variant="label"
              color={currentValue === value ? 'noshade' : 'primary'}
            >
              {value}
            </Typography>
          </PaginationButton>
        ))}
        <PaginationButton onClick={() => onClickManualControl('forward')}>
          <ChevronRight />
        </PaginationButton>
      </>
    );
  } else if (variant === 'dots') {
    pagination = (
      <>
        {numArray.map((value) => (
          <PaginationDot
            key={`pagination-dot-${value}`}
            active={currentValue === value}
          />
        ))}
      </>
    );
  } else if (variant === 'infinite-dots') {
    pagination = (
      <>
        <InfiniteDot active={currentValue === 1} />
        <InfiniteDot active={currentValue !== 1 && currentValue !== numPages} />
        <InfiniteDot active={currentValue === numPages} />
      </>
    );
  }

  return <Container>{pagination}</Container>;
};

export default React.memo(Pagination);
