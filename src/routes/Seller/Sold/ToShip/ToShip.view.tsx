import React, {
  useReducer,
  useState,
  Fragment,
  Dispatch,
  useEffect,
  useRef,
} from 'react';

import Button from 'components/base/Button';
import {
  InfoFilled,
  Plane,
  Truck,
  Message,
  CheckList,
  CheckFilled,
  DownloadFile,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import SwiperContainer from 'components/layout/SwiperContainer';
import MessageModal from 'components/module/MessageModal';
import MultipleCarousel from 'components/module/MultipleCarousel';
import Pagination from 'components/module/Pagination';
import ToShipAccordionContent from 'components/module/ToShipAccordionContent';
import { API, SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import ConfirmModal from 'routes/Seller/Sold/Confirm';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PlaceOrderMeta } from 'types/store/PlaceOrderState';
import { Store } from 'types/store/Store';
import getCalendarDate from 'utils/Date/getCalendarDate';
import { createUpdateReducer } from 'utils/Hooks';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { PendingToShipItemData, SoldGeneratedProps } from '../Sold.props';
import SoldItem from '../SoldItem.view';
import {
  StyledInteraction,
  InnerStyledInteraction,
  ItemRow,
  TitleRow,
  CollapsibleContent,
  ItemCard,
  ItemImage,
  ItemDetail,
  Tag,
  Spacer,
} from './ToShip.styles';

export const PendingItem = (props: {
  data: PendingToShipItemData;
  updateConfirmModal: React.Dispatch<
    Partial<{
      isOpen: boolean;
      orderId: string;
      lineItemId: string;
    }>
  >;
  isPlacingOrder: boolean;
  placeOrder: (data: PlaceOrderMeta) => void;
  placeOrderId: string;
  setPlaceOrderId: Dispatch<string>;
}): any => {
  const theme = useTheme();
  const {
    data,
    updateConfirmModal,
    setPlaceOrderId,
    placeOrderId,
    placeOrder,
    isPlacingOrder,
  } = props;
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
    const allowPartialShipment = order.orderLineItem.some(
      (i) => i.weightConfirmed
    );
    const allowFullShipment = order.orderLineItem.every(
      (i) => i.weightConfirmed
    );

    const generatePlaceOrderPayload = (config: { isPartial: boolean }) => {
      setPlaceOrderId(order.orderId);
      return {
        orderId: order?.orderId || '',
        buyerCompanyId: order?.buyerCompanyId || '',
        sellerCompanyId: order?.sellerCompanyId || '',
        buyerId: order?.buyerId || '',
        sellerId: order?.sellerId || '',
        deliveryMethod: order?.deliveryMethod || '',
        deliveryOption: order?.deliveryOption || '',
        fromAddressId: order?.fromAddress.id || '',
        toAddressId: order?.toAddress.id || '',
        isPartial: config.isPartial,
        orderLineItem: order?.orderLineItem
          ? order?.orderLineItem.map((lineItem) => ({
              id: lineItem.id,
              weight: lineItem.weight,
              price: lineItem.price,
              weightConfirmed: lineItem.weightConfirmed,
              priceDelta: lineItem.priceDelta,
              listingBoxes: lineItem.listingBoxes,
              listing: lineItem.listing,
            }))
          : [],
      };
    };

    return (
      <Fragment key={order.orderId}>
        <InnerStyledInteraction
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
                <Typography variant="label" color="noshade">
                  {order.itemCount}&nbsp;
                  {order.itemCount > 1 ? 'ITEMS' : 'ITEM'}
                </Typography>
              </div>
            </div>
            <Spacer />
            <div className="right-content">
              {!isOpen.includes(order.orderId) && (
                <>
                  <ItemDetail variant="caption" color="shade6">
                    Sold Weight <span>{order.totalWeight.toFixed(2)} kg</span>
                  </ItemDetail>

                  <ItemDetail variant="caption" color="shade6">
                    Price (AUD) <span>{toPrice(order.totalPrice)}</span>
                  </ItemDetail>
                </>
              )}
            </div>
            <div className="buttons">
              {allowPartialShipment && !allowFullShipment && (
                <Button
                  text={'Ship Partial'}
                  style={{ width: 169, height: 32 }}
                  size="sm"
                  onClick={(e) => {
                    placeOrder(
                      generatePlaceOrderPayload({
                        isPartial: !allowFullShipment,
                      })
                    );
                    e.stopPropagation();
                  }}
                  loading={isPlacingOrder && placeOrderId === order.orderId}
                />
              )}

              {allowPartialShipment && allowFullShipment && (
                <Button
                  text={'Ship Order'}
                  style={{ width: 169, height: 32 }}
                  size="sm"
                  onClick={(e) => {
                    placeOrder(
                      generatePlaceOrderPayload({
                        isPartial: !allowFullShipment,
                      })
                    );
                    e.stopPropagation();
                  }}
                  loading={isPlacingOrder && placeOrderId === order.orderId}
                />
              )}
            </div>
          </div>
        </InnerStyledInteraction>
        {order.orderLineItem.map((lineItem) => {
          const lineItemTotalWeight = lineItem.listingBoxes.reduce(
            (accum: number, current) => {
              return accum + current.weight * current.quantity;
            },
            0
          );
          return (
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

                    <ItemDetail variant="caption" color="shade5" row>
                      {sizeToString(
                        lineItem.listing.metricLabel,
                        lineItem.listing.sizeFrom || undefined,
                        lineItem.listing.sizeTo || undefined
                      )}
                    </ItemDetail>
                  </div>
                </div>
                <Spacer />
                <div className="right-content">
                  <ItemDetail variant="caption" color="shade6">
                    Sold Weight{' '}
                    <span>
                      {lineItemTotalWeight.toFixed(2)}{' '}
                      {lineItem.listing.measurementUnit}
                    </span>
                  </ItemDetail>

                  <ItemDetail variant="caption" color="shade6">
                    Price (AUD) <span>{toPrice(lineItem.price)}</span>
                  </ItemDetail>
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
                        //DO NOTHING
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
                          updateConfirmModal({
                            isOpen: true,
                            lineItemId: lineItem.id,
                            orderId: order.orderId,
                          });
                        }
                        e.stopPropagation();
                      }}
                    />
                  )}
                </div>
              </ItemCard>
            </CollapsibleContent>
          );
        })}
      </Fragment>
    );
  });
};

const ToShip = (props: SoldGeneratedProps) => {
  const theme = useTheme();

  const returningRef = useRef();

  const {
    toShip,
    toShipCount,
    filters,
    updateFilters,
    pendingToShip,
    token,
    sendMessage,
    isSendingMessage,
    isPlacingOrder,
    placeOrder,
  } = props;

  const [didPressConfirmWeight, setDidPressConfirmWeight] = useState(false);

  const confirmWeightPending = useSelector(
    (state: Store) => state.confirmWeight.pending
  );

  const [confirmModal, updateConfirmModal] = useReducer(
    createUpdateReducer<{
      isOpen: boolean;
      orderId: string;
      lineItemId: string;
    }>(),
    {
      isOpen: false,
      orderId: '',
      lineItemId: '',
    }
  );

  const [messageModal, updateMessageModal] = useReducer(
    createUpdateReducer<{
      buyerId: string;
      buyerName: string;
      isOpen: boolean;
    }>(),
    {
      buyerId: '',
      buyerName: '',
      isOpen: false,
    }
  );

  const [placeOrderId, setPlaceOrderId] = useState('');
  const [isOpen, setIsOpen] = useState<string[]>([]);
  const [lastOpenAccordion, setLastOpenAccordion] = useState('');

  const toShipPagesTotal = Math.ceil(Number(toShipCount) / 10);
  const addHorizontalRowMargin = useMediaQuery({
    query: '(min-width: 1080px)',
  });

  const toggleAccordion = (title: string) => {
    const isExisting = isOpen.some((v) => v === title);
    setLastOpenAccordion(title);

    if (!isExisting) {
      setIsOpen((prevState) => [...prevState, title]);
    } else {
      setIsOpen((prevState) => {
        return prevState.filter((v) => v !== title);
      });
    }
  };

  useEffect(() => {
    if (!isPlacingOrder && placeOrderId.length > 0) {
      setPlaceOrderId('');
    }

    if (lastOpenAccordion && !isPlacingOrder) {
      setTimeout(() => {
        document
          .getElementById(lastOpenAccordion)
          ?.scrollIntoView({ behavior: 'smooth' });

        setLastOpenAccordion('');
      }, 1000);
    }
  }, [isPlacingOrder]);

  useEffect(() => {
    // After pressing submit and response is finished, close modal
    if (!confirmWeightPending && didPressConfirmWeight) {
      updateConfirmModal({
        isOpen: false,
      });
      setDidPressConfirmWeight(false);
    }
  }, [confirmWeightPending]);

  console.log(lastOpenAccordion);

  return (
    <>
      <ConfirmModal
        onClickClose={() => {
          updateConfirmModal({
            isOpen: false,
          });
        }}
        onClickConfirm={() => setDidPressConfirmWeight(true)}
        {...confirmModal}
      />
      <MessageModal
        isOpen={isSendingMessage || messageModal.isOpen}
        recipient={messageModal.buyerName}
        onSend={(message) => {
          sendMessage(messageModal.buyerId, message);
          updateMessageModal({ isOpen: false });
        }}
        onClickClose={() => {
          updateMessageModal({ isOpen: false });
        }}
        loading={isSendingMessage}
      />
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
          <ItemRow key={group.buyerCompanyId} id={group.buyerCompanyId}>
            <Col>
              <StyledInteraction
                pressed={isOpen.includes(group.buyerCompanyId)}
                onClick={() => toggleAccordion(group.buyerCompanyId)}
                type="accordion"
                iconColor={theme.brand.primary}
                fullWidth
              >
                <div className="content">
                  <div className="left-content left-content-extended">
                    <Typography
                      variant="label"
                      color="noshade"
                      className="center-text title-text"
                    >
                      {group.buyerCompanyName}
                    </Typography>

                    <div className="order-count">
                      <Typography variant="label" color="noshade">
                        {group.orderCount}&nbsp;
                        {group.orderCount > 1 ? 'ORDERS' : 'ORDER'}
                      </Typography>
                    </div>
                  </div>
                  <Spacer />
                  <div className="right-content">
                    <ItemDetail variant="caption" color="shade6">
                      Sold Weight <span>{group.totalWeight.toFixed(2)} kg</span>
                    </ItemDetail>

                    <ItemDetail variant="caption" color="shade6">
                      Price (AUD) <span>{toPrice(group.totalPrice)}</span>
                    </ItemDetail>
                  </div>
                  <div className="buttons">
                    <Button
                      text={'Message Buyer'}
                      icon={
                        messageModal.buyerId === group.buyerCompanyId &&
                        isSendingMessage ? undefined : (
                          <Message
                            fill={theme.grey.shade9}
                            height={16}
                            width={16}
                          />
                        )
                      }
                      textColor={'shade9'}
                      iconPosition="before"
                      style={{
                        width: 169,
                        height: 32,
                        backgroundColor: theme.grey.noshade,
                      }}
                      size="sm"
                      onClick={(e) => {
                        updateMessageModal({
                          isOpen: true,
                          buyerId: group.buyerCompanyId,
                          buyerName: group.buyerCompanyName,
                        });
                        e.stopPropagation();
                      }}
                      loading={
                        messageModal.buyerId === group.buyerCompanyId &&
                        isSendingMessage
                      }
                    />
                  </div>
                </div>
              </StyledInteraction>

              <CollapsibleContent
                isOpen={isOpen.includes(group.buyerCompanyId)}
                style={
                  addHorizontalRowMargin
                    ? { marginLeft: 24, marginRight: 24 }
                    : { marginLeft: 8, marginRight: 8 }
                }
              >
                <PendingItem
                  data={group}
                  updateConfirmModal={updateConfirmModal}
                  placeOrderId={placeOrderId}
                  setPlaceOrderId={setPlaceOrderId}
                  isPlacingOrder={isPlacingOrder}
                  placeOrder={placeOrder}
                />
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
          const dateDiff = Math.floor(
            currentDate.diff(targetDate, 'days', true)
          );
          // 1 -> 1.99
          if (dateDiff === 1) {
            return 'Yesterday';
            // 0 -> 0.99
          } else if (dateDiff === 0) {
            return 'Today';
            // -1 -> -0
          } else if (dateDiff === -1) {
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
                <div className="content">
                  <div className="left-content left-content-extended">
                    <Typography
                      variant="label"
                      color="noshade"
                      className="center-text title-text"
                    >
                      {calendarDateString}
                    </Typography>

                    <div className="order-count">
                      <Typography variant="label" color="noshade">
                        {group.orderTotal}&nbsp;
                        {group.orderTotal > 1 ? 'ORDERS' : 'ORDER'}
                      </Typography>
                    </div>
                  </div>
                  <Spacer />
                  <div className="right-content" />
                  <div className="buttons" />
                </div>
              </StyledInteraction>

              <CollapsibleContent
                isOpen={isOpen.includes(calendarDateString)}
                style={{
                  marginLeft: 24,
                  marginRight: 24,
                  overflow: 'visible',
                }}
              >
                <SoldItem data={group.data} token={token} status="PLACED" />
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
