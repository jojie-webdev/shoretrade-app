import React, {
  useReducer,
  useState,
  Fragment,
  Dispatch,
  useEffect,
} from 'react';

import Button from 'components/base/Button';
import Divider from 'components/base/Divider';
import { Truck, Box, PaperPlane } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MessageModal from 'components/module/MessageModal';
import Pagination from 'components/module/Pagination';
import { DEFAULT_PAGE_LIMIT } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import ReactTooltip from 'react-tooltip';
import ConfirmModal from 'routes/Seller/Sold/Confirm';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { PlaceOrderMeta } from 'types/store/PlaceOrderState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { sizeToString } from 'utils/Listing';
import {
  formatMeasurementUnit,
  formatUnitToPricePerUnit,
} from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import { parsePrice } from 'utils/parsePrice';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import ShippingDateModal from '../ShippingDateModal';
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
    dropOffDate: order?.dropOffDate
      ? moment(order.dropOffDate).toISOString()
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
      status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED';
    }>
  >;
  updateShippingDateModal: React.Dispatch<
    Partial<{
      isOpen: boolean;
      order: PlaceOrderMeta;
      group: string;
      dropOff: string;
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

    let totalPrice = toPrice(order.totalPrice);

    if (order.transactionValueFeePercentage) {
      totalPrice = toPrice(
        order.orderLineItem.reduce((accum: number, current: any) => {
          const price = parsePrice(current.price);

          return accum + (price || 0);
        }, 0)
      );
    }

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
                <span>Order</span>&nbsp;#{order.orderRefNumber}
              </Typography>
            </div>
            <Spacer />
            <div className="right-content">
              <div className="order-count">
                <Typography variant="overlineSmall" color="noshade">
                  {order.itemCount}&nbsp;
                  {order.itemCount === 1 ? 'ITEM' : 'ITEMS'}
                </Typography>
              </div>
              <div className="order-details">
                <ItemDetail variant="caption" color="shade6">
                  Price (AUD)s
                  <span style={{ fontSize: '14px' }}>{totalPrice}</span>
                </ItemDetail>
                <div className="buyer-type">
                  <ItemDetail variant="caption" color="shade6" row>
                    Buyer <span>{order.buyerCompanyName}</span>
                  </ItemDetail>

                  <ItemDetail variant="caption" color="shade6" row>
                    Type <span>{order.salesChannel}</span>
                  </ItemDetail>
                </div>
              </div>
            </div>
            <Spacer />
            <div className="buttons">
              <Button
                text={nonDesktop ? 'Message' : 'Message Buyer'}
                textColor={'primary'}
                iconPosition="before"
                variant="outline"
                textVariant="caption"
                size="sm"
                onClick={(e) => {
                  updateMessageModal({
                    isOpen: true,
                    buyerId: order.buyerId,
                    buyerName: order.buyerCompanyName,
                    orderRefNumber: order.orderRefNumber.toString()
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
                  textVariant="caption"
                  style={{ height: 32 }}
                  size="sm"
                  onClick={(e) => {
                    setPlaceOrderId(order.orderId);
                    updateShippingDateModal({
                      isOpen: true,
                      order: generatePlaceOrderPayload({
                        isPartial: !allowFullShipment,
                        order,
                      }),
                      group: data.groupName || '',
                      dropOff: data.dropOff || '',
                    });
                    e.stopPropagation();
                  }}
                  loading={isPlacingOrder && placeOrderId === order.orderId}
                />
              ) : (
                <div>
                  <ReactTooltip
                    id="disabledToShipBtn"
                    place="left"
                    effect="solid"
                    backgroundColor={theme.grey.shade8}
                  >
                    <div
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      Please confirm the weight before
                      <br /> shipping the order
                    </div>
                  </ReactTooltip>

                  <div
                    data-tip
                    data-for={!allowFullShipment ? 'disabledToShipBtn' : ''}
                    data-delay-show="100"
                    style={{ marginLeft: '8px' }}
                  >
                    <Button
                      className="ship-order"
                      text={'Ship Order'}
                      textVariant="caption"
                      style={{ height: 32 }}
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
                          group: data.groupName || '',
                          dropOff: data.dropOff || '',
                        });
                        e.stopPropagation();
                      }}
                      loading={isPlacingOrder && placeOrderId === order.orderId}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </InnerStyledInteraction>
        {order.orderLineItem.map((lineItem, index) => {
          const additionalInfos = [];
          if (lineItem.listing.isIkeJime)
            additionalInfos[additionalInfos.length] = 'Ike Jime';

          if (lineItem.listing.isIceSlurry)
            additionalInfos[additionalInfos.length] = 'Ice Slurry';

          if (lineItem.listing.quality)
            additionalInfos[additionalInfos.length] = lineItem.listing.quality;

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
                        {additionalInfos.map((info) => (
                          <Tag key={info} background={theme.brand.info}>
                            <Typography variant="overlineSmall" color="noshade">
                              {info}
                            </Typography>
                          </Tag>
                        ))}
                        {lineItem.listing.specifications.map((info) => (
                          <Tag key={info}>
                            <Typography variant="overlineSmall" color="noshade">
                              {info}
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
                  <div
                    className="right-content"
                    style={{ flex: 1, width: 'auto' }}
                  >
                    <ItemDetail variant="caption" color="shade6">
                      Total Weight{' '}
                      <span>
                        {lineItem.weight.toFixed(2)}{' '}
                        {formatMeasurementUnit(
                          lineItem.listing.measurementUnit
                        )}
                      </span>
                    </ItemDetail>

                    <ItemDetail variant="caption" color="shade6">
                      Price per{' '}
                      {formatUnitToPricePerUnit(
                        lineItem.listing.measurementUnit
                      )}{' '}
                      <span>{toPrice(lineItem.listing.pricePerKilo)}</span>
                    </ItemDetail>

                    <ItemDetail variant="caption" color="shade6">
                      Price (AUD)
                      <span style={{ fontSize: '14px' }}>
                        {toPrice(lineItem.price)}
                      </span>
                    </ItemDetail>
                  </div>
                </div>

                {!isMobile && (
                  <Divider backgroundColor={theme.grey.shade8} spacing={12} />
                )}

                <div className="buttons" style={{ marginRight: 0 }}>
                  <div>
                    {order.formattedAddress &&
                      index === order.orderLineItem.length - 1 && (
                        <>
                          <Typography color="noshade" variant="label">
                            Delivery Address
                          </Typography>
                          <Typography
                            variant="caption"
                            color="shade6"
                            fontStyle="italic"
                            className="center-text"
                            style={{ marginTop: '2px' }}
                          >
                            {order.formattedAddress}
                          </Typography>
                        </>
                      )}
                  </div>
                  {lineItem.weightConfirmed ? (
                    <Button
                      text={'Weight Confirmed'}
                      iconPosition="before"
                      textColor="noshade"
                      color="success"
                      style={{
                        height: 32,
                      }}
                      size="sm"
                      onClick={(e) => {
                        //DO NOTHING
                        e.stopPropagation();
                      }}
                      textVariant="caption"
                    />
                  ) : (
                    <Button
                      text={'Confirm Weight'}
                      iconPosition="before"
                      style={{ width: 169, height: 32, borderRadius: '8px' }}
                      size="sm"
                      variant="outline"
                      textVariant="caption"
                      onClick={(e) => {
                        if (!lineItem.weightConfirmed) {
                          updateConfirmModal({
                            isOpen: true,
                            lineItemId: lineItem.id,
                            orderId: order.orderId,
                            status: 'PENDING',
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

  const {
    count,
    toShip,
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
  const isMobile = useMediaQuery({ query: BREAKPOINTS.sm });

  const confirmWeightPending = useSelector(
    (state: Store) => state.confirmWeight.pending
  );

  const [confirmModal, updateConfirmModal] = useReducer(
    createUpdateReducer<{
      isOpen: boolean;
      orderId: string;
      lineItemId: string;
      status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED';
    }>(),
    {
      isOpen: false,
      orderId: '',
      lineItemId: '',
      status: 'PENDING',
    }
  );

  const [messageModal, updateMessageModal] = useReducer(
    createUpdateReducer<{
      buyerId: string;
      buyerName: string;
      orderRefNumber: string;
      isOpen: boolean;
    }>(),
    {
      buyerId: '',
      buyerName: '',
      orderRefNumber: '',
      isOpen: false,
    }
  );

  const [shippingDateModal, updateShippingDateModal] = useReducer(
    createUpdateReducer<{
      order: PlaceOrderMeta | null;
      isOpen: boolean;
      group: string | null;
      dropOff: string;
    }>(),
    {
      order: null,
      isOpen: false,
      group: null,
      dropOff: '',
    }
  );

  const [placeOrderId, setPlaceOrderId] = useState('');
  const [isOpen, setIsOpen] = useState<string[]>([]);
  const [lastOpenAccordion, setLastOpenAccordion] = useState('');

  const toShipPagesTotal = Math.ceil(Number(count) / DEFAULT_PAGE_LIMIT);
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
      updateShippingDateModal({ isOpen: false, order: null });
    }

    if (lastOpenAccordion && !isPlacingOrder) {
      setTimeout(() => {
        document
          .getElementById(lastOpenAccordion)
          ?.scrollIntoView({ behavior: 'smooth' });

        setLastOpenAccordion('');
      }, 1000);
    }
    // eslint-disable-next-line
  }, [isPlacingOrder]);

  useEffect(() => {
    // After pressing submit and response is finished, close modal
    if (!confirmWeightPending && didPressConfirmWeight) {
      updateConfirmModal({
        isOpen: false,
      });
      setDidPressConfirmWeight(false);
    }
    // eslint-disable-next-line
  }, [confirmWeightPending]);

  const pendingToShipTotal = pendingToShip.reduce((a, c) => {
    return a + c.orderCount;
  }, 0);

  const getDeliveryIcon = (deliveryMethod: string) => {
    const iconProps = { fill: theme.grey.noshade };
    switch (deliveryMethod) {
      case 'ROAD':
        return <Truck {...iconProps} />;
      case 'SELLER':
        return <Box {...iconProps} />;
      default:
        return <PaperPlane {...iconProps} />;
    }
  };

  const getDeliveryMobileLabel = (deliveryMethod: string) => {
    switch (deliveryMethod) {
      case 'ROAD':
        return 'Road Freight';
      case 'SELLER':
        return 'Seller Delivery';
      default:
        return 'Air Freight';
    }
  };

  const renderDeliveryLabelAndAddress = (group: PendingToShipItemData) => (
    <div>
      <Typography variant="label" color="noshade" className="center-text">
        {group.deliveryMethodLabel}
      </Typography>
      {group.deliveryAddress && (
        <Typography
          variant="caption"
          color="shade6"
          fontStyle="italic"
          className="center-text"
          style={{ marginTop: '2px' }}
        >
          {group.deliveryAddress}
        </Typography>
      )}
    </div>
  );

  const renderSoldWeight = () => (
    <ItemDetail variant="caption" color="shade6">
      Sold Weight{' '}
      <span
        style={{
          background: theme.brand.alert,
          borderRadius: '8px',
          padding: '3px 8px',
        }}
      >
        <Typography
          color="shade9"
          variant="caption"
          style={{ lineHeight: '15px' }}
        >
          To be confirmed
        </Typography>
      </span>
    </ItemDetail>
  );

  const renderOrderCount = (group: PendingToShipItemData) => (
    <div className="order-count">
      <Typography variant="overlineSmall" color="noshade">
        {group.orderCount}&nbsp;
        {group.orderCount === 1 ? 'ORDER' : 'ORDERS'}
      </Typography>
    </div>
  );

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
          sendMessage(messageModal.buyerId, message, messageModal.orderRefNumber);
          updateMessageModal({ isOpen: false });
        }}
        onClickClose={() => {
          updateMessageModal({ isOpen: false });
        }}
        loading={isSendingMessage}
      />
      <ShippingDateModal
        isOpen={shippingDateModal.isOpen}
        onConfirm={(deliveryDate) => {
          if (shippingDateModal.order) {
            placeOrder({
              ...shippingDateModal.order,
              dropOffDate: deliveryDate,
            });
          }
        }}
        onClickClose={() => {
          updateShippingDateModal({ isOpen: false });
        }}
        loading={isPlacingOrder}
        shippingMethod={shippingDateModal.group || ''}
        dropOff={shippingDateModal.dropOff || ''}
      />
      <>
        <TitleRow>
          <Col md={12} className="title-col">
            <Typography color="noshade" style={{ fontSize: '20px' }} altFont>
              Pending
            </Typography>
            <span className="notification">{pendingToShipTotal}</span>
          </Col>
        </TitleRow>

        {pendingToShip.map((group) => {
          const key = `${group.deliveryMethodLabel}-${group.deliveryAddress}`;
          return (
            <ItemRow key={key} id={key}>
              <Col>
                <StyledInteraction
                  pressed={isOpen.includes(key || '')}
                  onClick={() =>
                    group.orderCount > 0 && toggleAccordion(key || '')
                  }
                  type="accordion"
                  iconColor={theme.brand.primary}
                  fullWidth
                  accordionButtonStyle={!isMobile}
                  bottomComponent={
                    isMobile && (
                      <div>
                        {renderOrderCount(group)}
                        {renderSoldWeight()}
                      </div>
                    )
                  }
                >
                  <div className="content">
                    <div className="left-content">
                      <div className="label">
                        <span
                          style={{
                            background: theme.grey.shade10,
                            borderRadius: '8px',
                            marginRight: isMobile ? '4px' : '8px',
                          }}
                        >
                          {getDeliveryIcon(group.deliveryMethod)}
                        </span>
                        <div>{renderDeliveryLabelAndAddress(group)}</div>
                      </div>
                    </div>
                    <div className="right-content">
                      {!isMobile && (
                        <>
                          {renderOrderCount(group)}
                          {renderSoldWeight()}
                        </>
                      )}
                    </div>
                  </div>
                </StyledInteraction>

                <CollapsibleContent
                  isOpen={isOpen.includes(key || '')}
                  style={{
                    ...(addHorizontalRowMargin
                      ? { paddingLeft: 24, paddingRight: 24 }
                      : { paddingLeft: 8, paddingRight: 8 }),
                    marginBottom: isOpen.includes(key || '')
                      ? '8px'
                      : undefined,
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                    paddingBottom: isOpen.includes(key || '')
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
      {toShip.map((group, idx) => {
        return (
          <ItemRow key={group.title}>
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
                    style={{ fontSize: '20px' }}
                    altFont
                  >
                    {moment(group.title).format('Do MMMM')}
                  </Typography>
                  <span className="notification notif-reg">
                    {group.orderTotal}
                  </span>
                </Col>
              </TitleRow>

              <SoldItem
                data={group.data}
                token={token}
                status="PLACED"
                updateMessageModal={updateMessageModal}
                updateConfirmModal={updateConfirmModal}
                messageModal={messageModal}
                isSendingMessage={isSendingMessage}
                shipOrder={(
                  isPartial: boolean,
                  order?: GetSellerOrdersResponseItem,
                  group?: string
                ) => {
                  if (order) {
                    setPlaceOrderId(order.orderId);
                    updateShippingDateModal({
                      isOpen: true,
                      order: generatePlaceOrderPayload({
                        isPartial,
                        order,
                      }),
                      group,
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
