import React, { useState, Fragment } from 'react';

import Button from 'components/base/Button';
import Divider from 'components/base/Divider';
import {
  Plane,
  Truck,
  DownloadFile,
  Exclamation,
  FileCheck,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { API, collectAddressShort, SELLER_SOLD_ROUTES } from 'consts';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { SoldItemData } from './Sold.props';
import {
  StyledInteraction,
  InnerStyledInteraction,
  CollapsibleContent,
  ItemCard,
  ItemImage,
  ItemDetail,
  Tag,
} from './SoldItem.styles';
import { Spacer } from './ToShip/ToShip.styles';

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
  messageModal?: {
    buyerId: string;
    buyerName: string;
    isOpen: boolean;
  };
  isSendingMessage?: boolean;
  shipOrder?: (isPartial: boolean, order?: GetSellerOrdersResponseItem) => void;
  isPlacingOrder?: boolean;
  placeOrderId?: string;
}): any => {
  const {
    updateMessageModal,
    messageModal,
    isSendingMessage,
    shipOrder,
    isPlacingOrder,
    placeOrderId,
    rawData,
  } = props;
  const history = useHistory();
  const theme = useTheme();

  const [showDownloads, setShowDownloads] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const addHorizontalRowMargin = useMediaQuery({
    query: '(min-width: 1080px)',
  });
  const onEnterDownloads = (id: string) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setShowDownloads(id);
  };

  const onExitDownloads = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    const timerId = setTimeout(() => {
      setShowDownloads('');
    }, 500);
    setTimer(timerId);
  };

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
    const { type = 'air', toAddressState, totalWeight, totalPrice } = entry[0];

    const getSellerOrder = (id: string) => {
      const orderData = Object.values(rawData)[idx];
      return orderData.find((o) => o.orderId === id);
    };

    const desc = (() => {
      if (type === 'air') {
        return 'Air Freight Cut Off';
      }

      if (type === 'pickup') {
        return `Pick Up at ${collectAddressShort}`;
      }

      return 'Road Freight Pick Up';
    })();

    const Icon = () =>
      type.toLowerCase().includes('air') ? (
        <Plane fill={theme.grey.shade6} />
      ) : (
        <Truck fill={theme.grey.shade6} />
      );
    const toAddress = toAddressState ? `${toAddressState}` : '';
    const key = `${desc}-${toAddress}`;

    return (
      <Fragment key={key}>
        <StyledInteraction
          pressed={isOpen.includes(toAddress)}
          onClick={() => toggleAccordion(toAddress)}
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
                  {desc}
                </Typography>
                {type !== 'pickup' && (
                  <Typography variant="label" color="noshade">
                    {`${toAddress}`}
                  </Typography>
                )}
              </div>

              <div className="order-count">
                <Typography variant="overlineSmall" color="noshade">
                  {entry.length}&nbsp;
                  {entry.length > 1 ? 'ITEMS' : 'ITEM'}
                </Typography>
              </div>
            </div>
            <Spacer />
            <div className="right-content">
              <ItemDetail variant="caption" color="shade6">
                Sold Weight <span>{totalWeight}</span>
              </ItemDetail>

              <ItemDetail variant="caption" color="shade6">
                Total Price (AUD) <span>{totalPrice}</span>
              </ItemDetail>
            </div>

            {/* <div className="buttons">
              {showDownloads === key && (
                <div
                  className="downloads-menu"
                  onMouseEnter={() => {
                    if (timer) {
                      clearTimeout(timer);
                      setTimer(null);
                    }
                  }}
                  onMouseLeave={() => {
                    onExitDownloads();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Typography
                    color="noshade"
                    onClick={(e) => {
                      const orderRefNumbers = entry.map((v) => {
                        return v.orderRefNumber;
                      });
                      window.open(
                        `${API.URL}/${
                          API.VERSION
                        }/order/packing-list/${orderRefNumbers.join()}?token=${
                          props.token
                        }&state=${toAddressState}&status=${props.status}`,
                        '_blank'
                      );
                      setShowDownloads('');
                      e.stopPropagation();
                    }}
                  >
                    Packing Lists
                  </Typography>
                  <Typography
                    color="noshade"
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
                      setShowDownloads('');
                      e.stopPropagation();
                    }}
                  >
                    Invoices
                  </Typography>
                  <Typography
                    color="noshade"
                    onClick={(e) => {
                      const orderRefNumbers = entry.map((v) => {
                        return v.orderRefNumber;
                      });
                      window.open(
                        `${API.URL}/${
                          API.VERSION
                        }/order/order-summary/${orderRefNumbers.join()}?token=${
                          props.token
                        }&state=${toAddressState}&status=${props.status}`,
                        '_blank'
                      );
                      setShowDownloads('');
                      e.stopPropagation();
                    }}
                  >
                    Order Summary
                  </Typography>
                  <Typography
                    color="noshade"
                    onClick={(e) => {
                      const orderRefNumbers = entry.map((v) => {
                        return v.orderRefNumber;
                      });
                      window.open(
                        `${API.URL}/${
                          API.VERSION
                        }/order/pdf-label/${orderRefNumbers.join()}?token=${
                          props.token
                        }&state=${toAddressState}&status=${props.status}`,
                        '_blank'
                      );
                      setShowDownloads('');
                      e.stopPropagation();
                    }}
                  >
                    Shipping Label
                  </Typography>
                </div>
              )}

              <Button
                text={'Downloads'}
                icon={
                  <DownloadFile
                    fill={theme.grey.noshade}
                    height={16}
                    width={16}
                  />
                }
                textColor={'noshade'}
                iconPosition="before"
                style={{
                  width: 123,
                  height: 32,
                  backgroundColor: theme.grey.shade8,
                }}
                size="sm"
                onMouseLeave={() => {
                  onExitDownloads();
                }}
                onClick={(e) => {
                  if (showDownloads.length > 0) {
                    setShowDownloads('');
                  } else {
                    onEnterDownloads(key);
                  }
                  e.stopPropagation();
                }}
              />
            </div> */}
          </div>
        </StyledInteraction>

        <CollapsibleContent
          isOpen={isOpen.includes(toAddress)}
          style={{
            ...(addHorizontalRowMargin
              ? { paddingLeft: 24, paddingRight: 24 }
              : { marginLeft: 8, marginRight: 8 }),
            marginBottom: isOpen.includes(toAddress) ? '8px' : undefined,
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            paddingBottom: isOpen.includes(toAddress) ? '8px' : undefined,
          }}
        >
          {entry.map((v) => (
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
                  <div className="right-content">
                    <ItemDetail variant="caption" color="shade6" row>
                      Buyer <span>{v.buyerCompanyName}</span>
                    </ItemDetail>

                    <ItemDetail variant="caption" color="shade6" row>
                      Type <span>Direct Sale</span>
                      {/*Should check if aquafuture or auction*/}
                    </ItemDetail>
                  </div>
                  {props.status === 'PLACED' && (
                    <div className="buttons">
                      <Button
                        text={'Message Buyer'}
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
                      {v.allowPartialShipment && !v.allowFullShipment ? (
                        <Button
                          text={'Ship Partial'}
                          textVariant="overline"
                          style={{ width: 169, height: 32 }}
                          size="sm"
                          onClick={(e) => {
                            if (shipOrder) {
                              shipOrder(
                                !v.allowFullShipment,
                                getSellerOrder(v.id)
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
                          style={{ width: 169, height: 32 }}
                          disabled={!v.allowFullShipment}
                          size="sm"
                          onClick={(e) => {
                            if (shipOrder) {
                              shipOrder(
                                !v.allowFullShipment,
                                getSellerOrder(v.id)
                              );
                            }
                            e.stopPropagation();
                          }}
                          loading={isPlacingOrder && placeOrderId === v.id}
                        />
                      )}
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
                              Price per kg <span>{order.price}</span>
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

                    <Divider backgroundColor={theme.grey.shade8} />

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
                              }&state=${toAddressState}&status=${props.status}`,
                              '_blank'
                            );
                            setShowDownloads('');
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
                            setShowDownloads('');
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
                              }&state=${toAddressState}&status=${props.status}`,
                              '_blank'
                            );
                            setShowDownloads('');
                            e.stopPropagation();
                          }}
                        />
                      </div>
                      <Button
                        text={'Weight Confirmed'}
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
                    </div>
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
