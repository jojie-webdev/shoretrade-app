import React from 'react';

import Button from 'components/base/Button';
import { useTheme } from 'utils/Theme';

import { EmptyDashboardProps } from './EmptyDashboard.props';
import { Container, MainText, SVGContainer } from './EmptyDashboard.style';

const EmptyDashboard = (props: EmptyDashboardProps): JSX.Element => {
  const theme = useTheme();

  const {
    buttonText,
    onButtonClicked,
    fluid = false,
    Svg,
    height,
    width,
  } = props;

  const textColor = theme.appType === 'buyer' ? 'shade9' : 'noshade';
  const svgColor =
    theme.appType === 'buyer' ? theme.grey.shade7 : theme.grey.shade6;
  const circleColor =
    theme.appType === 'buyer' ? theme.grey.shade2 : theme.grey.shade9;

  return (
    <Container fluid={fluid}>
      <div className="text-container">
        <MainText variant="title4" className="title" color={textColor}>
          There is still no available data
        </MainText>
        <div className="refresh-container">
          <MainText variant="label" color="shade6">
            Please change selected criterias or try to{' '}
            <a
              className="refresh-text"
              onClick={(e) => window.location.reload()}
            >
              refresh
            </a>
          </MainText>
        </div>
      </div>
      <SVGContainer
        circleHeight={props.circleHeight}
        circleWidth={props.circleWidth}
        circleColor={circleColor}
        fluid={fluid}
      >
        <Svg height={height || 311} width={width || 311} fill={svgColor} />
      </SVGContainer>

      {onButtonClicked && (
        <Button text={buttonText} onClick={onButtonClicked}></Button>
      )}
    </Container>
  );
};

export default React.memo(EmptyDashboard);
