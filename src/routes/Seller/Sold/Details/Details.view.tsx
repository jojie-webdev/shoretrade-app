import React from 'react';

import { FileCheck, ChevronRight, Scale } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { API } from 'consts';
import { useTheme } from 'utils/Theme';

import { DetailsProps } from './Details.props';
import {
  Wrapper,
  Header,
  ActionContainer,
  OrderDetailContainer,
  DetailsRow,
  DetailsColumn,
  ProductList,
  ItemContainer,
  ItemImage,
  ItemRow,
  ItemColumn,
  Tag,
  Box,
  Footer,
} from './Details.style';

const OrderDetail = (props: { label?: string; value?: string }) => {
  const { label, value } = props;
  return (
    <OrderDetailContainer>
      <Typography variant="overline" color="shade6">
        {label || ''}
      </Typography>
      <Typography color="noshade">{value || ''}</Typography>
    </OrderDetailContainer>
  );
};

const DetailsView = (props: DetailsProps) => {
  const theme = useTheme();
  const { details, token } = props;

  const {
    orderRefNumber,
    status,
    shippingDate,
    deliveryDate,
    orderDate,
    orderedBy,
    seller,
    shippingFrom,
    shippingTo,
    packingList,
    total,
  } = details;

  const isDelivered = status === 'Delivered';

  return (
    <Wrapper>
      <Header>
        <InnerRouteHeader title={status} />
        <Touchable
          dark
          onPress={() => {
            window.open(
              `${API.URL}/${API.VERSION}/order/invoice/${orderRefNumber}?token=${token}`,
              '_blank'
            );
          }}
        >
          <ActionContainer>
            <FileCheck width={13} height={13} fill={theme.grey.noshade} />
            <Typography
              className="action-text"
              variant="caption"
              color="noshade"
            >
              Invoice
            </Typography>
          </ActionContainer>
        </Touchable>
      </Header>
      <DetailsRow>
        <DetailsColumn>
          {!isDelivered && (
            <>
              <OrderDetail label="Shipping" value={shippingDate} />
              <OrderDetail
                label="Estimated Delivery"
                value={deliveryDate}
              />{' '}
            </>
          )}
          <OrderDetail label="Order Date" value={orderDate} />
        </DetailsColumn>
        <DetailsColumn>
          <OrderDetail label="Ordered By" value={orderedBy} />
          <OrderDetail label="Seller" value={seller} />
        </DetailsColumn>
        <DetailsColumn>
          <OrderDetail
            label={` ${isDelivered ? 'SHIPPED' : 'SHIPPING'} FROM:`}
            value={shippingFrom}
          />
          <OrderDetail
            label={`${isDelivered ? 'SHIPPED' : 'SHIPPING'} TO:`}
            value={shippingTo}
          />
        </DetailsColumn>
      </DetailsRow>
      <ProductList>
        <Typography variant="title5" color="noshade">
          Packing List
        </Typography>
        {packingList.map((list) => (
          <ItemContainer key={list.name}>
            <ItemRow>
              <ItemImage src={list.imgSrc} alt="" />
              <ItemColumn>
                <Typography variant="title5" color="noshade">
                  {list.name}
                </Typography>
                <div className="tags-container">
                  {list.tags.map((tag) => (
                    <Tag key={tag.label}>
                      <Typography variant="caption" color="noshade">
                        {tag.label}
                      </Typography>
                    </Tag>
                  ))}
                </div>
                <div className="size-container">
                  <Typography className="size-label" color="shade6">
                    Size:
                  </Typography>
                  <Typography color="noshade">{list.size}</Typography>
                </div>
              </ItemColumn>
            </ItemRow>
            {list.boxes.map((b) => (
              <Box key={b.id}>
                <div className="box-item">
                  <Typography variant="overline" color="shade6">
                    Box weight
                  </Typography>
                  <Typography color="noshade">{`${b.weight.toFixed(2)} ${
                    list.unit
                  }`}</Typography>
                </div>
                <div className="box-item">
                  <Typography variant="overline" color="shade6">
                    Quantity
                  </Typography>
                  <Typography color="noshade">{b.quantity}</Typography>
                </div>
                <div className="box-item">
                  <Typography variant="overline" color="shade6">
                    Cost
                  </Typography>
                  <Typography color="noshade">
                    ${list.cost * b.quantity * b.weight}
                  </Typography>
                </div>
              </Box>
            ))}
          </ItemContainer>
        ))}
      </ProductList>
      <Footer>
        <Typography variant="overline" color="shade6">
          TOTAL:
        </Typography>
        <Typography
          className="footer-total-value"
          variant="title4"
          weight="bold"
          color="noshade"
        >
          {total}
        </Typography>
      </Footer>
    </Wrapper>
  );
};

export default DetailsView;
