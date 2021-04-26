import React from 'react';

// import { useTheme } from 'utils/Theme';

import Button from 'components/base/Button';
import { Crab, Pen, TrashCan, Fish2, ArrowRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyState from 'components/module/EmptyState';
import LoadingView from 'components/module/Loading';
import Search from 'components/module/Search';
import { SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { SellingGeneratedProps, ItemProp } from './Selling.props';
import {
  ItemImage,
  ItemCard,
  ItemDetail,
  Tag,
  Container,
  StyledTouchable,
  StyledAlert,
  NoSellingContainer,
  SVGContainer,
} from './Selling.style';
import { listingToItem } from './Selling.transform';

const Item = (props: ItemProp) => {
  const formattedExpiresIn = () => moment().to(props.expiresIn);
  const theme = useTheme();

  const flatMap = (array: [], fn: any) => {
    let result: any[] = [];
    array.forEach((element) => {
      const mapping = fn(element);
      result = result.concat(mapping);
    });
    return result;
  };

  const renderSize = (size: any) => {
    size = flatMap(size.split('-'), function (part: any) {
      return [part, <ArrowRight fill={theme.grey.shade7} />];
    });
    size.pop();
    return size;
  };

  return (
    <ItemCard>
      <div className="wrapper" onClick={props.onClick}>
        <div className="left-content">
          <ItemImage src={props.data.images[0]} alt="" />

          <div className="text-content">
            <Typography variant="label" color="noshade" className="item-title">
              {props.title}
            </Typography>

            <div className="tags-container">
              {props.tags &&
                props.tags.length !== 0 &&
                props.tags.map((tag) => (
                  <Tag key={tag.label}>
                    <Typography variant="caption" color="noshade">
                      {tag.label}
                    </Typography>
                  </Tag>
                ))}
            </div>

            <ItemDetail variant="caption" color="shade6" row>
              Size:{' '}
              <span>
                {props.size?.includes('-') ? (
                  <>{renderSize(props.size)}</>
                ) : (
                  props.size
                )}
              </span>
            </ItemDetail>
          </div>
        </div>

        <div className="right-content">
          <div className="item-data">
            <ItemDetail variant="caption" color="shade6">
              Remaining Stock:{' '}
              <span>
                {Number(props.remaining).toFixed(0)} /{' '}
                {Number(props.originalWeight).toFixed(0)}{' '}
                {props.unit?.toLowerCase()}
              </span>
            </ItemDetail>

            <ItemDetail variant="caption" color="shade6">
              Price:{' '}
              <span>
                ${props.price} per {formatUnitToPricePerUnit(props.unit)}
              </span>
            </ItemDetail>

            <ItemDetail variant="caption" color="shade6">
              Sold: <span>{props.sales}</span>
            </ItemDetail>

            <ItemDetail variant="caption" color="shade6">
              Time left: <span>{props.expiresIn && formattedExpiresIn()}</span>
            </ItemDetail>
          </div>
        </div>
      </div>

      <div className="buttons">
        <StyledTouchable onPress={props.onClickEdit} dark>
          <Pen height={20} width={20}></Pen>
        </StyledTouchable>

        <StyledTouchable onPress={props.onRemove} dark>
          <TrashCan height={18} width={20}></TrashCan>
        </StyledTouchable>
      </div>
    </ItemCard>
  );
};

const NoSelling = () => {
  const history = useHistory();
  const theme = useTheme();
  return (
    <NoSellingContainer>
      <div className="parent-details">
        <Typography className="title-text" variant="title4" color="noshade">
          You have no selling products
        </Typography>
        <div className="details-container">
          <div className="circle" />
          <div className="text-container">
            <Typography variant="copy" weight="bold" color="noshade">
              Add your Product to the Market
            </Typography>
            <Typography variant="copy" weight="regular" color="shade6">
              Let your products be reached by 10.000+ ShoreTrade users. Start
              adding a Product.
            </Typography>
          </div>
        </div>
        <div className="details-container">
          <div className="circle" />
          <div className="text-container">
            <Typography variant="copy" weight="bold" color="noshade">
              Customize your Selling
            </Typography>
            <Typography variant="copy" weight="regular" color="shade6">
              Select Specifications, Size, Price and sell your Product to the
              Market
            </Typography>
          </div>
        </div>
        <div className="details-container">
          <div className="circle" />
          <div className="text-container">
            <Typography variant="copy" weight="bold" color="noshade">
              Manage Buyer Requests
            </Typography>
            <Typography variant="copy" weight="regular" color="shade6">
              Check, Manage and Negotiate Requests from buyers, and prepare your
              product to be delivered
            </Typography>
          </div>
        </div>
        <Button
          className="add-product-btn"
          text="Add Product"
          onClick={() => history.push(SELLER_ROUTES.ADD_PRODUCT)}
        />
      </div>
      <SVGContainer circleColor={theme.grey.shade9}>
        <Fish2 height={311} width={311} fill={theme.grey.shade6} />
      </SVGContainer>
    </NoSellingContainer>
  );
};

const SellingView = (props: SellingGeneratedProps) => {
  // const theme = useTheme();
  const history = useHistory();
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const {
    listings,
    pending,
    goToListingDetails,
    onClickRemoveListing,
    showDeletedSuccess,
    onClickEdit,
    showModal,
    onRemove,
    clearListingData,
    search,
    onChangeSearch,
    resetSearch,
    staticListings,
  } = props;

  if (pending) {
    return <LoadingView></LoadingView>;
  }

  return (
    <>
      <Container>
        {showDeletedSuccess && (
          <StyledAlert
            variant="success"
            content="Your listing has successfully been removed"
          />
        )}
        {staticListings.length > 0 && (
          <Row className="search-row">
            <Col>
              <Search
                value={search}
                resetValue={resetSearch}
                onChange={(e) => onChangeSearch(e.target.value)}
                placeholder="e.g. Ocean Trout"
              />
            </Col>
          </Row>
        )}

        <Row className="row" justify="center">
          <Col>
            {listings.length === 0 && !search ? (
              isSmallScreen ? (
                <EmptyState
                  textAlign="center"
                  title="The are no listings here at the moment"
                  buttonText="Add a product"
                  Svg={Crab}
                  onButtonClicked={() =>
                    history.push(SELLER_ROUTES.ADD_PRODUCT)
                  }
                  fluid
                />
              ) : (
                <NoSelling />
              )
            ) : (
              listings.map((listing) => (
                <Item
                  key={listing.id}
                  {...listingToItem(listing)}
                  onClick={() => goToListingDetails(listing.id)}
                  onClickEdit={() => onClickEdit(listing.id)}
                  onRemove={() =>
                    onClickRemoveListing(listing.id, listing.coopId)
                  }
                />
              ))
            )}
          </Col>
        </Row>
      </Container>

      <ConfirmationModal
        title="Delete Listing"
        description="Are you sure you want to remove the listing? This cannot be undone."
        isOpen={showModal}
        onClickClose={clearListingData}
        action={onRemove}
        actionText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default SellingView;
