import React, { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { PaginationProps } from './Pagination.props';
import {
  Container,
  PaginationButton,
  PaginationDot,
  InfiniteDot,
} from './Pagination.style';

const Pagination = (props: PaginationProps): JSX.Element => {
  const theme = useTheme();

  const {
    spacing,
    numPages,
    currentValue,
    onClickButton = () => null,
    variant = 'number',
  } = props;

  const initialOffset = currentValue - 3;
  const [offset, setOffset] = useState(initialOffset > 0 ? initialOffset : 0);

  const onPrevious = () => {
    setOffset((n) => n - 1);
  };

  const onNext = () => {
    setOffset((n) => n + 1);
  };

  const numArray = [...Array(numPages).keys()].map((v) => v + 1);

  let pagination;

  if (variant === 'number') {
    const textColor = theme.appType === 'buyer' ? 'primary' : 'noshade';
    const iconColor =
      theme.appType === 'buyer' ? theme.brand.primary : theme.grey.noshade;

    pagination = (
      <>
        {numPages > 3 && offset > 0 && (
          <PaginationButton onClick={() => onPrevious()}>
            <ChevronLeft fill={iconColor} />
          </PaginationButton>
        )}

        <PaginationButton
          active={currentValue === offset + 1}
          onClick={() => onClickButton(offset + 1)}
        >
          <Typography
            variant="label"
            color={currentValue === offset + 1 ? 'noshade' : textColor}
          >
            {offset + 1}
          </Typography>
        </PaginationButton>

        {numPages >= offset + 2 && (
          <PaginationButton
            active={currentValue === offset + 2}
            onClick={() => onClickButton(offset + 2)}
          >
            <Typography
              variant="label"
              color={currentValue === offset + 2 ? 'noshade' : textColor}
            >
              {offset + 2}
            </Typography>
          </PaginationButton>
        )}

        {numPages >= offset + 3 && (
          <PaginationButton
            active={currentValue === offset + 3}
            onClick={() => onClickButton(offset + 3)}
          >
            <Typography
              variant="label"
              color={currentValue === offset + 3 ? 'noshade' : textColor}
            >
              {offset + 3}
            </Typography>
          </PaginationButton>
        )}

        {numPages > 3 && numPages > offset + 3 && (
          <PaginationButton onClick={() => onNext()}>
            <ChevronRight fill={iconColor} />
          </PaginationButton>
        )}
      </>
    );
  } else if (variant === 'dots') {
    pagination = (
      <>
        {numArray.map((value) => (
          <PaginationDot
            key={`pagination-dot-${value}`}
            active={currentValue === value}
            spacing={spacing}
          />
        ))}
      </>
    );
  } else if (variant === 'infinite-dots') {
    if (numPages < 3) {
      pagination = (
        <>
          {numArray.map((value, idx) => (
            <InfiniteDot key={idx} active={currentValue === value} />
          ))}
        </>
      );
    } else {
      pagination = (
        <>
          <InfiniteDot active={currentValue === 1} />
          <InfiniteDot
            active={currentValue !== 1 && currentValue !== numPages}
          />
          <InfiniteDot active={currentValue === numPages} />
        </>
      );
    }
  }

  return <Container>{pagination}</Container>;
};

export default React.memo(Pagination);
