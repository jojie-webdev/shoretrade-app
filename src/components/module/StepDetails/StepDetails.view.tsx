import React from 'react';

import { useTheme } from 'utils/Theme';

import { StepDetailsProps } from './StepDetails.props';
import {
  Container,
  StepNumberContainer,
  StepNumber,
  StepInfo,
  StepTitle,
  StepDescription,
} from './StepDetails.style';

const StepDetails = (props: StepDetailsProps): JSX.Element => {
  const { className, step, title, description, style } = props;
  const theme = useTheme();

  return (
    <Container className={className} style={style}>
      <StepNumberContainer>
        <StepNumber
          variant="label"
          color={theme.appType === 'buyer' ? 'shade9' : 'noshade'}
        >
          {step}
        </StepNumber>
      </StepNumberContainer>
      <StepInfo>
        <StepTitle>{title}</StepTitle>
        <StepDescription variant="label" weight="400">
          {description}
        </StepDescription>
      </StepInfo>
    </Container>
  );
};

export default React.memo(StepDetails);
