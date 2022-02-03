import React, { useEffect, useState } from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import StarRating from 'components/base/StarRating';
import {
  Expand,
  Location,
  PlaceholderProfile,
  Pen,
  TrashCan,
  Close,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import Carousel from 'components/module/Carousel';
import { SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { BadgeText } from 'routes/Buyer/ProductDetails/ProductDetails.style';
import { base64ToFile } from 'utils/File';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { capitalize } from 'utils/String';
import { useTheme } from 'utils/Theme';

import { ListingDetailsProps } from './ListingDetails.props';
import {
  Wrapper,
  CarouselContainer,
  SellerPreview,
  SalesCard,
  SalesDetailsCard,
  ActionContainer,
  NoProfilePic,
  TopContainer,
  StyledTouchable,
  TopDetailsContainer,
  ProductDetailsContainer,
  ProductLabelContainer,
  MobileWrapper,
  MobileSalesCard,
  Progress,
  ListingCard,
  ProductLabelMobileContainer,
} from './ListingDetails.style';

const Actions = (props: ListingDetailsProps) => {
  const theme = useTheme();
  const { onRemove, onEdit } = props;

  return (
    <TopContainer>
      <div className="left-content">
        <div className="left-container">
          <div className="left-text-container">
            <Typography variant="body" color="shade9" weight="bold">
              This is the view that Buyers will have of your product listing
            </Typography>
            <Typography variant="label" color="shade6" weight="regular">
              Any changes made to your listing will be instantly reflected to
              Buyers
            </Typography>
          </div>
        </div>

        {onEdit && onRemove && (
          <div className="end-left-content">
            <div className="pen-container">
              <StyledTouchable onPress={() => onEdit()}>
                <Pen fill={theme.brand.primary} height={20} width={20} />
              </StyledTouchable>
            </div>

            <div className="trash-container">
              <StyledTouchable onPress={() => onRemove()}>
                <TrashCan fill={theme.brand.primary} height={20} width={20} />
              </StyledTouchable>
            </div>
          </div>
        )}
      </div>
    </TopContainer>
  );
};

const ListingDetailsView = (props: ListingDetailsProps) => {
  const theme = useTheme();
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const addSeparatorSpacing = useMediaQuery({
    query: '(min-width: 992px)',
  });

  const {
    listing,
    onRemove,
    onEdit,
    onCreate,
    isExisting,
    isPending,
    sellingDetailsBreadCrumbs,
    isCreatListingSuccess,
    clearListing,
  } = props;

  const [images, setImages] = useState<string[]>([]);

  const { productDetails, sales, orderDetails, carousel } = listing;

  const formattedCatchDate = () =>
    orderDetails.catchDate
      ? moment(orderDetails.catchDate).format('DD MMMM YYYY')
      : '';

  let percent = (Number(sales.soldWeight) / Number(sales.totalWeight)) * 100;
  if (percent >= 100) percent = 100;

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

  if (isMobile) {
    return (
      <>
        <Carousel
          id="product-carousel"
          images={images}
          loop
          arrowInside
          variant={isMobile ? 'bullet' : 'thumbnail'}
          aspectRatio="9:4"
          showActionButton={isMobile}
        />
        <MobileWrapper>
          <Row nogutter>
            {/* {!isCreatListingSuccess && <Actions {...props} />} */}

            {!isCreatListingSuccess && (
              <MobileSalesCard isCreatListingSuccess={isCreatListingSuccess}>
                <div className="sales-container">
                  <Typography variant="title4" color="shade6" weight="regular">
                    Sales:
                  </Typography>

                  <Typography
                    variant="title4"
                    color="shade9"
                    weight="bold"
                    className="per-label"
                  >
                    {sales.sales}
                  </Typography>
                </div>
                <div className="sold-container">
                  <Typography variant="body" color="shade9">
                    {`${sales.soldWeight} / ${sales.totalWeight} ${sales.unit} Sold`}
                  </Typography>
                </div>
                <div className="progress-container">
                  <Progress percent={percent} />
                </div>
              </MobileSalesCard>
            )}

            <div className="product-details">
              <ListingCard isCreatListingSuccess={isCreatListingSuccess}>
                <Typography
                  variant="title5"
                  color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                  weight="bold"
                >
                  {productDetails.title}
                </Typography>
                <div className="tags-container">
                  {productDetails.tags.map(({ label, type }) => (
                    <Badge
                      key={label}
                      fontColor={
                        type === 'blue' ? theme.grey.noshade : theme.grey.shade9
                      }
                      badgeColor={
                        type === 'blue' ? theme.brand.info : theme.grey.shade3
                      }
                    >
                      <BadgeText
                        variant="caption"
                        weight="bold"
                        color={type === 'blue' ? 'noshade' : 'shade9'}
                      >
                        {label}
                      </BadgeText>
                    </Badge>
                  ))}
                </div>
                <div className="size-location-container">
                  <div className="size-container">
                    <Expand width={18} height={18} fill={theme.grey.shade5} />
                    <Typography
                      variant="label"
                      color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                    >
                      {productDetails.size}
                    </Typography>
                  </div>
                  <div className="location-container">
                    <Location width={16} height={16} fill={theme.grey.shade5} />
                    <Typography
                      variant="label"
                      color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                    >
                      {productDetails.location}
                    </Typography>
                  </div>
                </div>
              </ListingCard>
              <ListingCard isCreatListingSuccess={isCreatListingSuccess}>
                <div className="label-container">
                  <ProductLabelMobileContainer>
                    <Typography
                      variant="title5"
                      color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                      weight="900"
                    >
                      ${orderDetails.price}
                    </Typography>
                    <div className="product-value">
                      <Typography variant="caption" color="shade6">
                        per {formatUnitToPricePerUnit(sales.unit)}
                      </Typography>
                    </div>
                  </ProductLabelMobileContainer>
                  <ProductLabelMobileContainer>
                    <Typography variant="label" color="shade6" weight="regular">
                      Min Order:
                    </Typography>
                    <div className="product-value">
                      <Typography
                        variant="label"
                        color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                        weight="bold"
                      >
                        {orderDetails.minOrder} {orderDetails.unit}
                      </Typography>
                    </div>
                  </ProductLabelMobileContainer>
                  {orderDetails.templateDeliveryDate && (
                    <ProductLabelMobileContainer>
                      <Typography
                        variant="label"
                        color="shade6"
                        weight="regular"
                      >
                        Est. Collection:
                      </Typography>
                      <div className="product-value">
                        <Typography
                          variant="label"
                          color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                          weight="bold"
                        >
                          {orderDetails.templateDeliveryDate}
                        </Typography>
                      </div>
                    </ProductLabelMobileContainer>
                  )}
                  <ProductLabelMobileContainer>
                    <Typography variant="label" color="shade6" weight="regular">
                      Average Box Size:
                    </Typography>
                    <div className="product-value">
                      <Typography
                        variant="label"
                        color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                        weight="bold"
                      >
                        {productDetails.avgBoxSize} {orderDetails.unit}
                      </Typography>
                    </div>
                  </ProductLabelMobileContainer>

                  {orderDetails.validUntil && (
                    <ProductLabelMobileContainer>
                      <Typography
                        variant="label"
                        color="shade6"
                        weight="regular"
                      >
                        Listing Valid Until:
                      </Typography>
                      <div className="product-value">
                        <Typography
                          variant="label"
                          color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                          weight="bold"
                        >
                          {moment().to(orderDetails.validUntil)}
                        </Typography>
                      </div>
                    </ProductLabelMobileContainer>
                  )}

                  <ProductLabelMobileContainer>
                    <Typography variant="label" color="shade6" weight="regular">
                      Remaining:
                    </Typography>
                    <div className="product-value">
                      <Typography
                        variant="label"
                        color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                        weight="bold"
                      >
                        {orderDetails.remaining} {orderDetails.unit}
                      </Typography>
                    </div>
                  </ProductLabelMobileContainer>
                  <ProductLabelMobileContainer>
                    <Typography variant="label" color="shade6" weight="regular">
                      {orderDetails.catchRecurrence
                        ? 'Catch Frequency:'
                        : 'Catch Date:'}
                    </Typography>
                    <div className="product-value">
                      <Typography
                        variant="label"
                        color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                        weight="bold"
                      >
                        {orderDetails.catchRecurrence
                          ? capitalize(orderDetails.catchRecurrence)
                          : formattedCatchDate()}
                      </Typography>
                    </div>
                  </ProductLabelMobileContainer>
                </div>
              </ListingCard>
            </div>
          </Row>
        </MobileWrapper>

        <MobileFooter>
          {onRemove && onEdit && (
            <>
              <Button
                variant="outline"
                takeFullWidth
                text="Edit"
                onClick={() => onEdit()}
              />

              <Button
                takeFullWidth
                style={{ marginLeft: 8 }}
                text="Remove"
                onClick={() => onRemove()}
              />
            </>
          )}

          {onCreate && !isCreatListingSuccess && (
            <Button
              takeFullWidth
              text={isExisting ? 'Update' : 'Create Listing'}
              onClick={onCreate}
              loading={isPending}
            />
          )}
        </MobileFooter>
      </>
    );
  }

  return (
    <BoxContainer isPreview isCreatListingSuccess={isCreatListingSuccess}>
      <Wrapper isCreatListingSuccess={isCreatListingSuccess}>
        {isCreatListingSuccess && (
          <Alert
            fullWidth
            content="Clients will now start to see your listed product. You can manage clients orders in Buyer Request."
            header="Product successfully added to Selling"
            variant="success"
            iconRight={
              <Close height={12} width={12} fill={theme.grey.shade7} />
            }
          />
        )}

        {!isCreatListingSuccess && <Actions {...props} />}

        {sellingDetailsBreadCrumbs && (
          <div className="breadcrumbs-container">
            <Breadcrumbs sections={sellingDetailsBreadCrumbs} isLight />
          </div>
        )}

        <TopDetailsContainer>
          <div style={{ width: '100%' }}>
            {isCreatListingSuccess && (
              <div className="success-listing-creation-container">
                <Typography
                  variant="overline"
                  weight="900"
                  color={'shade6'}
                  className="product-listed-desc"
                >
                  Your product listed
                </Typography>

                <Touchable
                  onPress={() => {
                    clearListing && clearListing();
                    history.push(SELLER_ROUTES.SELLING);
                  }}
                >
                  <Typography variant="body" weight="500" color={'primary'}>
                    Go to Selling
                  </Typography>
                </Touchable>
              </div>
            )}

            <Typography
              variant="title4"
              weight="500"
              color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
            >
              {productDetails.title}
            </Typography>
            <div className="size-location-container">
              <div className="location-container">
                <Location width={16} height={16} fill={theme.grey.shade5} />
                <Typography
                  variant="label"
                  color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                >
                  {productDetails.location}
                </Typography>
              </div>
              <div className="size-container">
                <Expand width={18} height={18} fill={theme.grey.shade5} />
                <Typography
                  variant="label"
                  color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                >
                  {productDetails.size}
                </Typography>
              </div>
            </div>
            <div className="tags-container">
              {productDetails.tags.map(({ label, type }) => (
                <Badge
                  key={label}
                  fontColor={
                    type === 'blue' ? theme.grey.noshade : theme.grey.shade9
                  }
                  badgeColor={
                    type === 'blue' ? theme.brand.info : theme.grey.shade3
                  }
                >
                  <BadgeText
                    variant="caption"
                    weight="bold"
                    color={type === 'blue' ? 'noshade' : 'shade9'}
                  >
                    {label}
                  </BadgeText>
                </Badge>
              ))}
            </div>
          </div>
        </TopDetailsContainer>
        <Row nogutter className="wrapper">
          <Col xs={12} sm={12} md={12} lg={10} xl={5}>
            <CarouselContainer>
              <Carousel
                id="product-carousel"
                images={images}
                loop
                arrowInside
                variant={isMobile ? 'bullet' : 'thumbnail'}
                aspectRatio="9:4"
                showActionButton={isMobile}
              />
            </CarouselContainer>
          </Col>
          <Col
            sm={12}
            md={12}
            lg={8}
            xl={7}
            style={{ paddingLeft: addSeparatorSpacing ? 32 : 0 }}
            className="card-container"
          >
            {!isCreatListingSuccess && (
              <SalesCard>
                <div className="sales-container">
                  <Typography variant="title5" color="shade6" weight="regular">
                    Sales:
                  </Typography>

                  <Typography
                    variant="title5"
                    color="shade9"
                    weight="900"
                    className="per-label"
                  >
                    {sales.sales}
                  </Typography>
                </div>
                <div className="sold-container">
                  <Typography variant="label" color="shade9" weight="bold">
                    {`${sales.soldWeight} / ${sales.totalWeight} ${sales.unit} Sold`}
                  </Typography>
                </div>

                <div className="progress-container">
                  <Progress percent={percent} />
                </div>
              </SalesCard>
            )}

            <SalesDetailsCard isCreatListingSuccess={isCreatListingSuccess}>
              <div className="seller-details-container">
                {productDetails.vendor.uri ? (
                  <SellerPreview src={productDetails.vendor.uri} />
                ) : (
                  <NoProfilePic>
                    <PlaceholderProfile width={90} height={90} />
                  </NoProfilePic>
                )}
                <div className="seller-container">
                  <Typography
                    color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                    weight="bold"
                  >
                    {productDetails.vendor.name}
                  </Typography>
                  <div>
                    <StarRating
                      rating={productDetails.vendor.rating || 0}
                      style={{ marginTop: '5px' }}
                    />
                  </div>
                </div>
              </div>
              <div className="price-container">
                <Typography
                  variant="title5"
                  color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                  weight="900"
                >
                  ${orderDetails.price}
                </Typography>

                <Typography
                  variant="caption"
                  color="shade6"
                  className="per-label"
                >
                  per {formatUnitToPricePerUnit(sales.unit)}
                </Typography>
              </div>

              <ProductDetailsContainer
                isCreatListingSuccess={isCreatListingSuccess}
              >
                {orderDetails.validUntil && (
                  <>
                    <ProductLabelContainer>
                      <Typography
                        variant="overline"
                        color="shade6"
                        weight="bold"
                      >
                        Time Left
                      </Typography>
                      <div className="product-value">
                        <Typography
                          variant="label"
                          color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                          weight="bold"
                          className="product-desc"
                        >
                          {orderDetails.validUntil}
                        </Typography>
                      </div>
                    </ProductLabelContainer>
                    <div className="separator" />
                  </>
                )}

                <ProductLabelContainer>
                  <Typography variant="overline" color="shade6" weight="bold">
                    Average Box Size:
                  </Typography>
                  <div className="product-value">
                    <Typography
                      variant="label"
                      color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                      weight="bold"
                      className="product-desc"
                    >
                      {productDetails.avgBoxSize} {orderDetails.unit}
                    </Typography>
                  </div>
                </ProductLabelContainer>
                <div className="separator" />
                <ProductLabelContainer>
                  <Typography variant="overline" color="shade6" weight="bold">
                    {orderDetails.catchRecurrence
                      ? 'Catch Frequency:'
                      : 'Catch Date:'}
                  </Typography>
                  <div className="product-value">
                    <Typography
                      variant="label"
                      color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                      weight="bold"
                      className="product-desc"
                    >
                      {orderDetails.catchRecurrence
                        ? capitalize(orderDetails.catchRecurrence)
                        : formattedCatchDate()}
                    </Typography>
                  </div>
                </ProductLabelContainer>
                <div className="separator" />
                <ProductLabelContainer>
                  <Typography variant="overline" color="shade6" weight="bold">
                    Minimum Order:
                  </Typography>
                  <div className="product-value">
                    <Typography
                      variant="label"
                      color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                      weight="bold"
                      className="product-desc"
                    >
                      {orderDetails.minOrder} {orderDetails.unit}
                    </Typography>
                  </div>
                </ProductLabelContainer>
                {orderDetails.templateDeliveryDate && (
                  <>
                    <div className="separator" />
                    <ProductLabelContainer>
                      <Typography
                        variant="overline"
                        color="shade6"
                        weight="bold"
                      >
                        Estimated Shipping:
                      </Typography>
                      <div className="product-value">
                        <Typography
                          variant="label"
                          color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                          weight="bold"
                          className="product-desc"
                        >
                          {orderDetails.templateDeliveryDate}
                        </Typography>
                      </div>
                    </ProductLabelContainer>
                  </>
                )}
              </ProductDetailsContainer>
            </SalesDetailsCard>

            {onCreate && !isCreatListingSuccess && (
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
    </BoxContainer>
  );
};

export default ListingDetailsView;
