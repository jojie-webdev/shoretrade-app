import React from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import { Octopus } from 'components/base/SVG';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import Delivered from './Delivered/Delivered.view';
import InTransit from './InTransit/InTransit.view';
import { SoldGeneratedProps, TabOptions } from './Sold.props';
import { Container } from './Sold.style';
import ToShip from './ToShip/ToShip.view';

const SoldView = (props: SoldGeneratedProps) => {
  const theme = useTheme();

  const {
    currentTab,
    onChangeCurrentTab,
    loadingCurrentTab,
    toShipCount,
  } = props;

  let content;

  if (loadingCurrentTab) {
    content = <Loading label="Getting Sold Listings" />;
  } else if (Number(toShipCount) === 0 && currentTab === 'To Ship') {
    content = (
      <Row className="emptystate-row" align="center" justify="center">
        <Col>
          <EmptyState
            title="You have no orders awaiting shipment"
            buttonText="Toggle Empty State"
            onButtonClicked={() => null}
            Svg={Octopus}
          />
        </Col>
      </Row>
    );
  } else if (currentTab === 'To Ship') {
    content = <ToShip {...props} />;
  } else if (currentTab === 'In Transit') {
    content = <InTransit {...props} />;
  } else if (currentTab === 'Delivered') {
    content = <Delivered {...props} />;
  }

  return (
    <Container>
      <div className="controls-row">
        <SegmentedControls
          options={['To Ship', 'In Transit', 'Delivered']}
          selectedOption={currentTab}
          onClickControl={(value) => onChangeCurrentTab(value as TabOptions)}
        />
      </div>

      {content}
    </Container>
  );
};

export default SoldView;
