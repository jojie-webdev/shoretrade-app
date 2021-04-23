import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import {
  Expand,
  Location,
  StarFilled,
  Star,
  PlaceholderProfile,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Carousel from 'components/module/Carousel';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { base64ToFile } from 'utils/File';
import { useTheme } from 'utils/Theme';

import { ListingDetailsProps } from './ListingDetails.props';
import {
  Wrapper,
  DetailsCard,
  Tag,
  SellerPreview,
  SalesCard,
  OrderBoxCard,
  ActionsContainer,
  ActionContainer,
  NoProfilePic,
} from './ListingDetails.style';

const ListingDetailsView = (props: ListingDetailsProps) => {
  const theme = useTheme();
  const { listing, onRemove, onEdit, onCreate, isExisting, isPending } = props;

  const { productDetails, sales, orderDetails, carousel, boxDetails } = listing;

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (carousel.items) {
      Promise.all(
        carousel.items
          .filter((item) => !item.uri && item.data)
          .map((item) =>
            // ignore errors at this point since we already done the filter
            // @ts-ignore
            base64ToFile(item.data?.data, item.data?.name, item.data?.type)
          )
      ).then((imageFiles) => {
        const imageURLs = carousel.items
          .filter((item) => item.uri)
          .map((item) => item.uri || '');
        const convertedImageURLs = imageFiles.map(URL.createObjectURL);
        setImages([...imageURLs, ...convertedImageURLs]);
      });
    }
  }, [carousel.items]);

  const addSeperatorSpacing = useMediaQuery({
    query: '(min-width: 992px)',
  });

  return (
    <Wrapper>
      <Row nogutter className="wrapper">
        <Col sm={12} md={12} lg={5} xl={5}>
          <DetailsCard>
            <div style={{ width: '100%' }}>
              <Carousel
                id="product-carousel"
                images={images}
                loop
                arrowInside
                aspectRatio="9:4"
              />
            </div>
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
                {productDetails.vendor.uri ? (
                  <SellerPreview src={productDetails.vendor.uri} />
                ) : (
                  <NoProfilePic>
                    <PlaceholderProfile width={90} height={90} />
                  </NoProfilePic>
                )}
                <Typography color="shade9" weight="bold">
                  {productDetails.vendor.name}
                </Typography>

                <div className="ratings-container">
                  {[...Array(5).keys()].map((r) =>
                    Number(productDetails.vendor.rating || 0) > r ? (
                      <StarFilled fill={theme.brand.alert} />
                    ) : (
                      <Star />
                    )
                  )}
                </div>
              </div>
            </div>
          </DetailsCard>
        </Col>
        <Col
          sm={12}
          md={12}
          lg={7}
          xl={7}
          style={{ paddingLeft: addSeperatorSpacing ? 32 : 0 }}
        >
          <SalesCard>
            <Typography variant="overline" color="shade9">
              SALES
            </Typography>
            <Typography variant="title5" color="shade9" weight="bold">
              {sales.sales}
            </Typography>
            <Typography color="shade6">
              {`${orderDetails.remaining} / ${sales.totalWeight}${sales.unit}`}
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
                  {orderDetails.minOrder}
                  {orderDetails.unit}
                </Typography>
              </div>
              <div className="order-details-item">
                <Typography color="shade6" weight="bold">
                  Remaining
                </Typography>
                <Typography color="shade9" weight="bold">
                  {orderDetails.remaining}
                  {orderDetails.unit}
                </Typography>
              </div>
            </div>
            <div className="separator" />
            <Typography variant="overline" color="shade9">
              BOX DETAILS
            </Typography>
            <div className="box-details-row">
              <Typography color="shade6" weight="bold">
                {boxDetails.unit} per Box
              </Typography>
              <Typography color="shade6" weight="bold">
                Number of Boxes
              </Typography>
              <Typography color="shade6" weight="bold">
                Subtotal
              </Typography>
              <Typography color="shade6" weight="bold">
                Count per Box
              </Typography>
            </div>
            {boxDetails.boxes &&
              boxDetails.boxes?.map((b) => (
                <div key={b.id} className="box-details-row">
                  <Typography color="shade9" weight="bold">
                    {b.weight}
                    {boxDetails.unit}
                  </Typography>
                  <Typography color="shade9" weight="bold">
                    x {b.quantity}
                  </Typography>
                  <Typography color="shade9" weight="bold">
                    {b.quantity * b.weight}
                    {boxDetails.unit}
                  </Typography>
                  <Typography color="shade9" weight="bold">
                    {b.count}
                  </Typography>
                </div>
              ))}
          </OrderBoxCard>
          {onRemove && (
            <ActionsContainer>
              <Button text="Edit" variant="outline" onClick={onEdit} />
              <Button text="Remove" onClick={onRemove} />
            </ActionsContainer>
          )}

          {onCreate && (
            <ActionContainer>
              <Button
                text={isExisting ? 'Update' : 'Create Listing'}
                onClick={onCreate}
                loading={isPending}
              />
            </ActionContainer>
          )}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ListingDetailsView;
