import React from 'react';

import { InfoFilled, Oysters } from 'components/base/SVG';
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
  StyledAccordion,
  OrderBadge,
  AccordionTitleContainer,
  TitleRow,
} from '../Orders.style';
import { sortByDate } from '../Orders.transform';

const Pending = (props: OrdersGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();
  const {
    pendingOrders,
    toShipOrders,
    toShipOrdersCount,
    filters,
    updateFilters,
  } = props;

  const toShipOrdersPagesTotal = Math.ceil(
    Number(toShipOrdersCount) / DEFAULT_PAGE_LIMIT
  );

  return (
    <>
      {Object.keys(pendingOrders).length === 0 &&
      Object.keys(toShipOrders).length === 0 ? (
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
              <Typography
                color="shade9"
                style={{ fontFamily: 'Media Sans', fontSize: '20px' }}
              >
                Pending
              </Typography>
              <span className="notification">
                {Object.keys(pendingOrders).length}
              </span>
            </Col>
          </TitleRow>

          {sort(sortByDate, Object.keys(pendingOrders)).map((key) => (
            <StyledAccordion
              key={key}
              title={''}
              headerBorder={`1px solid ${theme.grey.shade3}`}
              contentBorder={`1px solid ${theme.grey.shade3}`}
              padding="20px 24px"
              innerContentPadding="8px 24px"
              marginBottom="16px"
              keepIcon
              iconColor={theme.brand.primary}
              leftComponent={
                <AccordionTitleContainer>
                  <Typography color="shade6" className="label" weight="400">
                    Estimated{' '}
                    {pendingOrders[key][0].isAquafuture
                      ? 'Catchment'
                      : 'Delivery'}
                    :
                  </Typography>
                  <Typography color="shade9" className="labelBold">
                    {key}
                  </Typography>
                </AccordionTitleContainer>
              }
              rightComponent={
                <OrderBadge>
                  <Typography color="shade9" variant="overline">
                    {pendingOrders[key].length}{' '}
                    {pendingOrders[key].length > 1 ? 'Orders' : 'Order'}
                  </Typography>
                </OrderBadge>
              }
            >
              {pendingOrders[key].map((d) => (
                <OrderItemView {...d} token={props.token} key={d.id} />
              ))}
            </StyledAccordion>
          ))}

          <TitleRow style={{ marginTop: '24px' }}>
            <Col md={12} className="title-col">
              <Typography color="shade6" variant="overline">
                TO SHIP - {toShipOrdersCount}
              </Typography>
            </Col>
          </TitleRow>

          {sort(sortByDate, Object.keys(toShipOrders)).map((key) => (
            <StyledAccordion
              key={key}
              title={''}
              headerBorder={`1px solid ${theme.grey.shade3}`}
              contentBorder={`1px solid ${theme.grey.shade3}`}
              padding="20px 24px"
              innerContentPadding="8px 24px"
              marginBottom="16px"
              keepIcon
              iconColor={theme.brand.primary}
              leftComponent={
                <AccordionTitleContainer>
                  <Typography color="shade6" className="label" weight="400">
                    Estimated Delivery:
                  </Typography>
                  <Typography color="shade9" className="labelBold">
                    {key}
                  </Typography>
                </AccordionTitleContainer>
              }
              rightComponent={
                <OrderBadge>
                  <Typography color="shade9" variant="overline">
                    {toShipOrders[key].length}{' '}
                    {toShipOrders[key].length > 1 ? 'Orders' : 'Order'}
                  </Typography>
                </OrderBadge>
              }
            >
              {toShipOrders[key].map((d) => (
                <OrderItemView {...d} token={props.token} key={d.id} />
              ))}
            </StyledAccordion>
          ))}

          {toShipOrdersPagesTotal > 1 && (
            <Row justify="center">
              <Pagination
                numPages={toShipOrdersPagesTotal}
                currentValue={Number(filters.toShipOrdersFilter.page)}
                onClickButton={(value) =>
                  updateFilters.updateToShipOrdersFilter({
                    page: value.toFixed(0),
                  })
                }
                variant="number"
              />
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default Pending;
