import React from 'react';

import Button from 'components/base/Button';
import { Crab } from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { EmptyStateProps } from './EmptyState.props';
import { Container, MainText, SVGContainer } from './EmptyState.style';

const EmptyState = (props: EmptyStateProps): JSX.Element => {
  const theme = useTheme();

  const { title, buttonText, onButtonClicked, Svg } = props;

  const textColor = theme.appType === 'buyer' ? 'shade9' : 'noshade';
  const svgColor =
    theme.appType === 'buyer' ? theme.grey.shade7 : theme.grey.shade6;
  const circleColor =
    theme.appType === 'buyer' ? theme.grey.shade3 : theme.grey.shade9;

  return (
    <Container>
      <MainText variant="title5" className="title" color={textColor}>
        {title}
      </MainText>

      <SVGContainer circleColor={circleColor}>
        <Svg height={250} width={250} fill={svgColor} />
      </SVGContainer>

      <Button text={buttonText} onClick={onButtonClicked}></Button>
    </Container>
  );
};

export default React.memo(EmptyState);
