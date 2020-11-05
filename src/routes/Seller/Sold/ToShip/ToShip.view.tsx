import React, { useState } from 'react';

import Button from 'components/base/Button';
import {
  InfoFilled,
  Plane,
  Truck,
  Message,
  CheckList,
  CheckFilled,
} from 'components/base/SVG';
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
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';
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
  ItemRow,
  TitleRow,
  CollapsibleContent,
  ItemCard,
  ItemImage,
  ItemDetail,
  Tag,
  Spacer,
} from './ToShip.styles';

export const PendingItem = (props: { data: PendingToShipItemData }): any => {
  const theme = useTheme();
  const { data } = props;
  const [isOpen, setIsOpen] = useState<string[]>([]);

  const toggleAccordion = (title: string) => {
    const isExisting = isOpen.some((v) => v === title);

    if (!isExisting) {
      setIsOpen((prevState) => [...prevState, title]);
    } else {
      setIsOpen((prevState) => {
        return prevState.filter((v) => v !== title);
      });
    }
  };

  return data.orders.map((order) => {
    return (
      <>
        <StyledInteraction
          key={order.orderId}
          pressed={isOpen.includes(order.orderId)}
          onClick={() => toggleAccordion(order.orderId)}
          type="accordion"
          iconColor={theme.brand.primary}
          fullWidth
        >
          <div className="content">
            <div className="left-content">
              <Typography
                variant="label"
                color="noshade"
                className="center-text"
              >
                Order&nbsp;{order.orderRefNumber}
              </Typography>

              <div className="order-count">
                <Typography
                  variant="label"
                  color="noshade"
                  className="center-text"
                >
                  {order.itemCount}&nbsp;
                  {order.itemCount > 1 ? 'Items' : 'Item'}
                </Typography>
              </div>
            </div>
            <Spacer />
            <div className="right-content">
              <ItemDetail variant="caption" color="shade6">
                Sold Weight <span>0</span>
              </ItemDetail>

              <ItemDetail variant="caption" color="shade6">
                Price (AUD) <span>0</span>
              </ItemDetail>
            </div>
            <div className="buttons">
              <Button
                text={'Ship Partial'}
                style={{ width: 169, height: 32 }}
                size="sm"
                onClick={(e) => {
                  // Do Shipping
                  console.log('DO SHIPPING');
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
        </StyledInteraction>
        {order.orderLineItem.map((lineItem) => (
          <CollapsibleContent
            key={lineItem.id}
            isOpen={isOpen.includes(order.orderId)}
          >
            <ItemCard>
              <div className="left-content">
                <ItemImage src={lineItem.listing.images[0]} alt="" />

                <div className="text-content">
                  <Typography
                    variant="label"
                    color="noshade"
                    className="item-title"
                  >
                    {lineItem.listing.typeName}
                  </Typography>

                  <div className="tags-container">
                    {lineItem.listing.specifications.map((tag) => (
                      <Tag key={tag}>
                        <Typography variant="caption" color="noshade">
                          {tag}
                        </Typography>
                      </Tag>
                    ))}
                  </div>

                  <ItemDetail variant="caption" color="shade6" row>
                    Size:{' '}
                    <span>
                      {sizeToString(
                        lineItem.listing.metricLabel,
                        lineItem.listing.sizeFrom || undefined,
                        lineItem.listing.sizeTo || undefined
                      )}
                    </span>
                  </ItemDetail>
                </div>
              </div>
              <Spacer />
              <div className="right-content">
                <div className="item-data">
                  <ItemDetail variant="caption" color="shade6">
                    Sold Weight{' '}
                    <span>
                      {lineItem.weight} {lineItem.listing.measurementUnit}
                    </span>
                  </ItemDetail>

                  <ItemDetail variant="caption" color="shade6">
                    Price (AUD) <span>{toPrice(lineItem.price)}</span>
                  </ItemDetail>
                </div>
              </div>

              <div className="buttons">
                {lineItem.weightConfirmed ? (
                  <Button
                    text={'Weight Confirmed'}
                    icon={<CheckFilled fill="white" height={16} width={16} />}
                    iconPosition="before"
                    style={{ width: 169, height: 32 }}
                    size="sm"
                    onClick={(e) => {
                      console.log('DO NOTHING');
                      e.stopPropagation();
                    }}
                    variant="success"
                  />
                ) : (
                  <Button
                    text={'Confirm Weight'}
                    icon={<CheckList fill="white" height={15} width={20} />}
                    iconPosition="before"
                    style={{ width: 169, height: 32 }}
                    size="sm"
                    onClick={(e) => {
                      if (!lineItem.weightConfirmed) {
                        // Show confirm weight
                        console.log('SHOW CONFIRM WEIGHT');
                      }
                      e.stopPropagation();
                    }}
                  />
                )}
              </div>
            </ItemCard>
          </CollapsibleContent>
        ))}
      </>
    );
  });
};

export const SoldItem = (props: {
  data: { [p: string]: ToShipItemData[] };
  token: string;
}): any => {
  const history = useHistory();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<string[]>([]);

  const toggleAccordion = (title: string) => {
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
          onClick={() => toggleAccordion(toAddress)}
          type="accordion"
          iconColor={theme.brand.primary}
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
          <CollapsibleContent
            key={v.id}
            isOpen={isOpen.includes(toAddress)}
            style={{ margin: '0px 16px' }}
          >
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
  const [isOpen, setIsOpen] = useState<string[]>([]);

  const toShipPagesTotal = Math.ceil(Number(toShipCount) / 10);
  const addHorizontalRowMargin = useMediaQuery({
    query: '(min-width: 1080px)',
  });

  const toggleAccordion = (title: string) => {
    const isExisting = isOpen.some((v) => v === title);

    if (!isExisting) {
      setIsOpen((prevState) => [...prevState, title]);
    } else {
      setIsOpen((prevState) => {
        return prevState.filter((v) => v !== title);
      });
    }
  };

  return (
    <>
      <TitleRow>
        <Col md={12} className="title-col">
          <div className="svg-container">
            <InfoFilled fill={theme.brand.alert} height={18} width={18} />
          </div>
          <Typography color="alert">
            Pending Confirmation - {pendingToShip.length}
          </Typography>
        </Col>
      </TitleRow>

      {pendingToShip.map((group) => {
        return (
          <ItemRow key={group.buyerCompanyId}>
            <Col>
              <StyledInteraction
                pressed={isOpen.includes(group.buyerCompanyId)}
                onClick={() => toggleAccordion(group.buyerCompanyId)}
                type="accordion"
                iconColor={theme.brand.primary}
              >
                <Typography color="noshade">
                  {group.buyerCompanyName}
                </Typography>
              </StyledInteraction>

              <CollapsibleContent
                isOpen={isOpen.includes(group.buyerCompanyId)}
                style={
                  addHorizontalRowMargin
                    ? { marginLeft: 24, marginRight: 24 }
                    : { marginLeft: 8, marginRight: 8 }
                }
              >
                <PendingItem data={group} />
              </CollapsibleContent>
            </Col>
          </ItemRow>
        );
      })}

      <TitleRow style={{ marginTop: 24 }}>
        <Col md={12} className="title-col">
          <Typography variant="overline" color="shade6">
            TO SHIP
          </Typography>
        </Col>
      </TitleRow>

      {toShip.map((group) => {
        const getDisplayDate = () => {
          const targetDate = moment(group.title);
          const currentDate = moment();
          const dateDiff = targetDate.diff(currentDate, 'days');

          if (dateDiff === -1) {
            return 'Yesterday';
          } else if (dateDiff === 0) {
            return 'Today';
          } else if (dateDiff === 1) {
            return 'Tomorrow';
          }

          return targetDate.format('Do MMMM');
        };

        const calendarDateString = getDisplayDate();

        return (
          <ItemRow key={calendarDateString}>
            <Col>
              <StyledInteraction
                pressed={isOpen.includes(calendarDateString)}
                onClick={() => toggleAccordion(calendarDateString)}
                type="accordion"
                iconColor={theme.brand.primary}
              >
                <Typography color="noshade">{calendarDateString}</Typography>
              </StyledInteraction>

              <CollapsibleContent
                isOpen={isOpen.includes(calendarDateString)}
                style={{ marginLeft: 24, marginRight: 24 }}
              >
                <SoldItem data={group.data} token={token} />
              </CollapsibleContent>
            </Col>
          </ItemRow>
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
