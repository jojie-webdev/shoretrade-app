import React from 'react';

import Button from 'components/base/Button';
import {
  DownloadFile,
  Message,
  Star,
  Check,
  AngleDown,
  AngleUp,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { API } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { CollectableBadge } from 'routes/Buyer/Orders/Orders.style';
import { parseImageUrl } from 'utils/parseImageURL';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import ScanHistoryButton from '../ScanHistoryButton';
import { OrderItemProps } from './OrderItem.props';
import {
  OrderItemContainer,
  OrderInfoContainer,
  OrderItemsContainer,
  OrderTotalContainer,
  OrderShippingContainer,
  FlexiContainer,
  ItemDetailLabel,
  ItemDetailValue,
  Tag,
  StyledTouchable,
  DetailsContainer,
  OrderItemScanTotalContainer,
  SubtotalContainer,
  InvoiceContainer,
} from './OrderItem.style';

const OrderItem = (props: OrderItemProps): JSX.Element => {
  const theme = useTheme();
  const deliveredDate = new Date(props.deliveredDate);
  const dateToday = new Date();
  const diff = dateToday.getTime() - deliveredDate.getTime();
  const diffDays = diff / (1000 * 3600 * 24);
  const showDispute = props.completedOrder && diffDays < 1;
  const rating = props.data.rating;
  const showCatchment = !props.data.isMarketRequest;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const handleOpenPdf = (adjustmentRef?: string) => {
    window.open(
      `${API.PDF_URL || API.URL}/${API.VERSION}/${
        theme.isSFM ? 'sfm-blue/' : ''
      }order/invoice/${props.data.orderRefNumber}?token=${props.token}${
        adjustmentRef ? `&adjustmentRef=${adjustmentRef}` : '&showInitial=true'
      }`,
      '_blank'
    );
  };

  return (
    <OrderItemContainer>
      <OrderInfoContainer theme={theme}>
        <div className="detail-container">
          <div className="group">
            <div className="group-item">
              <DetailsContainer>
                <Typography variant="label" color="shade6">
                  Order no.
                </Typography>
                {props.data.isCollectable && (
                  <CollectableBadge
                    style={{
                      padding: '4px 5px',
                      width: '20px',
                      marginLeft: '4px',
                    }}
                  >
                    <Check fill="#fff" />
                  </CollectableBadge>
                )}
              </DetailsContainer>
              <DetailsContainer>
                <Typography color="shade9">{props.data.orderNumber}</Typography>
              </DetailsContainer>
            </div>
            <div className="group-item">
              <Typography variant="label" color="shade6">
                Seller
              </Typography>
              <DetailsContainer>
                <Typography color="shade9">{props.data.seller}</Typography>
                {props.completedOrder && (
                  <StyledTouchable
                    onPress={() => props.onRateClick && props.onRateClick()}
                    bgColor={rating ? theme.brand.primary : undefined}
                  >
                    <div className="svg-container">
                      <Star
                        width={13}
                        height={13}
                        fill={rating ? theme.grey.noshade : theme.brand.primary}
                      />
                    </div>
                    <Typography
                      variant="label"
                      color={rating ? 'noshade' : 'shade9'}
                    >
                      {rating ? `${rating}` : 'Rate'}
                    </Typography>
                  </StyledTouchable>
                )}
              </DetailsContainer>
            </div>
          </div>
          <div className="group group-reverse">
            <div className="group-item" style={{ position: 'relative' }}>
              {props.data.isPending ? (
                <div
                  style={{
                    background: theme.brand.alert,
                    borderRadius: '8px',
                    padding: '3px 8px',
                    width: 'fit-content',
                  }}
                >
                  <Typography
                    color="shade9"
                    variant="caption"
                    style={{ lineHeight: '15px' }}
                  >
                    To be confirmed
                  </Typography>
                </div>
              ) : (
                <>
                  {props.openInvoice ===
                    props.data.orderRefNumber.toString() && (
                    <InvoiceContainer>
                      <Typography
                        variant="label"
                        color="shade6"
                        onClick={() => handleOpenPdf()}
                        style={{ cursor: 'pointer', marginBottom: 5 }}
                      >
                        Original Invoice
                      </Typography>
                      {props?.orderInvoiceAdjustments?.orderAdjustmentsLabel?.map(
                        (adjustment) => (
                          <Typography
                            variant="label"
                            color="shade6"
                            onClick={() => handleOpenPdf(adjustment)}
                            style={{ cursor: 'pointer', marginBottom: 5 }}
                          >
                            Order Adjustment {adjustment}
                          </Typography>
                        )
                      )}
                    </InvoiceContainer>
                  )}

                  <StyledTouchable
                    onPress={() =>
                      props?.handleGetOrderInvoiceAdjustment &&
                      props?.handleGetOrderInvoiceAdjustment()
                    }
                  >
                    <div className="svg-container">
                      <DownloadFile />
                    </div>
                    <Typography variant="label" color="shade9">
                      Invoice
                    </Typography>
                    {props.openInvoice ===
                    props.data.orderRefNumber.toString() ? (
                      <AngleDown fill={theme.brand.primary} />
                    ) : (
                      <AngleUp fill={theme.brand.primary} />
                    )}
                  </StyledTouchable>
                </>
              )}
            </div>
            <div className="group-item">
              <Typography color="shade6" variant="label">
                Ordered By:
              </Typography>
              <Typography color="shade9">{props.data.orderedBy}</Typography>
            </div>
          </div>
        </div>
      </OrderInfoContainer>

      <OrderItemsContainer>
        <Row nogutter={true}>
          {props.data.detailsProps.map((d, ndx) => (
            <Col key={`${d.name}-${ndx}`} xs={12} className="item">
              <Row nogutter={true}>
                <Col xs={12} sm={showCatchment ? 4 : 5}>
                  <Row nogutter={true}>
                    <Col xs="content">
                      <FlexiContainer>
                        <img src={parseImageUrl(d.uri)} alt="Product" />
                      </FlexiContainer>
                    </Col>

                    <Col>
                      <Typography color="shade9">{d.name}</Typography>
                      <Row nogutter={true}>
                        {d.tags.map((tag) => (
                          <Col key={tag.label} xs="content">
                            <Tag
                              key={tag.label}
                              background={
                                tag.type === 'blue'
                                  ? theme.brand.info
                                  : theme.grey.shade3
                              }
                            >
                              <Typography
                                variant="overlineSmall"
                                color={
                                  tag.type === 'blue' ? 'noshade' : 'shade9'
                                }
                              >
                                {tag.label}
                              </Typography>
                            </Tag>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col
                  xs={12}
                  sm={showCatchment ? 8 : 7}
                  style={{ alignSelf: 'center' }}
                >
                  <Row nogutter={true}>
                    {showCatchment && (
                      <Col
                        xs={4}
                        sm={3}
                        className={`${showCatchment ? 'detail-container' : ''}`}
                        style={{ paddingRight: '10px' }}
                      >
                        <ItemDetailLabel color="shade6" variant="caption">
                          Catchment
                        </ItemDetailLabel>
                        <ItemDetailValue
                          variant="label"
                          weight="bold"
                          color="shade9"
                        >
                          {d.location}
                        </ItemDetailValue>
                      </Col>
                    )}

                    <Col
                      xs={showCatchment ? 8 : 3}
                      sm={3}
                      className={`${showCatchment ? 'detail-container' : ''}`}
                    >
                      <ItemDetailLabel color="shade6" variant="caption">
                        Size
                      </ItemDetailLabel>
                      <ItemDetailValue
                        variant="label"
                        weight="bold"
                        color="shade9"
                      >
                        {d.size}
                      </ItemDetailValue>
                    </Col>

                    <Col xs={showCatchment ? 4 : 3} sm={showCatchment ? 2 : 3}>
                      <ItemDetailLabel color="shade6" variant="caption">
                        Weight
                      </ItemDetailLabel>
                      <ItemDetailValue
                        variant="label"
                        weight="bold"
                        color="shade9"
                      >
                        {d.weight}
                      </ItemDetailValue>
                    </Col>

                    <Col xs={showCatchment ? 5 : 3} sm={showCatchment ? 2 : 3}>
                      <ItemDetailLabel color="shade6" variant="caption">
                        Price per {d.unit}
                      </ItemDetailLabel>
                      <ItemDetailValue
                        variant="label"
                        weight="bold"
                        color="shade9"
                      >
                        {d.pricePerUnit}
                      </ItemDetailValue>
                    </Col>

                    <Col xs={showCatchment ? 3 : 3} sm={showCatchment ? 2 : 3}>
                      <ItemDetailLabel
                        className="end-text"
                        color="shade6"
                        variant="caption"
                      >
                        Subtotal
                      </ItemDetailLabel>
                      <ItemDetailValue
                        className="end-text value"
                        variant="label"
                        weight="bold"
                        color="shade9"
                      >
                        {d.price}
                      </ItemDetailValue>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          ))}
          <Col xs={12} className="item">
            <Row nogutter={true}>
              <Col sm={9} style={{ alignSelf: 'center', margin: '4px 0' }}>
                <Typography color="shade9">
                  {props?.isPartialShipped
                    ? 'Partial Shipment'
                    : 'Shipping Fees'}
                </Typography>
                <Typography color="shade6" variant="label" weight="400">
                  Shipping from {props.data.shippingFrom}
                </Typography>
              </Col>
              <Col sm={3} style={{ alignSelf: 'center' }}>
                <SubtotalContainer>
                  <div>
                    <ItemDetailLabel
                      className="end-text"
                      color="shade6"
                      variant="caption"
                    >
                      Subtotal
                    </ItemDetailLabel>
                    <ItemDetailValue
                      className="end-text value"
                      variant="label"
                      weight="bold"
                      color="shade9"
                    >
                      {props?.isPartialShipped
                        ? toPrice(0)
                        : toPrice(
                            props.data.shippingChargeNet +
                              props.data.shippingChargeGst
                          )}
                    </ItemDetailValue>
                  </div>
                </SubtotalContainer>
              </Col>
            </Row>
          </Col>
          {props.data?.totalTransactionFee && (
            <Col xs={12} className="item">
              <Row nogutter={true}>
                <Col sm={9} style={{ alignSelf: 'center' }}>
                  <div>
                    <Typography color="shade9" style={{ margin: '12px 0' }}>
                      {props.data?.transactionValueFeePercentage}% Transaction
                      Fees
                    </Typography>
                  </div>
                </Col>
                <Col sm={3} style={{ alignSelf: 'center' }}>
                  <SubtotalContainer>
                    <div>
                      <ItemDetailLabel
                        className="end-text"
                        color="shade6"
                        variant="caption"
                      >
                        Subtotal
                      </ItemDetailLabel>
                      <ItemDetailValue
                        className="end-text value"
                        variant="label"
                        weight="bold"
                        color="shade9"
                      >
                        {toPrice(props.data.totalTransactionFee)}
                      </ItemDetailValue>
                    </div>
                  </SubtotalContainer>
                </Col>
              </Row>
            </Col>
          )}
          {props.data.totalCrateFee > 0 && (
            <Col xs={12} className="item">
              <Row nogutter={true}>
                <Col sm={9} style={{ alignSelf: 'center' }}>
                  <Typography color="shade9" style={{ margin: '12px 0' }}>
                    Crate Fee and Levies
                  </Typography>
                </Col>
                <Col sm={3} style={{ alignSelf: 'center' }}>
                  <SubtotalContainer>
                    <div>
                      <ItemDetailLabel
                        className="end-text"
                        color="shade6"
                        variant="caption"
                      >
                        Subtotal
                      </ItemDetailLabel>
                      <ItemDetailValue
                        className="end-text value"
                        variant="label"
                        weight="bold"
                        color="shade9"
                      >
                        {toPrice(props.data.totalCrateFee)}
                      </ItemDetailValue>
                    </div>
                  </SubtotalContainer>
                </Col>
              </Row>
            </Col>
          )}
          <Col xs={12}>
            <Row nogutter={true}>
              <Col xs={6} sm={8} style={{ alignSelf: 'center' }}>
                {showDispute ? (
                  <Button
                    text="Raise Dispute"
                    icon={<Message fill="#FFF" height={16} width={16} />}
                    iconPosition="before"
                    variant="primary"
                    size="sm"
                    onClick={props.onClick}
                    className="btn-raise-dispute"
                    style={{ borderRadius: '8px' }}
                  />
                ) : props.deliveryAddress ? (
                  <Typography
                    color="shade6"
                    variant="label"
                    weight="400"
                    style={{ margin: '12px 0' }}
                  >
                    Delivering to {props.deliveryAddress}
                  </Typography>
                ) : (
                  <></>
                )}
              </Col>
              <Col xs={6} sm={4}>
                <OrderItemScanTotalContainer>
                  {props.updateScanHistoryModal && (
                    <div>
                      {props.data.detailsProps.length > 0 &&
                        props.data.detailsProps[0].scanHistory &&
                        props.data.detailsProps[0].scanHistory
                          .slice(0, 1)
                          .map((sh) => {
                            return (
                              <ScanHistoryButton
                                key={sh.id}
                                scanData={sh}
                                scanHistoryItems={
                                  props.data.detailsProps[0].scanHistory
                                }
                                onClick={(e) => {
                                  if (props.updateScanHistoryModal) {
                                    props.updateScanHistoryModal({
                                      isOpen: true,
                                      scanHistoryItems:
                                        props.data.detailsProps[0].scanHistory,
                                    });
                                  }
                                }}
                              />
                            );
                          })}
                    </div>
                  )}

                  <div>
                    <Typography
                      color="shade6"
                      variant="label"
                      className="end-text"
                    >
                      Total
                    </Typography>
                    <Typography
                      color="shade9"
                      align="right"
                      className="end-text"
                    >
                      {props?.isPartialShipped
                        ? toPrice(
                            Number(props.data.total.replace(/[^0-9.]/g, '')) -
                              (props.data.shippingChargeNet +
                                props.data.shippingChargeGst)
                          )
                        : props.data.total}
                    </Typography>
                  </div>
                </OrderItemScanTotalContainer>
              </Col>
            </Row>
          </Col>
        </Row>
      </OrderItemsContainer>

      {/* <OrderTotalContainer>
        <Row nogutter={true}>
          <Col sm={6} className="detail-container">
            <Typography color="shade6" variant="label">
              {props.data.shippingOption}:
            </Typography>
            {props.data.shippingAddress && (
              <Typography color="shade6" variant="caption" fontStyle="italic">
                {props.data.shippingAddress}
              </Typography>
            )}
            <Typography color="shade9" variant="body" weight="bold">
              {toPrice(
                props.data.shippingChargeNet + props.data.shippingChargeGst
              )}{' '}
              (incl. GST)
            </Typography>
          </Col>

          {!!isMobile && props.data.totalCrateFee > 0 && (
            <Col sm={6}>
              <Typography color="shade6" variant="label">
                Crate Fee and Levies
              </Typography>
              <Typography color="shade9" variant="body" weight="bold">
                {toPrice(props.data.totalCrateFee)}
              </Typography>
            </Col>
          )}

          <Col sm={6} className="total-container">
            <Typography color="shade6" variant="label" className="end-text">
              Total
            </Typography>
            <Typography
              color="shade9"
              variant="body"
              weight="bold"
              className="end-text"
            >
              {props.data.total}
            </Typography>
          </Col>

          {!isMobile && props.data.totalCrateFee > 0 && (
            <Col sm={6}>
              <Typography color="shade6" variant="label">
                Crate Fee and Levies
              </Typography>
              <Typography color="shade9" variant="body" weight="bold">
                {toPrice(props.data.totalCrateFee)}
              </Typography>
            </Col>
          )}
        </Row>
      </OrderTotalContainer> */}

      {/* <OrderShippingContainer>
        <Row nogutter={true}>
          <Col sm={9}>
            <Row nogutter={true}>
              <Col
                sm={showDispute ? 12 : 4}
                xl={4}
                className="detail-container"
              >
                <Typography color="shade6" variant="label">
                  Shipping From
                </Typography>
                <Typography color="shade9" variant="body" weight="bold">
                  {props.data.shippingFrom}
                </Typography>
              </Col>

              <Col
                sm={showDispute ? 12 : 8}
                xl={8}
                className="detail-container"
              >
                <Typography color="shade6" variant="label">
                  Delivery Address
                </Typography>
                <Typography color="shade9" variant="body" weight="bold">
                  {props.data.shippingTo}
                </Typography>
              </Col>
            </Row>
          </Col>

          <Col sm={3} style={{ alignSelf: 'center' }}>
            <Row nogutter={true}>
              {showDispute && (
                <Col sm={12} xl={6} className="detail-container">
                  <FlexiContainer justifyReversed={true}>
                    <Button
                      text="Raise Dispute"
                      icon={<Message fill="#FFF" height={16} width={16} />}
                      iconPosition="before"
                      variant="primary"
                      size="sm"
                      onClick={props.onClick}
                      className="btn-raise-dispute"
                      style={{ borderRadius: '8px' }}
                    />
                  </FlexiContainer>
                </Col>
              )}

              <Col sm={12} xl={showDispute ? 6 : 12}>
                <Typography color="shade6" variant="label" className="end-text">
                  Order No.
                </Typography>
                <Typography
                  color="shade9"
                  variant="body"
                  weight="bold"
                  className="end-text"
                >
                  {props.data.orderNumber}
                </Typography>
              </Col>
            </Row>
          </Col>
        </Row>
      </OrderShippingContainer> */}
    </OrderItemContainer>
  );
};

export default React.memo(OrderItem);
