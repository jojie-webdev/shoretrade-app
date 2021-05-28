import React, { useEffect, useState } from 'react';

import Alert from 'components/base/Alert';
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
  Close,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Carousel from 'components/module/Carousel';
import { SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { isIOS } from 'react-device-detect';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { base64ToFile } from 'utils/File';
import { formatRunningDateDifference } from 'utils/MarketRequest';
import { useTheme } from 'utils/Theme';

import { ListingDetailsProps } from './ListingDetails.props';
import {
  Wrapper,
  DetailsCard,
  Tag,
  SellerPreview,
  SalesCard,
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
  ProductLabelMobileContainer,
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
    isCreatListingSuccess,
    clearListing,
  } = props;

  const { productDetails, sales, orderDetails, carousel, boxDetails } = listing;
  const formattedCatchDate = () =>
    moment(orderDetails.catchDate).format('DD MMMM YYYY');
  const [images, setImages] = useState<string[]>([]);
  const isIpad = useMediaQuery({ query: BREAKPOINTS['xl'] });
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

  const addSeparatorSpacing = useMediaQuery({
    query: '(min-width: 992px)',
  });
  if (isMobile) {
    let percent =
      (Number(orderDetails.remaining) / Number(sales.totalWeight)) * 100;
    if (percent >= 100) percent = 100;
    return (
      <MobileWrapper isIOS={isIOS}>
        <Row nogutter>
          <Carousel
            id="product-carousel"
            images={images}
            loop
            arrowInside
            variant={isMobile ? 'bullet' : 'thumbnail'}
            aspectRatio="9:4"
            showActionButton={isMobile}
          />
          {!isCreatListingSuccess && (
            <MobileSalesCard>
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
                  {`${orderDetails.remaining} / ${sales.totalWeight} ${sales.unit} Sold`}
                </Typography>
              </div>
              <div className="progress-container">
                <Progress percent={percent} />
              </div>
            </MobileSalesCard>
          )}

          <div className="product-details">
            <Typography
              variant="title5"
              color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
              weight="bold"
            >
              {productDetails.title}
            </Typography>
            <div className="tags-container">
              {productDetails.tags.map(({ label }) => (
                <Tag key={label}>
                  <Typography variant="caption" color={'shade9'} weight="bold">
                    {label}
                  </Typography>
                </Tag>
              ))}
            </div>
            <div className="size-location-container">
              <div className="size-container">
                <Expand width={16} height={16} fill={theme.grey.shade5} />
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

            <div className="label-container">
              <ProductLabelMobileContainer>
                <Typography
                  variant="title5"
                  color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                  weight="bold"
                >
                  ${orderDetails.price}
                </Typography>
                <div className="product-value">
                  <Typography
                    variant="caption"
                    color="shade6"
                    weight="bold"
                    className="product-title-desc"
                  >
                    per {orderDetails.unit}
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
              <ProductLabelMobileContainer>
                <Typography variant="label" color="shade6" weight="regular">
                  Listing Valid Until:
                </Typography>
                <div className="product-value">
                  <Typography
                    variant="label"
                    color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                    weight="bold"
                  >
                    {orderDetails.validUntil &&
                      formatRunningDateDifference(
                        orderDetails.validUntil.toUTCString()
                      )}
                  </Typography>
                </div>
              </ProductLabelMobileContainer>
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
                  Catch Date:
                </Typography>
                <div className="product-value">
                  <Typography
                    variant="label"
                    color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                    weight="bold"
                  >
                    {orderDetails.catchDate && formattedCatchDate()}
                  </Typography>
                </div>
              </ProductLabelMobileContainer>
            </div>
          </div>
        </Row>
      </MobileWrapper>
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

        {!isCreatListingSuccess && (
          <TopContainer>
            <div className="left-content">
              <div className="left-container">
                <div className="arrow-container">
                  <StyledTouchable onPress={() => history.goBack()}>
                    <ArrowLeft
                      fill={theme.brand.primary}
                      height={20}
                      width={20}
                    />
                  </StyledTouchable>
                </div>
                <div className="label-container">
                  <Typography variant="body" color="shade9" weight="bold">
                    This is a preview of your listed product
                  </Typography>
                  <Typography variant="label" color="shade6" weight="regular">
                    Buyers will check this page and eventually buy the product
                    from their buyer account.
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
                        <Pen
                          fill={theme.brand.primary}
                          height={20}
                          width={20}
                        />
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
        )}

        {props.sellingDetailsBreadCrumbs && (
          <div className="breadcrumbs-container">
            <Breadcrumbs sections={props.sellingDetailsBreadCrumbs} isLight />
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
                <Expand width={16} height={16} fill={theme.grey.shade5} />
                <Typography
                  variant="label"
                  color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                >
                  {productDetails.size}
                </Typography>
              </div>
            </div>
            <div className="tags-container">
              {productDetails.tags.map(({ label }) => (
                <Tag key={label}>
                  <Typography variant="caption" color={'shade9'} weight="bold">
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
                <Carousel
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
            style={{ paddingLeft: addSeparatorSpacing ? 32 : 0 }}
            className="card-container"
          >
            <SalesCard isCreatListingSuccess={isCreatListingSuccess}>
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
                <Typography
                  variant="title5"
                  color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                  weight="bold"
                >
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

              <ProductDetailsContainer
                isCreatListingSuccess={isCreatListingSuccess}
              >
                <ProductLabelContainer>
                  <Typography variant="overline" color="shade6" weight="bold">
                    Time Left
                  </Typography>
                  <div className="product-value">
                    <Typography
                      variant="label"
                      color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                      weight="bold"
                      className="product-desc"
                    >
                      {orderDetails.validUntil &&
                        formatRunningDateDifference(
                          orderDetails.validUntil.toUTCString()
                        )}
                    </Typography>
                  </div>
                </ProductLabelContainer>
                <div className="separator" />
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
                    Catch Date:
                  </Typography>
                  <div className="product-value">
                    <Typography
                      variant="label"
                      color={!isCreatListingSuccess ? 'shade9' : 'noshade'}
                      weight="bold"
                      className="product-desc"
                    >
                      {orderDetails.catchDate && formattedCatchDate()}
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
              </ProductDetailsContainer>
            </SalesCard>

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
