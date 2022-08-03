import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import { FileCheck } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { API } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { DetailsProps } from './Details.props';
import {
  Container,
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
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

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
    toAddressState,
  } = details;

  const isDelivered = status === 'Delivered';

  const statusOptions = {
    'To Send': 'PLACED',
    'In Transit': 'TRANSIT',
    Delivered: 'DELIVERED',
    'N/A': '',
  };

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Sold', onClick: () => history.goBack() },
            { label: 'Order Details' },
          ]}
        />
      </div>
      <Header>
        <Typography color="noshade" variant={isMobile ? 'title5' : 'body'}>
          {status}
        </Typography>
        <div className="actions">
          <Touchable
            dark
            onPress={() => {
              window.open(
                `${API.PDF_URL || API.URL}/${API.VERSION}/${
                  theme.isSFM ? 'sfm-blue/' : ''
                }order/packing-list/${orderRefNumber}?token=${token}&status=${
                  statusOptions[status] || ''
                }&state=${toAddressState}`,
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
                Packing List
              </Typography>
            </ActionContainer>
          </Touchable>
          <Touchable
            dark
            onPress={() => {
              window.open(
                `${API.PDF_URL || API.URL}/${API.VERSION}/${
                  theme.isSFM ? 'sfm-blue/' : ''
                }order/invoice/${orderRefNumber}?token=${token}`,
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
          <Touchable
            dark
            onPress={() => {
              window.open(
                `${API.PDF_URL || API.URL}/${API.VERSION}/${
                  theme.isSFM ? 'sfm-blue/' : ''
                }order/order-summary/${orderRefNumber}?token=${token}&status=${
                  statusOptions[status] || ''
                }&state=${toAddressState}`,
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
                Order Summary
              </Typography>
            </ActionContainer>
          </Touchable>
          <Touchable
            dark
            onPress={() => {
              window.open(
                `${API.PDF_URL || API.URL}/${API.VERSION}/${
                  theme.isSFM ? 'sfm-blue/' : ''
                }order/pdf-label/${orderRefNumber}?token=${token}&status=${
                  statusOptions[status] || ''
                }&state=${toAddressState}`,
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
                Shipping Label
              </Typography>
            </ActionContainer>
          </Touchable>
        </div>
      </Header>
      <DetailsRow>
        <DetailsColumn>
          {!isDelivered && (
            <>
              <OrderDetail label="Shipping:" value={shippingDate} />
              <OrderDetail label="Estimated Delivery:" value={deliveryDate} />
            </>
          )}
          <OrderDetail label="Order Date:" value={orderDate} />
        </DetailsColumn>
        <DetailsColumn>
          <OrderDetail label="Ordered By:" value={orderedBy} />
          <OrderDetail label="Seller:" value={seller} />
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
        <Typography variant={isMobile ? 'title5' : 'body'} color="noshade">
          Packing List
        </Typography>
        {packingList.map((list) => (
          <ItemContainer key={list.name}>
            <ItemRow>
              <ItemImage src={parseImageUrl(list.imgSrc)} alt="" />
              <ItemColumn>
                <Typography
                  variant={isMobile ? 'caption' : 'label'}
                  color="noshade"
                  weight="400"
                >
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
                  <Typography
                    className="size-label"
                    color="shade6"
                    variant="small"
                    weight={isMobile ? '400' : '500'}
                  >
                    Size:
                  </Typography>
                  <Typography
                    color="noshade"
                    variant="small"
                    weight={isMobile ? '900' : '500'}
                  >
                    {list.size}
                  </Typography>
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
          variant="title5"
          weight="bold"
          color="noshade"
        >
          {total}
        </Typography>
      </Footer>
    </Container>
  );
};

export default DetailsView;
