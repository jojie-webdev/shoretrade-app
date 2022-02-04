import React from 'react';

import { Oysters } from 'components/base/SVG';
import EmptyState from 'components/module/EmptyState';
import { BUYER_ROUTES } from 'consts';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router';

import GroupedOrderItems from '../GroupedOrderItems/GroupedOrderItems.view';
import { OrdersGeneratedProps } from '../Orders.props';

const InTransit = (props: OrdersGeneratedProps) => {
  const history = useHistory();
  const {
    inTransitOrders,
    inTransitOrdersCount,
    filters,
    updateFilters,
  } = props;

  return (
    <>
      {Object.keys(inTransitOrders).length === 0 ? (
        <Row className="emptystate-row" align="center" justify="center">
          <Col>
            <EmptyState
              title={`You have no orders In Transit`}
              buttonText="START AN ORDER"
              onButtonClicked={() => history.push(BUYER_ROUTES.SEARCH)}
              Svg={Oysters}
            />
          </Col>
        </Row>
      ) : (
        <GroupedOrderItems
          groupedData={inTransitOrders}
          groupedCount={inTransitOrdersCount}
          token={props.token}
          filter={filters.inTransitOrdersFilter}
          updateFilter={updateFilters.updateInTransitOrdersFilter}
        />
      )}
    </>
  );
};

export default InTransit;
