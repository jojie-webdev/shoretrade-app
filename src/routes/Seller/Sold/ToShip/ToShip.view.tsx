import React, { useState } from 'react';

import { InfoFilled, Plane, Truck } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import SwiperContainer from 'components/layout/SwiperContainer';
import MultipleCarousel from 'components/module/MultipleCarousel';
import Pagination from 'components/module/Pagination';
import ToShipAccordionContent from 'components/module/ToShipAccordionContent';
import { API, SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import getCalendarDate from 'utils/Date/getCalendarDate';
import { useTheme } from 'utils/Theme';

import 'swiper/swiper-bundle.min.css';

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
  CollapsibleContent,
  PendingItemContainer,
  CarouselContainer,
} from './ToShip.styles';

export const SoldItem = (props: {
  data: { [p: string]: ToShipItemData[] };
  token: string;
}): any => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<string[]>([]);

  const setClosed = (title: string) => {
    const isExisting = isOpen.some((v) => v === title);

    if (!isExisting) {
      setIsOpen((prevState) => [...prevState, title]);
    } else {
      setIsOpen((prevState) => {
        return prevState.filter((v) => v !== title);
      });
    }
  };

  return Object.values(props.data).map((entry) => {
    const { type = 'air', toAddressState } = entry[0];

    const desc =
      type.toLowerCase() === 'air'
        ? 'Air Freight Cut Off'.toUpperCase()
        : 'Road Freight Pick Up'.toUpperCase();

    const Icon = () =>
      type.toLowerCase().includes('air') ? (
        <Plane height={13} width={13} />
      ) : (
        <Truck height={13} width={13} />
      );
    const toAddress = toAddressState ? `${toAddressState}` : '';

    return (
      <>
        <StyledInteraction
          pressed={isOpen.includes(toAddress)}
          onClick={() => setClosed(toAddress)}
          leftComponent={
            <PriorityNumber>
              <Typography color="noshade" variant="label">
                {entry.length}
              </Typography>
            </PriorityNumber>
          }
        >
          <div className="content">
            <Icon />
            <Typography variant="label" color="shade6" className="center-text">
              {desc} - {toAddress}
            </Typography>
          </div>
        </StyledInteraction>

        {entry.map((v) => (
          <CollapsibleContent key={v.id} isOpen={isOpen.includes(toAddress)}>
            <ToShipAccordionContent
              onDownloadInvoice={() => {
                window.open(
                  `${API.URL}/${API.VERSION}/order/invoice/${v.orderRefNumber}?token=${props.token}`,
                  '_blank'
                );
              }}
              items={v.orders}
              onPress={() =>
                history.push(
                  SELLER_SOLD_ROUTES.DETAILS.replace(':orderId', v.id).replace(
                    ':status',
                    'PLACED'
                  )
                )
              }
            />
          </CollapsibleContent>
        ))}
      </>
    );
  });
};

export const PendingItem = (props: PendingToShipItemData) => {
  const {
    id,
    orderNumber,
    numberOfOrders,
    buyerCompanyName,
    orderImage,
    total,
    type,
    toAddressState,
  } = props;

  const history = useHistory();
  return (
    <PendingItemContainer>
      <div className="content">
        {/* <img src={orderImage} /> */}

        <div className="details">
          <div>
            <Typography variant="label" color="shade6">
              Order:
            </Typography>
            <Typography variant="label" color="noshade" className="center-text">
              {orderNumber}
            </Typography>
          </div>

          <div>
            <Typography variant="label" color="shade6">
              Buyer:
            </Typography>
            <Typography variant="label" color="noshade" className="center-text">
              {buyerCompanyName}
            </Typography>
          </div>
          <div>
            <Typography variant="label" color="shade6">
              Items:
            </Typography>
            <Typography variant="label" color="noshade" className="center-text">
              {numberOfOrders} {numberOfOrders > 1 ? 'items' : 'item'}
            </Typography>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="bottom-content">
        <Typography variant="label" color="error">
          Weight to be Confirmed
        </Typography>

        <Typography variant="label" color="noshade">
          ${total}
        </Typography>
      </div>
    </PendingItemContainer>
  );
};

const breakPoints = {
  1340: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 2,
  },
};

const ToShip = (props: SoldGeneratedProps) => {
  const theme = useTheme();

  const {
    toShip,
    toShipCount,
    filters,
    updateFilters,
    pendingToShip,
    token,
  } = props;
  const [pendingPage, setPendingPage] = useState(1);
  const [isClosed, setIsClosed] = useState<string[]>([]);

  const toShipPagesTotal = Math.ceil(Number(toShipCount) / 10);

  const setClosedDeliveryRow = (title: string) => {
    const isExisting = isClosed.some((v) => v === title);

    if (!isExisting) {
      setIsClosed((prevState) => [...prevState, title]);
    } else {
      setIsClosed((prevState) => {
        return prevState.filter((v) => v !== title);
      });
    }
  };

  return (
    <>
      <PendingRow>
        <Col md={12} className="title-col">
          <div className="svg-container">
            <InfoFilled fill={theme.brand.alert} height={18} width={18} />
          </div>
          <Typography color="alert">
            Pending Confirmation - {pendingToShip.length}
          </Typography>
        </Col>

        <CarouselContainer>
          <MultipleCarousel<PendingToShipItemData, PendingToShipItemData>
            data={pendingToShip}
            transform={(data: PendingToShipItemData) => data}
            Component={PendingItem}
            link={SELLER_SOLD_ROUTES.CONFIRM_LIST}
            breakpoints={breakPoints}
            onSlideChange={(ndx) => setPendingPage(ndx + 1)}
          />
        </CarouselContainer>

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
        // const calendarDateString = getCalendarDate(group.title);
        const calendarDateString = moment(group.title)
          .format('Do MMM')
          .toUpperCase();

        return (
          <DeliveryRow key={calendarDateString} className="delivery-row">
            <Col>
              <div
                className="delivery-date"
                onClick={() => setClosedDeliveryRow(calendarDateString)}
              >
                <Typography color="noshade">{calendarDateString}</Typography>
              </div>

              <CollapsibleContent
                isOpen={!isClosed.includes(calendarDateString)}
              >
                <SoldItem data={group.data} token={token} />
              </CollapsibleContent>
            </Col>
          </DeliveryRow>
        );
      })}

      {toShipPagesTotal > 1 && (
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
      )}
    </>
  );
};

export default ToShip;
