import React from 'react';

// import { useTheme } from 'utils/Theme';
import SegmentedControls from 'components/base/SegmentedControls';
import { Octopus } from 'components/base/SVG';
import EmptyState from 'components/module/EmptyState';
import { Row, Col } from 'react-grid-system';

import { SoldGeneratedProps, TabOptions } from './Sold.props';
import { Container } from './Sold.style';

const SoldView = (props: SoldGeneratedProps) => {
  // const theme = useTheme();

  const { toggleSoldData, soldData, currentTab, onChangeCurrentTab } = props;

  return (
    <Container>
      {soldData.length === 0 ? (
        <Row className="row" align="center" justify="center">
          <Col>
            <EmptyState
              title="You have no orders awaiting shipment"
              buttonText="Toggle Empty State"
              onButtonClicked={toggleSoldData}
              Svg={Octopus}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <SegmentedControls
              options={['To Ship', 'In Transit', 'Delivered']}
              selectedOption={currentTab}
              onClickControl={(value) =>
                onChangeCurrentTab(value as TabOptions)
              }
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SoldView;
