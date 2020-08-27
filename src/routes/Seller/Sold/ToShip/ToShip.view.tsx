import React, { useState } from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import { InfoFilled, Plane, Truck } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import Pagination from 'components/module/Pagination';
import { SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import getCalendarDate from 'utils/Date/getCalendarDate';
import { useTheme } from 'utils/Theme';

import {
  TabOptions,
  SoldGeneratedProps,
  ToShipItemData,
  PendingToShipItemData,
} from '../Sold.props';
import {
  PriorityNumber,
  StyledInteraction,
  DeliveryRow,
  PendingRow,
} from './ToShip.styles';

export const SoldItem = (props: ToShipItemData) => {
  const { type = 'air', date, orders, id, orderRefNumber } = props;
  const desc =
    type.toLowerCase() === 'air'
      ? 'Air Freight Cut Off'
      : 'Road Freight Pick Up';
  const time =
    type.toLowerCase() === 'air' ? moment(date).format('hh:mm a') : '';

  const Icon = () =>
    type.toLowerCase().includes('air') ? (
      <Plane height={13} width={13} />
    ) : (
      <Truck height={13} width={13} />
    );
  return (
    <StyledInteraction
      type="accordion"
      value="Test"
      onClick={() => null}
      leftComponent={
        <PriorityNumber>
          <Typography color="noshade" variant="label">
            {orders.length}
          </Typography>
        </PriorityNumber>
      }
    >
      <div className="content">
        <Icon />
        <Typography variant="label" color="shade6" className="center-text">
          {desc}
        </Typography>
        <Typography variant="label" color="noshade">
          {time}
        </Typography>
      </div>
    </StyledInteraction>
  );
};

export const PendingItem = (props: PendingToShipItemData) => {
  const { id, orderNumber, numberOfOrders } = props;

  const history = useHistory();
  return (
    <StyledInteraction
      type="accordion"
      onClick={() =>
        history.push(SELLER_SOLD_ROUTES.CONFIRM_LIST.replace(':orderId', id))
      }
      leftComponent={
        <PriorityNumber>
          <Typography color="noshade" variant="label">
            {numberOfOrders}
          </Typography>
        </PriorityNumber>
      }
    >
      <div className="content">
        <Typography variant="label" color="shade6" className="center-text">
          {orderNumber}
        </Typography>
      </div>
    </StyledInteraction>
  );
};

const ToShip = (props: SoldGeneratedProps) => {
  const theme = useTheme();

  const { toShip, toShipCount, filters, updateFilters, pendingToShip } = props;
  const [pendingPage, setPendingPage] = useState(1);

  const toShipPagesTotal = Math.ceil(Number(toShipCount) / 10);

  return (
    <>
      <PendingRow>
        <Col md={12} className="title-col">
          <div className="svg-container">
            <InfoFilled fill={theme.brand.alert} height={18} width={18} />
          </div>
          <Typography color="alert">Pending Confirmation</Typography>
        </Col>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(e) => setPendingPage(e.realIndex + 1)}
          loop
        >
          {pendingToShip.map((item) => (
            <SwiperSlide key={item.id}>
              <PendingItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="pagination-container">
          <Pagination
            variant="infinite-dots"
            numPages={pendingToShip.length}
            currentValue={pendingPage}
            onClickButton={(nextValue) => setPendingPage(nextValue)}
          />
        </div>
      </PendingRow>
      {toShip.map((group) => {
        const calendarDateString = getCalendarDate(group.title);
        return (
          <DeliveryRow key={calendarDateString} className="delivery-row">
            <Col>
              <Typography color="noshade" className="title">
                {calendarDateString}
              </Typography>

              {group.data.map((item) => (
                <SoldItem key={item.id} {...item} />
              ))}
            </Col>
          </DeliveryRow>
        );
      })}
      <Row justify="center">
        <Pagination
          numPages={toShipPagesTotal}
          currentValue={Number(filters.toShipFilters.page)}
          onClickButton={(value) =>
            updateFilters.updateToShipFilters({
              page: value.toFixed(0),
            })
          }
          variant="number"
        />
      </Row>
    </>
  );
};

export default ToShip;
