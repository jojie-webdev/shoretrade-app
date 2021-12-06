import React, {
  useReducer,
  useState,
  Fragment,
  Dispatch,
  useEffect,
  useRef,
} from 'react';

import Button from 'components/base/Button';
import Divider from 'components/base/Divider';
import {
  InfoFilled,
  Message,
  CheckList,
  CheckFilled,
  Truck,
  Box,
  PaperPlane,
  Exclamation,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MessageModal from 'components/module/MessageModal';
import Pagination from 'components/module/Pagination';
import { DEFAULT_PAGE_LIMIT } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import sort from 'ramda/src/sort';
import { Row, Col } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import ConfirmModal from 'routes/Seller/Sold/Confirm';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { PlaceOrderMeta } from 'types/store/PlaceOrderState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import ShippingDateModal from '../ShippingDateModal';
import { PendingToShipItemData, SoldGeneratedProps } from '../Sold.props';
import { sortByDate } from '../Sold.tranform';
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

const generatePlaceOrderPayload = (config: {
  isPartial: boolean;
  order: GetSellerOrdersResponseItem;
}) => {
  const { order } = config;
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
    shippingDate: order?.shippingDate
      ? moment(order.shippingDate).toISOString()
      : '',
  };
};

export const PendingItem = (props: {
  data: PendingToShipItemData;
  updateConfirmModal: React.Dispatch<
    Partial<{
      isOpen: boolean;
      orderId: string;
      lineItemId: string;
    }>
  >;
  updateShippingDateModal: React.Dispatch<
    Partial<{
      isOpen: boolean;
      order: PlaceOrderMeta;
    }>
  >;
  isPlacingOrder: boolean;
  placeOrder: (data: PlaceOrderMeta) => void;
  placeOrderId: string;
  setPlaceOrderId: Dispatch<string>;
  isSendingMessage: boolean;
  updateMessageModal: any;
  messageModal: any;
}): any => {
  const theme = useTheme();
  const {
    data,
    updateConfirmModal,
    updateShippingDateModal,
    setPlaceOrderId,
    placeOrderId,
    placeOrder,
    isPlacingOrder,
    isSendingMessage,
    updateMessageModal,
    messageModal,
  } = props;
  const [isOpen, setIsOpen] = useState<string[]>([]);
  const nonDesktop = useMediaQuery({ query: BREAKPOINTS.nonDesktop });
  const isMobile = useMediaQuery({ query: BREAKPOINTS.sm });

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

    return (
      <Fragment key={order.orderId}>
        <InnerStyledInteraction
          pressed={isOpen.includes(order.orderId)}
          onClick={() => toggleAccordion(order.orderId)}
          type="accordion"
          iconColor={theme.brand.primary}
          fullWidth
          columnedRightContent
        >
          <div className="content">
            <div className="left-content">
              <Typography
                variant="label"
                color="noshade"
                className="center-text"
              >
                <span>Order</span>&nbsp;#{order.orderRefNumber}
              </Typography>

              <div className="order-count">
                <Typography variant="overlineSmall" color="noshade">
                  {order.itemCount}&nbsp;
                  {order.itemCount > 1 ? 'ITEMS' : 'ITEM'}
                </Typography>
              </div>
            </div>
            <Spacer />
            <div className="right-content">
              <ItemDetail variant="caption" color="shade6" row>
                Buyer <span>{order.buyerCompanyName}</span>
              </ItemDetail>

              <ItemDetail variant="caption" color="shade6" row>
                Type <span>Direct Sale</span>
                {/*Should check if aquafuture or auction*/}
              </ItemDetail>
            </div>
            <div className="buttons">
              <Button
                text={nonDesktop ? 'Message' : 'Message Buyer'}
                textColor={'primary'}
                textVariant="overline"
                iconPosition="before"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  updateMessageModal({
                    isOpen: true,
                    buyerId: order.buyerId,
                    buyerName: order.buyerCompanyName,
                  });
                  e.stopPropagation();
                }}
                loading={
                  messageModal.buyerId === order.buyerCompanyId &&
                  isSendingMessage
                }
              />
              {allowPartialShipment && !allowFullShipment ? (
                <Button
                  text={'Ship Partial'}
                  textVariant="overline"
                  style={{ width: nonDesktop ? undefined : 169, height: 32 }}
                  size="sm"
                  onClick={(e) => {
                    setPlaceOrderId(order.orderId);
                    updateShippingDateModal({
                      isOpen: true,
                      order: generatePlaceOrderPayload({
                        isPartial: !allowFullShipment,
                        order,
                      }),
                    });
                    e.stopPropagation();
                  }}
                  loading={isPlacingOrder && placeOrderId === order.orderId}
                />
              ) : (
                <Button
                  className="ship-order"
                  text={'Ship Order'}
                  textVariant="overline"
                  style={{ width: nonDesktop ? undefined : 169, height: 32 }}
                  disabled={!allowFullShipment}
                  size="sm"
                  onClick={(e) => {
                    setPlaceOrderId(order.orderId);
                    updateShippingDateModal({
                      isOpen: true,
                      order: generatePlaceOrderPayload({
                        isPartial: !allowFullShipment,
                        order,
                      }),
                    });
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
              style={{ background: theme.grey.shade9 }}
            >
              <ItemCard>
                <div>
                  <div className="left-content">
                    <ItemImage
                      src={parseImageUrl(lineItem.listing.images[0])}
                      alt=""
                    />

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
                        Size:{' '}
                        <span>
                          {sizeToString(
                            lineItem.listing.metricLabel,
                            lineItem.listing.sizeFrom || '',
                            lineItem.listing.sizeTo || ''
                          )}
                        </span>
                      </ItemDetail>
                    </div>
                  </div>
                  <Spacer />
                  <div
                    className="right-content"
                    style={{ flex: 1, width: 'auto' }}
                  >
                    <ItemDetail variant="caption" color="shade6">
                      Total Weight{' '}
                      <span>
                        {lineItemTotalWeight.toFixed(2)}{' '}
                        {formatMeasurementUnit(
                          lineItem.listing.measurementUnit
                        )}
                      </span>
                    </ItemDetail>

                    <ItemDetail variant="caption" color="shade6">
                      Price per kg <span>{toPrice(lineItem.price)}</span>
                    </ItemDetail>

                    <ItemDetail variant="caption" color="shade6">
                      Price (AUD)
                      <span>
                        {toPrice(lineItem.price * lineItemTotalWeight)}
                      </span>
                    </ItemDetail>
                  </div>
                </div>

                {!isMobile && <Divider backgroundColor={theme.grey.shade8} />}

                <div className="buttons" style={{ marginRight: 0 }}>
                  {lineItem.weightConfirmed ? (
                    <Button
                      text={'Weight Confirmed'}
                      textVariant="overline"
                      iconPosition="before"
                      textColor="success"
                      style={{
                        width: 169,
                        height: 32,
                        borderRadius: '8px',
                        border: `2px solid ${theme.brand.success}`,
                      }}
                      size="sm"
                      onClick={(e) => {
                        //DO NOTHING
                        e.stopPropagation();
                      }}
                      variant="outline"
                    />
                  ) : (
                    <Button
                      text={'Confirm Weight'}
                      textVariant="overline"
                      iconPosition="before"
                      style={{ width: 169, height: 32, borderRadius: '8px' }}
                      size="sm"
                      variant="outline"
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

  const [shippingDateModal, updateShippingDateModal] = useReducer(
    createUpdateReducer<{
      order: PlaceOrderMeta | null;
      isOpen: boolean;
    }>(),
    {
      order: null,
      isOpen: false,
    }
  );

  const [placeOrderId, setPlaceOrderId] = useState('');
  const [isOpen, setIsOpen] = useState<string[]>([]);
  const [lastOpenAccordion, setLastOpenAccordion] = useState('');

  const toShipPagesTotal = Math.ceil(Number(toShipCount) / DEFAULT_PAGE_LIMIT);
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
      updateShippingDateModal({ isOpen: false });
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

  const pendingToShipTotal = pendingToShip.reduce((a, c) => {
    return a + c.orderCount;
  }, 0);

  const toShipTotal = toShip.reduce((a, c) => {
    return a + c.orderTotal;
  }, 0);

  const getDeliveryIcon = (deliveryMethod: string) => {
    const iconProps = { width: 14, height: 14, fill: theme.grey.shade6 };
    switch (deliveryMethod) {
      case 'ROAD':
        return <Truck {...iconProps} />;
      case 'SELLER':
        return <Box {...iconProps} />;
      default:
        return <PaperPlane {...iconProps} />;
    }
  };

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
      <ShippingDateModal
        isOpen={shippingDateModal.isOpen}
        onConfirm={(shippingDate) => {
          if (shippingDateModal.order) {
            placeOrder({ ...shippingDateModal.order, shippingDate });
          }
        }}
        onClickClose={() => {
          updateShippingDateModal({ isOpen: false });
        }}
        loading={isPlacingOrder}
      />
      {filters.toShipFilters.page === '1' && (
        <>
          <TitleRow>
            <Col md={12} className="title-col">
              <Typography
                color="noshade"
                style={{ fontFamily: 'Media Sans', fontSize: '20px' }}
              >
                Pending
              </Typography>
              <span className="notification">{pendingToShipTotal}</span>
            </Col>
          </TitleRow>

          {pendingToShip.map((group) => {
            return (
              <ItemRow key={group.deliveryMethod} id={group.deliveryMethod}>
                <Col>
                  <StyledInteraction
                    pressed={isOpen.includes(group.deliveryMethod)}
                    onClick={() => toggleAccordion(group.deliveryMethod)}
                    type="accordion"
                    iconColor={theme.brand.primary}
                    fullWidth
                  >
                    <div className="content">
                      <div className="left-content left-content-extended">
                        <div className="label">
                          {getDeliveryIcon(group.deliveryMethod)}
                          <Typography
                            variant="label"
                            color="shade6"
                            className="center-text title-text"
                          >
                            {group.deliveryMethodLabel}
                          </Typography>
                        </div>

                        <div className="order-count">
                          <Typography variant="overlineSmall" color="noshade">
                            {group.orderCount}&nbsp;
                            {group.orderCount > 1 ? 'ORDERS' : 'ORDER'}
                          </Typography>
                        </div>
                      </div>
                      <Spacer />
                      <Spacer />
                      <Spacer />
                      <div className="right-content">
                        <ItemDetail variant="caption" color="shade6">
                          Sold Weight{' '}
                          <span style={{ color: theme.brand.alert }}>
                            <Exclamation width={16} height={16} />
                            &nbsp;
                            {/*group.totalWeight.toFixed(2)} kg*/}To be
                            confirmed
                          </span>
                        </ItemDetail>

                        <ItemDetail variant="caption" color="shade6">
                          Total Price (AUD){' '}
                          <span>{toPrice(group.totalPrice)}</span>
                        </ItemDetail>
                      </div>
                    </div>
                  </StyledInteraction>

                  <CollapsibleContent
                    isOpen={isOpen.includes(group.deliveryMethod)}
                    style={{
                      ...(addHorizontalRowMargin
                        ? { paddingLeft: 24, paddingRight: 24 }
                        : { paddingLeft: 8, paddingRight: 8 }),
                      marginBottom: isOpen.includes(group.deliveryMethod)
                        ? '8px'
                        : undefined,
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                      paddingBottom: isOpen.includes(group.deliveryMethod)
                        ? '8px'
                        : undefined,
                    }}
                  >
                    <PendingItem
                      data={group}
                      updateShippingDateModal={updateShippingDateModal}
                      updateConfirmModal={updateConfirmModal}
                      placeOrderId={placeOrderId}
                      setPlaceOrderId={setPlaceOrderId}
                      isPlacingOrder={isPlacingOrder}
                      placeOrder={placeOrder}
                      isSendingMessage={isSendingMessage}
                      updateMessageModal={updateMessageModal}
                      messageModal={messageModal}
                    />
                  </CollapsibleContent>
                </Col>
              </ItemRow>
            );
          })}
        </>
      )}

      {sort(sortByDate, toShip).map((group, idx) => {
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

          return targetDate.format('MMMM DD');
        };

        const calendarDateString = getDisplayDate();

        return (
          <ItemRow key={calendarDateString}>
            <Col>
              <TitleRow
                style={{
                  marginTop:
                    filters.toShipFilters.page !== '1' && idx === 0 ? 0 : 24,
                }}
              >
                <Col md={12} className="title-col">
                  <Typography
                    color="noshade"
                    style={{ fontFamily: 'Media Sans', fontSize: '20px' }}
                  >
                    {calendarDateString}
                  </Typography>
                  <span className="notification notif-reg">
                    {group.orderTotal}
                  </span>
                </Col>
              </TitleRow>

              <SoldItem
                data={group.data}
                rawData={group.rawData}
                token={token}
                status="PLACED"
                updateMessageModal={updateMessageModal}
                messageModal={messageModal}
                isSendingMessage={isSendingMessage}
                shipOrder={(
                  isPartial: boolean,
                  order?: GetSellerOrdersResponseItem
                ) => {
                  if (order) {
                    setPlaceOrderId(order.orderId);
                    updateShippingDateModal({
                      isOpen: true,
                      order: generatePlaceOrderPayload({
                        isPartial,
                        order,
                      }),
                    });
                  }
                }}
                isPlacingOrder={isPlacingOrder}
                placeOrderId={placeOrderId}
              />
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
