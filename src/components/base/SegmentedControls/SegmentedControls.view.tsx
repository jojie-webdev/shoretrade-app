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

  const { options, selectedOption, onClickControl } = props;
  const Icon: React.FC<SVGProps> = InfoFilled;
  const theme = useTheme();
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
              {option === 'Buyer Requests' && (
                <div className="tooltip">
                  <Icon width={20} height={20} fill={theme.brand.info}></Icon>
                  <span className="tooltip-text">
                    Buyer requests detail products buyers want to purchase. You
                    will be able to view requests and make offers. Both parties
                    can negotiate the price until an offer is accepted. It is
                    the seller's responsibility to organise shipping of these
                    products to the buyer.
                  </span>
                </div>
              )}
            </ControlButton>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default React.memo(SegmentedControls);
