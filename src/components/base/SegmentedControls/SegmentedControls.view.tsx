import React from 'react';

// import { useTheme } from 'utils/Theme';
import { Row, Col } from 'react-grid-system';

import { SegmentedControlsProps } from './SegmentedControls.props';
import { Container, ControlButton } from './SegmentedControls.style';

const SegmentedControls = (props: SegmentedControlsProps): JSX.Element => {
  // const theme = useTheme();

  const { options, selectedOption, onClickControl } = props;

  return (
    <Container>
      <Row className="row" nogutter>
        {options.map((option) => (
          <Col key={option}>
            <ControlButton
              active={option === selectedOption}
              onClick={() => onClickControl(option)}
            >
              {option}
            </ControlButton>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default React.memo(SegmentedControls);
