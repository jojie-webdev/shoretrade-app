import React, { useState, Fragment } from 'react';

import Button from 'components/base/Button';
import Divider from 'components/base/Divider';
import { Plane, Truck, FileCheck } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { API, SELLER_SOLD_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { SoldItemData } from './Sold.props';
import {
  InnerStyledInteraction,
  CollapsibleContent,
  ItemCard,
  ItemImage,
  ItemDetail,
  Tag,
  Spacer,
  StyledInteraction,
} from './SoldItem.styles';

const SoldItem = (props: {
  data: { [p: string]: SoldItemData[] };
  rawData: {
    [index: string]: GetSellerOrdersResponseItem[];
  };
  token: string;
  status: 'PLACED' | 'TRANSIT' | 'DELIVERED';
  updateMessageModal?: React.Dispatch<
    Partial<{
      buyerId: string;
      buyerName: string;
      isOpen: boolean;
    }>
  >;
  updateConfirmModal?: React.Dispatch<
    Partial<{
      isOpen: boolean;
      orderId: string;
      lineItemId: string;
    }>
  >;
  messageModal?: {
    buyerId: string;
    buyerName: string;
    isOpen: boolean;
  };
  isSendingMessage?: boolean;
  shipOrder?: (
    isPartial: boolean,
    order?: GetSellerOrdersResponseItem,
    group?: string
  ) => void;
  isPlacingOrder?: boolean;
  placeOrderId?: string;
}): any => {
  const {
    updateConfirmModal,
    updateMessageModal,
    messageModal,
    isSendingMessage,
    // shipOrder,
    // isPlacingOrder,
    // placeOrderId,
    // rawData,
  } = props;
  const history = useHistory();
  const theme = useTheme();
  const nonDesktop = useMediaQuery({ query: BREAKPOINTS.nonDesktop });
  const isMobile = useMediaQuery({ query: BREAKPOINTS.sm });

  const addHorizontalRowMargin = useMediaQuery({
    query: '(min-width: 1080px)',
  });

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
  return Object.values(props.data).map((entry, idx) => {
    if (entry.length === 0) return; // eslint-disable-line
    const {
      type = 'air',
      toAddressState,
      totalWeight,
      totalPrice,
      key,
      salesChannel,
      id,
    } = entry[0];
    const isPreAuction = salesChannel === 'Pre-Auction';

    // const getSellerOrder = (id: string) => {
    //   const orderData = Object.values(rawData)[idx];
    //   return orderData.find((o) => o.orderId === id);
    // };

    const Icon = () =>
      type.toLowerCase().includes('air') ? (
        <Plane fill={theme.grey.shade6} />
      ) : (
        <Truck fill={theme.grey.shade6} />
      );

    const accordionId = `${key}-${toAddressState}`;

    return (
      <Fragment key={accordionId}>
        <StyledInteraction
          pressed={isOpen.includes(accordionId)}
          onClick={() => toggleAccordion(accordionId)}
          type="accordion"
          iconColor={theme.brand.primary}
          fullWidth
        >
          <div className="content">
            <div className="left-content left-content-extended">
              <div className="label">
                <Icon />
                <Typography
                  variant="label"
                  color="shade6"
                  className="center-text"
                >
                  {key}
                </Typography>
              </div>

              <div className="order-count">
                <Typography variant="overlineSmall" color="noshade">
                  {entry.length}&nbsp;
                  {entry.length > 1 ? 'ORDERS' : 'ORDER'}
                </Typography>
              </div>
            </div>
            <Spacer />
            <Spacer />
            <Spacer />
            <div className="right-content">
              <ItemDetail variant="caption" color="shade6">
                Sold Weight <span>{totalWeight}</span>
              </ItemDetail>

              <ItemDetail variant="caption" color="shade6">
                Total Price (AUD) <span>{totalPrice}</span>
              </ItemDetail>
            </div>
          </div>
        </StyledInteraction>

        <CollapsibleContent
          isOpen={isOpen.includes(accordionId)}
          style={{
            ...(addHorizontalRowMargin
              ? { paddingLeft: 24, paddingRight: 24 }
              : { paddingLeft: 8, paddingRight: 8 }),
            marginBottom: isOpen.includes(accordionId) ? '8px' : undefined,
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            paddingBottom: isOpen.includes(accordionId) ? '8px' : undefined,
          }}
        >
          {entry.map((v, idx) => (
            <Fragment key={v.id}>
              <InnerStyledInteraction
                pressed={isOpen.includes(v.id)}
                onClick={() => toggleAccordion(v.id)}
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
                      <span>Order</span>&nbsp;#{v.orderRefNumber}
                    </Typography>

                    <div className="order-count">
                      <Typography variant="overlineSmall" color="noshade">
                        {v.orders.length}&nbsp;
                        {v.orders.length > 1 ? 'ITEMS' : 'ITEM'}
                      </Typography>
                    </div>
                  </div>
                  <Spacer />
                  <Spacer />
                  <Spacer />
                  <div className="right-content">
                    <ItemDetail variant="caption" color="shade6" row>
                      Buyer <span>{v.buyerCompanyName}</span>
                    </ItemDetail>

                    <ItemDetail variant="caption" color="shade6" row>
                      Type <span>{v.salesChannel}</span>
                    </ItemDetail>
                  </div>
                  {props.status === 'PLACED' && (
                    <div className="buttons">
                      <Button
                        text={nonDesktop ? 'Message' : 'Message Buyer'}
                        textColor={'primary'}
                        textVariant="overline"
                        iconPosition="before"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          if (updateMessageModal) {
                            updateMessageModal({
                              isOpen: true,
                              buyerId: v.buyerId,
                              buyerName: v.buyerCompanyName,
                            });
                          }
                          e.stopPropagation();
                        }}
                        loading={
                          messageModal?.buyerId === v.buyerCompanyId &&
                          isSendingMessage
                        }
                      />
                      {/* {v.salesChannel === 'Pre-Auction' && (
                        <>
                          {v.allowPartialShipment && !v.allowFullShipment ? (
                            <Button
                              text={'Ship Partial'}
                              textVariant="overline"
                              style={{
                                width: nonDesktop ? undefined : 169,
                                height: 32,
                              }}
                              size="sm"
                              onClick={(e) => {
                                if (shipOrder) {
                                  shipOrder(
                                    !v.allowFullShipment,
                                    getSellerOrder(v.id),
                                    v.groupName
                                  );
                                }
                                e.stopPropagation();
                              }}
                              loading={isPlacingOrder && placeOrderId === v.id}
                            />
                          ) : (
                            <Button
                              className="ship-order"
                              text={'Ship Order'}
                              textVariant="overline"
                              style={{
                                width: nonDesktop ? undefined : 169,
                                height: 32,
                              }}
                              disabled={!v.allowFullShipment}
                              size="sm"
                              onClick={(e) => {
                                if (shipOrder) {
                                  shipOrder(
                                    !v.allowFullShipment,
                                    getSellerOrder(v.id),
                                    v.groupName
                                  );
                                }
                                e.stopPropagation();
                              }}
                              loading={isPlacingOrder && placeOrderId === v.id}
                            />
                          )}
                        </>
                      )} */}
                    </div>
                  )}
                </div>
              </InnerStyledInteraction>

              {v.orders.map((order, index) => (
                <CollapsibleContent
                  key={`${v.id}-${index}`}
                  isOpen={isOpen.includes(v.id)}
                  style={{ background: theme.grey.shade9 }}
                >
                  <ItemCard
                    key={order.orderNumber + index}
                    onClick={() => {
                      history.push(
                        SELLER_SOLD_ROUTES.DETAILS.replace(
                          ':orderId',
                          v.id
                        ).replace(':status', props.status)
                      );
                    }}
                  >
                    <div className="wrapper">
                      <div className="content">
                        <div className="left-content">
                          <ItemImage src={parseImageUrl(order.uri)} alt="" />

                          <div className="text-content">
                            <Typography
                              variant="label"
                              color="noshade"
                              className="item-title"
                            >
                              {order.name}
                            </Typography>

                            <div className="tags-container">
                              {order.tags.map(({ label }) => (
                                <Tag key={label}>
                                  <Typography variant="caption" color="noshade">
                                    {label}
                                  </Typography>
                                </Tag>
                              ))}
                            </div>

                            <ItemDetail variant="caption" color="shade5" row>
                              Size: {order.size}
                            </ItemDetail>
                          </div>
                        </div>
                        <div className="right-content-alternate">
                          <div className="data-content">
                            <ItemDetail variant="caption" color="shade6">
                              Sold Weight <span>{order.weight}</span>
                            </ItemDetail>
                          </div>
                          <div className="data-content">
                            <ItemDetail variant="caption" color="shade6">
                              Price per {formatUnitToPricePerUnit(order.unit)}{' '}
                              <span>{order.price}</span>
                            </ItemDetail>
                          </div>
                          <div className="data-content">
                            <ItemDetail variant="caption" color="shade6">
                              Price (AUD) <span>{order.totalPrice}</span>
                            </ItemDetail>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isMobile &&
                      (isPreAuction || index === v.orders.length - 1) && (
                        <Divider backgroundColor={theme.grey.shade8} />
                      )}

                    {(isPreAuction || index === v.orders.length - 1) && (
                      <div className="buttons">
                        <div className="downloads-menu">
                          <Button
                            text="Packing Lists"
                            textColor="noshade"
                            textVariant="caption"
                            variant="outline"
                            iconPosition="before"
                            icon={
                              <FileCheck
                                fill={theme.brand.primary}
                                width={12}
                                height={12}
                              />
                            }
                            onClick={(e) => {
                              const orderRefNumbers = entry.map((v) => {
                                return v.orderRefNumber;
                              });
                              window.open(
                                `${API.URL}/${
                                  API.VERSION
                                }/order/packing-list/${orderRefNumbers.join()}?token=${
                                  props.token
                                }&state=${toAddressState}&status=${
                                  props.status
                                }`,
                                '_blank'
                              );
                              e.stopPropagation();
                            }}
                          />
                          <Button
                            text="Invoices"
                            textColor="noshade"
                            textVariant="caption"
                            variant="outline"
                            iconPosition="before"
                            icon={
                              <FileCheck
                                fill={theme.brand.primary}
                                width={12}
                                height={12}
                              />
                            }
                            onClick={(e) => {
                              const orderRefNumbers = entry.map((v) => {
                                return v.orderRefNumber;
                              });
                              window.open(
                                `${API.URL}/${
                                  API.VERSION
                                }/order/invoice/${orderRefNumbers.join()}?token=${
                                  props.token
                                }`,
                                '_blank'
                              );
                              e.stopPropagation();
                            }}
                          />
                          <Button
                            text="Order Summary"
                            textColor="noshade"
                            textVariant="caption"
                            variant="outline"
                            iconPosition="before"
                            icon={
                              <FileCheck
                                fill={theme.brand.primary}
                                width={12}
                                height={12}
                              />
                            }
                            onClick={(e) => {
                              const orderRefNumbers = entry.map((v) => {
                                return v.orderRefNumber;
                              });
                              window.open(
                                `${API.URL}/${
                                  API.VERSION
                                }/order/order-summary/${orderRefNumbers.join()}?token=${
                                  props.token
                                }&state=${toAddressState}&status=${
                                  props.status
                                }`,
                                '_blank'
                              );
                              e.stopPropagation();
                            }}
                          />
                          <Button
                            text="Shipping Label"
                            textColor="noshade"
                            textVariant="caption"
                            variant="outline"
                            iconPosition="before"
                            icon={
                              <FileCheck
                                fill={theme.brand.primary}
                                width={12}
                                height={12}
                              />
                            }
                            onClick={(e) => {
                              const orderRefNumbers = entry.map((v) => {
                                return v.orderRefNumber;
                              });
                              window.open(
                                `${API.URL}/${
                                  API.VERSION
                                }/order/pdf-label/${orderRefNumbers.join()}?token=${
                                  props.token
                                }&state=${toAddressState}&status=${
                                  props.status
                                }`,
                                '_blank'
                              );
                              e.stopPropagation();
                            }}
                          />
                        </div>
                        {isPreAuction && (
                          <>
                            {order.weightConfirmed ? (
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
                                style={{
                                  width: 169,
                                  height: 32,
                                  borderRadius: '8px',
                                }}
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  if (
                                    !order.weightConfirmed &&
                                    updateConfirmModal
                                  ) {
                                    updateConfirmModal({
                                      isOpen: true,
                                      lineItemId: order.id,
                                      orderId: id,
                                    });
                                  }
                                  e.stopPropagation();
                                }}
                              />
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </ItemCard>
                </CollapsibleContent>
              ))}
            </Fragment>
          ))}
        </CollapsibleContent>
      </Fragment>
    );
  });
};

export default SoldItem;
