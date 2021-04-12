import React from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import { Octopus, Crab, Fish } from 'components/base/SVG';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import { SELLER_ROUTES } from 'consts';
import { isEmpty } from 'ramda';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';

import Delivered from './Delivered/Delivered.view';
import InTransit from './InTransit/InTransit.view';
import { SoldGeneratedProps, TabOptions } from './Sold.props';
import { Container } from './Sold.style';
import ToShip from './ToShip/ToShip.view';

const TO_SHIP = 'To Ship';
const IN_TRANSIT = 'In Transit';
const DELIVERED = 'Delivered';

const EmptyView = (props: { currentTab: string }) => {
  const history = useHistory();
  const { currentTab } = props;

  const text = () => {
    if (currentTab === IN_TRANSIT) return 'transit';
    if (currentTab === DELIVERED) return 'delivery';

    return 'shipment';
  };

  const image = () => {
    if (currentTab === IN_TRANSIT) return Crab;
    if (currentTab === DELIVERED) return Fish;

    return Octopus;
  };

  return (
    <Row className="emptystate-row" align="center" justify="center">
      <Col>
        <EmptyState
          title={`You have no orders awaiting ${text()}`}
          Svg={image()}
          {...(currentTab === TO_SHIP
            ? {
                buttonText: 'Add a Product',
                onButtonClicked: () => history.push(SELLER_ROUTES.ADD_PRODUCT),
              }
            : {})}
        />
      </Col>
    </Row>
  );
};

const SoldView = (props: SoldGeneratedProps) => {
  const { currentTab, onChangeCurrentTab, loadingCurrentTab } = props;

  let content;

  if (loadingCurrentTab) {
    content = <Loading label="Getting Listings" />;
  } else if (
    (currentTab === TO_SHIP &&
      isEmpty(props.toShip) &&
      isEmpty(props.pendingToShip)) ||
    (currentTab === IN_TRANSIT && isEmpty(props.inTransit)) ||
    (currentTab === DELIVERED &&
      isEmpty(props.delivered) &&
      !props.filters.deliveredFilters.dateFrom)
  ) {
    content = <EmptyView currentTab={currentTab} />;
  } else if (currentTab === TO_SHIP) {
    content = <ToShip {...props} />;
  } else if (currentTab === IN_TRANSIT) {
    content = <InTransit {...props} />;
  } else if (currentTab === DELIVERED) {
    content = <Delivered {...props} />;
  }

  return (
    <Container>
      <div className="controls-row">
        <SegmentedControls
          options={[TO_SHIP, IN_TRANSIT, DELIVERED]}
          selectedOption={currentTab}
          onClickControl={(value) => onChangeCurrentTab(value as TabOptions)}
        />
      </div>

      {content}
    </Container>
  );
};

export default SoldView;
