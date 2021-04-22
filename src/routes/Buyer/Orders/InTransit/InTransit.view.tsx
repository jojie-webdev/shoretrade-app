import React, { useState } from 'react';

import { Oysters } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import OrderItemView from 'components/module/OrderItem';
import Pagination from 'components/module/Pagination';
import { BUYER_ROUTES, DEFAULT_PAGE_LIMIT } from 'consts';
import sort from 'ramda/src/sort';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router';
import { useTheme } from 'utils/Theme';

import { OrdersGeneratedProps } from '../Orders.props';
import {
  AccordionTitleContainer,
  StyledAccordion,
  OrderBadge,
} from '../Orders.style';
import { sortByDate } from '../Orders.transform';

const InTransit = (props: OrdersGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();
  const {
    inTransitOrders,
    inTransitOrdersCount,
    filters,
    updateFilters,
  } = props;

  const inTransitPagesTotal = Math.ceil(
    Number(inTransitOrdersCount) / DEFAULT_PAGE_LIMIT
  );

  return (
    <>
      {Object.keys(inTransitOrders).length === 0 ? (
        <Row className="emptystate-row" align="center" justify="center">
          <Col>
            <EmptyState
              title={`You have no orders Completed`}
              buttonText="START AN ORDER"
              onButtonClicked={() => history.push(BUYER_ROUTES.SEARCH)}
              Svg={Oysters}
            />
          </Col>
        </Row>
      ) : (
        sort(sortByDate, Object.keys(inTransitOrders)).map((key) => (
          <StyledAccordion
            key={key}
            title={''}
            padding="24px"
            marginBottom="16px"
            keepIcon
            iconColor={theme.brand.primary}
            leftComponent={
              <AccordionTitleContainer>
                <Typography color="shade7" className="title">
                  Estimated Delivery:
                </Typography>
                <Typography color="shade9">{key}</Typography>
              </AccordionTitleContainer>
            }
            rightComponent={
              <OrderBadge>
                <Typography color="shade9" variant="overline">
                  {inTransitOrders[key].length}{' '}
                  {inTransitOrders[key].length > 1 ? 'Orders' : 'Order'}
                </Typography>
              </OrderBadge>
            }
          >
            {inTransitOrders[key].map((d) => (
              <OrderItemView {...d} token={props.token} key={d.id} />
            ))}
          </StyledAccordion>
        ))
      )}
      {inTransitPagesTotal > 1 && (
        <Row justify="center">
          <Pagination
            numPages={inTransitPagesTotal}
            currentValue={Number(filters.inTransitOrdersFilter.page)}
            onClickButton={(value) =>
              updateFilters.updateInTransitOrdersFilter({
                page: value.toFixed(0),
              })
            }
            variant="number"
          />
        </Row>
      )}
    </>
  );
};

export default InTransit;
