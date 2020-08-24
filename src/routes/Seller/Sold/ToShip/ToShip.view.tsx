import React, { useState } from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import {
  Octopus,
  ChevronRight,
  Scale,
  InfoFilled,
  Plane,
  Truck,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import Pagination from 'components/module/Pagination';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
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
  PendingItemContainer,
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
// TODO: Reuse this component as content of confirm weights screen
// export const PendingItem = () => (
//   <PendingItemContainer>
//     <div className="top-content">
//       <div className="left">
//         <img src="" alt="Pending Item" />
//         <div className="text-container">
//           <Typography color="noshade" weight="500">
//             King Salmon Manuka Cold Smoked Sliced
//           </Typography>
//           <div className="shipping">
//             <Typography
//               color="shade6"
//               variant="label"
//               className="shipping-text"
//             >
//               Shipping:
//             </Typography>
//             <Typography color="noshade" variant="label">
//               Wed 26 Apr
//             </Typography>
//           </div>
//         </div>
//       </div>
//       <div className="right">
//         <ChevronRight height={16} width={16} />
//       </div>
//     </div>

//     <hr className="divider" />

//     <div className="bottom">
//       <div className="text-container">
//         <Scale height={16} width={16} />
//         <Typography color="error" className="text" variant="caption">
//           Weight to be Confirmed
//         </Typography>
//       </div>
//       <Typography color="noshade" variant="label" weight="800">
//         $986.50
//       </Typography>
//     </div>
//   </PendingItemContainer>
// );

export const PendingItem = (props: PendingToShipItemData) => {
  const { id, orderNumber, numberOfOrders } = props;
  return (
    <StyledInteraction
      type="accordion"
      value="Test"
      onClick={() => null}
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
