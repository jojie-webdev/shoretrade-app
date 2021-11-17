import React from 'react';

import Button from 'components/base/Button';
import { DownloadFile, Message, Star } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { API } from 'consts';
import { parseImageUrl } from 'utils/parseImageURL';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

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
  StyledTouchable
} from './OrderItem.style';

import { Container, Row, Col } from 'react-grid-system'

const OrderItem = (props: OrderItemProps): JSX.Element => {
  const theme = useTheme();
  const deliveredDate = new Date(props.deliveredDate);
  const dateToday = new Date();
  const diff = dateToday.getTime() - deliveredDate.getTime();
  const diffDays = diff / (1000 * 3600 * 24);
  const showDispute = props.completedOrder && diffDays < 1
  const rating = props.data.rating
  const showCatchment = !props.data.isMarketRequest
  
  return (
    <OrderItemContainer>
      <OrderInfoContainer theme={theme}>
        <Row nogutter={true}>
          <Col sm={6} className="detail-container">
            <Row nogutter={true}>
              <Col xs="content">
                <Typography variant="label" color="shade6">
                  Seller
                </Typography>
                <Typography color="shade9">{props.data.seller}</Typography>
              </Col>
              <Col xs="content" className="btn-rate-seller">
                <FlexiContainer>
                { props.completedOrder && 
                  <Button
                    icon={<Star width={13} height={13} fill={!!rating ? theme.grey.noshade : theme.brand.primary}/>}
                    iconPosition="before"
                    variant={!!rating ? "primary" : "outline"}
                    textVariant="overline"
                    text={!!rating ? `${rating}` : "Rate Seller"}
                    size="sm"
                    textWeight="900"
                    style={{ borderRadius: '8px', marginLeft: '24px' }}
                    shortenedText={!!rating ? `${rating}` : "Rate"}
                    onClick={props.onRateClick}
                  />
                }
                </FlexiContainer>
              </Col>
            </Row>
          </Col>

          <Col sm={3} className="detail-container">
            <Typography color="shade6" variant="label">
              Download
            </Typography>
            <StyledTouchable
              onPress={() => {
                window.open(
                  `${API.URL}/${API.VERSION}/order/invoice/${props.data.orderRefNumber}?token=${props.token}`,
                  '_blank'
                );
              }}
            >
              <div className="svg-container">
                <DownloadFile />
              </div>
              <Typography color="shade9">Invoice</Typography>
            </StyledTouchable>
          </Col>

          <Col sm={3}>
            <Typography color="shade6" variant="label" className="end-text">
              Ordered By:
            </Typography>
            <Typography color="shade9" align="right" className="end-text">{props.data.orderedBy}</Typography>
          </Col>
        </Row>
      </OrderInfoContainer>

      <OrderItemsContainer>
        <Row nogutter={true}>
          {props.data.detailsProps.map((d, ndx) => (
            <Col xs={12} className="item">
              <Row nogutter={true}>
                <Col xs={12} sm={showCatchment ? 4 : 5}><Row nogutter={true}>
                  <Col xs="content">
                    <FlexiContainer>
                      <img src={parseImageUrl(d.uri)} alt="Product" />
                    </FlexiContainer>
                  </Col>
                
                  <Col>
                    <Typography color="shade9">{d.name}</Typography>
                    <Row nogutter={true}>
                      {d.tags.map((tag) => (
                        <Col xs="content">
                          <Tag key={tag.label}>
                            <Typography variant="overlineSmall">{tag.label}</Typography>
                          </Tag>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row></Col>
                
                <Col xs={12} sm={showCatchment ? 8 : 7} style={{ alignSelf: 'center' }}><Row nogutter={true} >
                  { showCatchment &&
                    <Col xs={4} sm={3} className={`${showCatchment ? 'detail-container' : ''}`} style={{ paddingRight: '10px' }}>
                      <ItemDetailLabel color="shade6" variant="caption">
                        Catchment
                      </ItemDetailLabel>
                      <ItemDetailValue variant="label" weight="bold" color="shade9">
                        {d.location}
                      </ItemDetailValue>
                    </Col>
                  }

                  <Col xs={showCatchment ? 8 : 3} sm={3} className={`${showCatchment ? 'detail-container' : ''}`}>
                    <ItemDetailLabel color="shade6" variant="caption">
                      Size
                    </ItemDetailLabel>
                    <ItemDetailValue variant="label" weight="bold" color="shade9">
                      {d.size}
                    </ItemDetailValue>
                  </Col>

                  <Col xs={showCatchment ? 4 : 3} sm={showCatchment ? 2 : 3}>
                    <ItemDetailLabel color="shade6" variant="caption">
                      Weight
                    </ItemDetailLabel>
                    <ItemDetailValue variant="label" weight="bold" color="shade9">
                      {d.weight}
                    </ItemDetailValue>
                  </Col>

                  <Col xs={showCatchment ? 5 : 3} sm={showCatchment ? 2 : 3}>
                    <ItemDetailLabel color="shade6" variant="caption">
                      Price per {d.unit}
                    </ItemDetailLabel>
                    <ItemDetailValue variant="label" weight="bold" color="shade9">
                      {d.pricePerUnit}
                    </ItemDetailValue>
                  </Col>

                  <Col xs={showCatchment ? 3 : 3} sm={showCatchment ? 2 : 3}>
                    <ItemDetailLabel className="end-text" color="shade6" variant="caption">
                      Subtotal
                    </ItemDetailLabel>
                    <ItemDetailValue className="end-text value" variant="label" weight="bold" color="shade9">
                      {d.price}
                    </ItemDetailValue>
                  </Col>
                </Row></Col>
              </Row>
            </Col>
          ))}
        </Row>
      </OrderItemsContainer>
        
      <OrderTotalContainer>
        <Row nogutter={true}>
          <Col sm={6} className="detail-container">
            <Typography color="shade6" variant="label">
              {props.data.shippingOption}:
            </Typography>
            <Typography color="shade9" variant="body" weight="bold">
              {toPrice(
                props.data.shippingChargeNet + props.data.shippingChargeGst
              )}{' '}
              (incl. GST)
            </Typography>
          </Col>
          
          <Col sm={6}>
            <Typography color="shade6" variant="label" className="end-text">
              Total
            </Typography>
            <Typography color="shade9" variant="body" weight="bold" className="end-text">
              {props.data.total}
            </Typography>
          </Col>
        </Row>
      </OrderTotalContainer>

      <OrderShippingContainer>
        <Row nogutter={true}>
          <Col sm={9}><Row nogutter={true}>
            <Col sm={showDispute ? 12 : 4} xl={4} className="detail-container">
              <Typography color="shade6" variant="label">
                Shipping From
              </Typography>
              <Typography color="shade9" variant="body" weight="bold">
                {props.data.shippingFrom}  
              </Typography>
            </Col>

            <Col sm={showDispute ? 12 : 8} xl={8} className="detail-container">
              <Typography color="shade6" variant="label">
                Delivery Address
              </Typography>
              <Typography color="shade9" variant="body" weight="bold">
                {props.data.shippingTo}
              </Typography>
            </Col>
          </Row></Col>
          
          <Col sm={3} style={{ alignSelf: 'center' }}><Row nogutter={true}>
            {showDispute &&
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
            }

            <Col sm={12} xl={showDispute ? 6 : 12}>
              <Typography color="shade6" variant="label" className="end-text">
                Order No.
              </Typography>
              <Typography color="shade9" variant="body" weight="bold" className="end-text">
                {props.data.orderNumber}
              </Typography>
            </Col>
          </Row></Col>
        </Row>
      </OrderShippingContainer>
    </OrderItemContainer>
  );
};

export default React.memo(OrderItem);
