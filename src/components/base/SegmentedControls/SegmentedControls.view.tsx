import React from 'react';

// import { useTheme } from 'utils/Theme';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { InfoFilled } from '../SVG';
import { SVGProps } from '../SVG/SVG.props';
import { SegmentedControlsProps } from './SegmentedControls.props';
import { Container, ControlButton } from './SegmentedControls.style';
const SegmentedControls = (props: SegmentedControlsProps): JSX.Element => {
  // const theme = useTheme();

  const {
    options,
    selectedOption,
    onClickControl,
    tooltips,
    controlButtonColor,
    controlButtonTextColor,
  } = props;
  const Icon: React.FC<SVGProps> = InfoFilled;
  const theme = useTheme();
  return (
    <Container>
      <Row className="row" nogutter>
        {options.map((option) => {
          const currentTooltip = tooltips?.find((t) => t.option === option);
          const value = currentTooltip ? currentTooltip.value : '';

          return (
            <Col key={option}>
              <ControlButton
                active={option === selectedOption}
                onClick={() => onClickControl(option)}
                backgroundColor={controlButtonColor}
                textColor={controlButtonTextColor}
                type="button"
              >
                {option}
                {value && (
                  <div className="tooltip">
                    <Icon width={20} height={20} fill={theme.brand.info} />
                    <span className="tooltip-text">{value}</span>
                  </div>
                )}
              </ControlButton>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default React.memo(SegmentedControls);
