import React, { useState } from 'react';

import { Oysters } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import { BUYER_ROUTES } from 'consts';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router';

import GroupedOrderItems, {
  OrderItemAccordion,
} from '../GroupedOrderItems/GroupedOrderItems.view';
import { OrdersGeneratedProps } from '../Orders.props';
import { TitleRow } from '../Orders.style';

const Pending = (props: OrdersGeneratedProps) => {
  const history = useHistory();
  const {
    pendingOrders,
    toShipOrders,
    selectionCount,
    filters,
    updateFilters,
  } = props;
  const [openInvoice, setOpenInvoice] = useState('');

  function handleToggleInvoice(invoiceNumber: string) {
    if (openInvoice === invoiceNumber) {
      setOpenInvoice('');
    } else {
      setOpenInvoice(invoiceNumber);
    }
  }

  const pendingOrdersTotal = pendingOrders.reduce((a, c) => {
    return a + c.orderCount;
  }, 0);

  return (
    <>
      {pendingOrdersTotal === 0 && selectionCount === 0 ? (
        <Row className="emptystate-row" align="center" justify="center">
          <Col>
            <EmptyState
              title={`You have no orders Pending`}
              buttonText="START AN ORDER"
              onButtonClicked={() => history.push(BUYER_ROUTES.SEARCH)}
              Svg={Oysters}
            />
          </Col>
        </Row>
      ) : (
        <>
          <TitleRow>
            <Col md={12} className="title-col">
              <Typography color="shade9" style={{ fontSize: '20px' }} altFont>
                Pending
              </Typography>
              <span className="notification">{pendingOrdersTotal}</span>
            </Col>
          </TitleRow>

          {pendingOrders.map((group) => (
            <OrderItemAccordion
              {...group}
              key={group.groupKey}
              token={props.token}
              handleToggleInvoice={handleToggleInvoice}
              openInvoice={openInvoice}
            />
          ))}

          <GroupedOrderItems
            groupedData={toShipOrders}
            groupedCount={selectionCount}
            token={props.token}
            filter={filters.toShipOrdersFilter}
            updateFilter={updateFilters.updateToShipOrdersFilter}
            handleToggleInvoice={handleToggleInvoice}
            openInvoice={openInvoice}
          />
        </>
      )}
    </>
  );
};

export default Pending;
