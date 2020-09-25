import React from 'react';

import { Expand, Location, StarFilled, Star } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import Carousel from 'components/module/Carousel';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { API } from 'consts';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { ListingDetailsProps } from './ListingDetails.props';
import {
  Wrapper,
  DetailsCard,
  Tag,
  SellerPreview,
  SalesCard,
  OrderBoxCard,
} from './ListingDetails.style';

const ListingDetailsView = (props: ListingDetailsProps) => {
  const theme = useTheme();
  const { listing } = props;

  const { productDetails, sales, orderDetails, carousel } = listing;
  const images = carousel.items.map((i) => i.uri);
  return (
    <Wrapper>
      <Row nogutter style={{ width: '75%', paddingRight: '5%' }}>
        <Col sm={12} md={12} lg={7}>
          <DetailsCard>
            <Carousel
              id="product-carousel"
              images={images}
              height={'200px'}
              swiperWidth="75%"
            />
            <div className="details-container">
              <Typography variant="title5" color="shade9" weight="bold">
                {productDetails.title}
              </Typography>
              <div className="size-location-container">
                <div className="size-container">
                  <Expand width={16} height={16} fill={theme.grey.shade5} />
                  <Typography variant="label" color="shade9">
                    {productDetails.size}
                  </Typography>
                </div>
                <div className="location-container">
                  <Location width={16} height={16} fill={theme.grey.shade5} />
                  <Typography variant="label" color="shade9">
                    {productDetails.location}
                  </Typography>
                </div>
              </div>
              <div className="tags-container">
                {productDetails.tags.map(({ label }) => (
                  <Tag key={label}>
                    <Typography variant="caption" color="shade9" weight="bold">
                      {label}
                    </Typography>
                  </Tag>
                ))}
              </div>
              <div className="separator" />
              <div className="seller-container">
                <SellerPreview src={productDetails.vendor.uri} />
                <Typography color="shade9" weight="bold">
                  {productDetails.vendor.name}
                </Typography>

                <div className="ratings-container">
                  {[...Array(5).keys()].map((r) =>
                    Number(productDetails.vendor.rating || 0) > r ? (
                      <StarFilled />
                    ) : (
                      <Star />
                    )
                  )}
                </div>
              </div>
            </div>
          </DetailsCard>
        </Col>
        <Col sm={12} md={12} lg={5}>
          <SalesCard>
            <Typography variant="overline" color="shade9">
              SALES
            </Typography>
            <Typography variant="title5" color="shade9" weight="bold">
              {sales.sales}
            </Typography>
            <Typography color="shade6">
              {`${sales.soldWeight} / ${sales.totalWeight} ${sales.unit}`}
            </Typography>
          </SalesCard>
          <OrderBoxCard>
            <Typography variant="overline" color="shade9">
              ORDER
            </Typography>
            <div className="order-details-row">
              <div className="order-details-item">
                <Typography color="shade6" weight="bold">
                  Min. Order
                </Typography>
                <Typography color="shade9" weight="bold">
                  {orderDetails.minOrder} {orderDetails.unit}
                </Typography>
              </div>
              <div className="order-details-item">
                <Typography color="shade6" weight="bold">
                  Remaining
                </Typography>
                <Typography color="shade9" weight="bold">
                  {orderDetails.remaining} {orderDetails.unit}
                </Typography>
              </div>
            </div>
            <div className="separator" />
            <Typography variant="overline" color="shade9">
              BOX DETAILS
            </Typography>
            <div className="box-details-row">
              <Typography color="shade6" weight="bold">
                Box Weight
              </Typography>
              <Typography color="shade6" weight="bold">
                Quantity
              </Typography>
              <Typography color="shade6" weight="bold">
                Subtotal
              </Typography>
              <Typography color="shade6" weight="bold">
                Count per Box
              </Typography>
            </div>
          </OrderBoxCard>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ListingDetailsView;
