import React from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import { Octopus } from 'components/base/SVG';
import EmptyState from 'components/module/EmptyState';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import InTransit from './InTransit/InTransit';
import { SoldGeneratedProps, TabOptions } from './Sold.props';
import { Container } from './Sold.style';
import ToShip from './ToShip/ToShip.view';

const SoldView = (props: SoldGeneratedProps) => {
  const theme = useTheme();

  const { toggleSoldData, soldData, currentTab, onChangeCurrentTab } = props;

  let content;

  if (currentTab === 'To Ship') {
    content = <ToShip {...props} />;
  } else if (currentTab === 'In Transit') {
    content = <InTransit />;
  }

  return (
    <Container>
      <Row className="controls-row">
        <Col>
          <SegmentedControls
            options={['To Ship', 'In Transit', 'Delivered']}
            selectedOption={currentTab}
            onClickControl={(value) => onChangeCurrentTab(value as TabOptions)}
          />
        </Col>
      </Row>

      {soldData.length === 0 ? (
        <Row className="emptystate-row" align="center" justify="center">
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
        content
      )}
    </Container>
  );
};

export default SoldView;
