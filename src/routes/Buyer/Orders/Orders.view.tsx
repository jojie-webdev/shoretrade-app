import React from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import { Oysters } from 'components/base/SVG';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import { BUYER_ROUTES } from 'consts';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'routes/index.routes';
import { useTheme } from 'utils/Theme';

import Complete from './Complete/Complete.view';
import InTransit from './InTransit/InTransit.view';
import { OrdersGeneratedProps, TabOptions } from './Orders.props';
import { Container } from './Orders.style';
import Pending from './Pending/Pending.view';

const PENDING = 'Pending';
const IN_TRANSIT = 'In Transit';
const COMPLETE = 'Complete';

const OrdersView = (props: OrdersGeneratedProps) => {
  const history = useHistory();

  const {
    currentTab,
    loadingCurrentTab,
    onChangeCurrentTab,
    pendingOrders,
  } = props;

  let content;

  if (loadingCurrentTab) {
    content = <Loading />;
  } else if (pendingOrders.length === 0 && currentTab === PENDING) {
    content = (
      <Row className="emptystate-row" align="center" justify="center">
        <Col>
          <EmptyState
            title="You have no orders awaiting shipment"
            buttonText="START AN ORDER"
            onButtonClicked={() => history.push(BUYER_ROUTES.ROOT)} //create a route going to buyer/home?
            Svg={Oysters}
          />
        </Col>
      </Row>
    );
  } else if (currentTab == PENDING) {
    content = <Pending {...props} />;
    // content = 'Pending Tab';
  } else if (currentTab == IN_TRANSIT) {
    content = <InTransit {...props} />;
    // content = 'In Transit Tab';
  } else if (currentTab == COMPLETE) {
    content = <Complete {...props} />;
    // content = 'Complete Tab';
  }

  return (
    <Container>
      <Row className="controls-row">
        <Col>
          <SegmentedControls
            options={['Pending', 'In Transit', 'Complete']}
            selectedOption={currentTab}
            onClickControl={(value) => onChangeCurrentTab(value as TabOptions)}
          />
        </Col>
      </Row>
      {content}
    </Container>
  );
};

export default OrdersView;
