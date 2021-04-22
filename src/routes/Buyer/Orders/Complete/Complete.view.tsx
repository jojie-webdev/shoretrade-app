import React, { useState } from 'react';

import { Oysters } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import OrderItemView from 'components/module/OrderItem';
import Pagination from 'components/module/Pagination';
import { BUYER_ROUTES, DEFAULT_PAGE_LIMIT } from 'consts';
import sort from 'ramda/src/sort';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router';
import { useTheme } from 'utils/Theme';

import { OrdersGeneratedProps } from '../Orders.props';
import {
  AccordionTitleContainer,
  StyledAccordion,
  OrderBadge,
} from '../Orders.style';
import { sortByDate } from '../Orders.transform';

const Complete = (props: OrdersGeneratedProps) => {
  const {
    completedOrders,
    completedOrdersCount,
    updateFilters,
    filters,
  } = props;
  const theme = useTheme();
  const history = useHistory();

  const completePagesTotal = Math.ceil(
    Number(completedOrdersCount) / DEFAULT_PAGE_LIMIT
  );

  return (
    <>
      {Object.keys(completedOrders).length === 0 ? (
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
        sort(sortByDate, Object.keys(completedOrders)).map((key) => (
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
                  Date Delivered:
                </Typography>
                <Typography color="shade9">{key}</Typography>
              </AccordionTitleContainer>
            }
            rightComponent={
              <OrderBadge>
                <Typography color="shade9" variant="overline">
                  {completedOrders[key].length}{' '}
                  {completedOrders[key].length > 1 ? 'Orders' : 'Order'}
                </Typography>
              </OrderBadge>
            }
          >
            {completedOrders[key].map((d) => (
              <OrderItemView {...d} token={props.token} key={d.id} />
            ))}
          </StyledAccordion>
        ))
      )}
      {completePagesTotal > 1 && (
        <Row justify="center">
          <Pagination
            numPages={completePagesTotal}
            currentValue={Number(filters.completedOrdersFilter.page)}
            onClickButton={(value) =>
              updateFilters.updateCompletedOrdersFilter({
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

export default Complete;
