import React from 'react';

import AnimationPlayer from 'components/base/AnimationPlayer';
import Button from 'components/base/Button';
import { useTheme } from 'utils/Theme';

import { EmptyStateProps } from './EmptyState.props';
import { Container, MainText, SVGContainer } from './EmptyState.style';

const EmptyState = (props: EmptyStateProps): JSX.Element => {
  const theme = useTheme();

  const {
    title,
    buttonText,
    onButtonClicked,
    fluid = false,
    Svg,
    height,
    width,
    textAlign,
    AnimatedSvg,
  } = props;

  const textColor = theme.appType === 'buyer' ? 'shade9' : 'noshade';
  const svgColor =
    theme.appType === 'buyer' ? theme.grey.shade7 : theme.grey.shade6;
  const circleColor =
    theme.appType === 'buyer' ? theme.grey.shade2 : theme.grey.shade9;

  return (
    <Container fluid={fluid}>
      {title && (
        <MainText
          variant="title5"
          className="empty-state-title"
          color={textColor}
          align={textAlign ? textAlign : 'left'}
        >
          {title}
        </MainText>
      )}
      {AnimatedSvg && (
        <AnimationPlayer
          src={AnimatedSvg}
          style={{
            width: `${props.containerWidth}px`,
            height: `${props.containerHeight}px`,
          }}
        />
      )}
      {Svg && (
        <SVGContainer
          containerHeight={props.containerHeight}
          containerWidth={props.containerWidth}
          circleHeight={props.circleHeight}
          circleWidth={props.circleWidth}
          circleColor={circleColor}
          fluid={fluid}
        >
          <Svg height={height || 311} width={width || 311} fill={svgColor} />
        </SVGContainer>
      )}

      {onButtonClicked && (
        <Button text={buttonText} onClick={onButtonClicked} />
      )}
    </Container>
  );
};

export default React.memo(EmptyState);
