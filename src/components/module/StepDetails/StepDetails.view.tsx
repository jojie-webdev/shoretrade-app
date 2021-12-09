import React from 'react';

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

  return (
    <Container className={className} style={style}>
      <StepNumberContainer>
        <StepNumber>{step}</StepNumber>
      </StepNumberContainer>
      <StepInfo>
        <StepTitle variant="title5">{title}</StepTitle>
        <StepDescription>{description}</StepDescription>
      </StepInfo>
    </Container>
  );
};

export default React.memo(StepDetails);
