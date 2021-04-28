import React, { useEffect, useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import {
  Expand,
  Location,
  StarFilled,
  Star,
  PlaceholderProfile,
  ArrowLeft,
  Pen,
  TrashCan,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Carousel from 'components/module/Carousel';
import CarouselV2 from 'components/module/CarouselV2';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
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
  TopContainer,
  StyledTouchable,
  TopDetailsContainer,
  ProductDetailsContainer,
  ProductLabelContainer,
} from './ListingDetails.style';

const ListingDetailsView = (props: ListingDetailsProps) => {
  const theme = useTheme();
  const {
    listing,
    onRemove,
    onEdit,
    onCreate,
    isExisting,
    isPending,
    sellingDetailsBreadCrumbs,
  } = props;

  const { productDetails, sales, orderDetails, carousel, boxDetails } = listing;
  const formattedValidUntil = () => moment().to(orderDetails.validUntil);
  const formattedCatchDate = () =>
    moment(orderDetails.catchDate).format('DD MMMM YYYY');
  const [images, setImages] = useState<string[]>([]);
  const isIpad = useMediaQuery({ query: BREAKPOINTS['ipadPro'] });
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const history = useHistory();

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
      <TopContainer>
        <div className="left-content">
          <div className="left-container">
            <div className="arrow-container">
              <StyledTouchable onPress={() => history.goBack()}>
                <ArrowLeft fill={theme.brand.primary} height={20} width={20} />
              </StyledTouchable>
            </div>
            <div className="label-container">
              <Typography variant="body" color="shade9" weight="bold">
                This is a preview of your listed product
              </Typography>
              <Typography variant="label" color="shade6" weight="regular">
                Buyers will check this page and eventually buy the product from
                their buyer account.
              </Typography>
            </div>
          </div>

          {!isIpad && (
            <>
              <div className="end-left-content">
                <div className="pen-container">
                  <StyledTouchable
                    onPress={() => onRemove && onEdit && onEdit()}
                  >
                    <Pen fill={theme.brand.primary} height={20} width={20} />
                  </StyledTouchable>
                </div>

                <div className="trash-container">
                  <StyledTouchable onPress={() => onRemove && onRemove()}>
                    <TrashCan
                      fill={theme.brand.primary}
                      height={20}
                      width={20}
                    />
                  </StyledTouchable>
                </div>
              </div>
            </>
          )}
        </div>
      </TopContainer>
      {props.sellingDetailsBreadCrumbs && (
        <div className="breadcrumbs-container">
          <Breadcrumbs sections={props.sellingDetailsBreadCrumbs} isLight />
        </div>
      )}
      <TopDetailsContainer>
        <div>
          <Typography variant="title4" weight="500">
            {productDetails.title}
          </Typography>
          <div className="size-location-container">
            <div className="location-container">
              <Location width={16} height={16} fill={theme.grey.shade5} />
              <Typography variant="label" color="shade9">
                {productDetails.location}
              </Typography>
            </div>
            <div className="size-container">
              <Expand width={16} height={16} fill={theme.grey.shade5} />
              <Typography variant="label" color="shade9">
                {productDetails.size}
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
        </div>
      </TopDetailsContainer>
      <Row nogutter className="wrapper">
        <Col xs={12} sm={12} md={12} lg={10} xl={5}>
          <DetailsCard>
            <div style={{ width: '100%' }}>
              <CarouselV2
                id="product-carousel"
                images={images}
                loop
                arrowInside
                variant={isMobile ? 'bullet' : 'thumbnail'}
                aspectRatio="9:4"
                showActionButton={isMobile}
              />
            </div>
          </DetailsCard>
        </Col>
        <Col
          sm={12}
          md={12}
          lg={8}
          xl={7}
          style={{ paddingLeft: addSeperatorSpacing ? 32 : 0 }}
          className="card-container"
        >
          <SalesCard>
            <div className="seller-details-container">
              {productDetails.vendor.uri ? (
                <SellerPreview src={productDetails.vendor.uri} />
              ) : (
                <NoProfilePic>
                  <PlaceholderProfile width={90} height={90} />
                </NoProfilePic>
              )}
              <div className="seller-container">
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
            <div className="price-container">
              <Typography variant="title5" color="shade9" weight="bold">
                ${orderDetails.price}
              </Typography>

              <Typography
                variant="caption"
                color="shade6"
                weight="regular"
                className="per-label"
              >
                per {sales.unit}
              </Typography>
            </div>

            <ProductDetailsContainer>
              <ProductLabelContainer>
                <Typography variant="overline" color="shade6" weight="bold">
                  Time Left
                </Typography>
                <div className="product-value">
                  <Typography
                    variant="label"
                    color="shade9"
                    weight="bold"
                    className="product-desc"
                  >
                    {orderDetails.validUntil && formattedValidUntil()}
                  </Typography>
                </div>
              </ProductLabelContainer>
              <div className="seperator" />
              <ProductLabelContainer>
                <Typography variant="overline" color="shade6" weight="bold">
                  Average Box Size:
                </Typography>
                <div className="product-value">
                  <Typography
                    variant="label"
                    color="shade9"
                    weight="bold"
                    className="product-desc"
                  >
                    {productDetails.avgBoxSize} {orderDetails.unit}
                  </Typography>
                </div>
              </ProductLabelContainer>
              <div className="seperator" />
              <ProductLabelContainer>
                <Typography variant="overline" color="shade6" weight="bold">
                  Catch Date:
                </Typography>
                <div className="product-value">
                  <Typography
                    variant="label"
                    color="shade9"
                    weight="bold"
                    className="product-desc"
                  >
                    {orderDetails.catchDate && formattedCatchDate()}
                  </Typography>
                </div>
              </ProductLabelContainer>
              <div className="seperator" />
              <ProductLabelContainer>
                <Typography variant="overline" color="shade6" weight="bold">
                  Minimum Order:
                </Typography>
                <div className="product-value">
                  <Typography
                    variant="label"
                    color="shade9"
                    weight="bold"
                    className="product-desc"
                  >
                    {orderDetails.minOrder} {orderDetails.unit}
                  </Typography>
                </div>
              </ProductLabelContainer>
            </ProductDetailsContainer>
          </SalesCard>

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
