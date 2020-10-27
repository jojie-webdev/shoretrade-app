import React from 'react';

// import { useTheme } from 'utils/Theme';
import { Crab } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import { SELLER_ROUTES } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';

import { SellingGeneratedProps, ItemProp } from './Selling.props';
import {
  ItemImage,
  ItemCard,
  ItemDetail,
  Tag,
  Container,
} from './Selling.style';
import { listingToItem } from './Selling.transform';

const Item = (props: ItemProp) => {
  const formattedListedOn = () => moment(props.listedOn).format('DD MMMM YYYY');
  const formattedExpiresIn = () => moment().to(props.expiresIn);

  return (
    <ItemCard onClick={props.onClick}>
      <div className="left-content">
        <ItemImage src={props.data.images[0]} alt="" />

        <div className="text-content">
          <Typography variant="caption" color="noshade" className="item-title">
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
            Size: <span>{props.size}</span>
          </ItemDetail>
        </div>
      </div>

      <div className="item-data">
        <ItemDetail variant="caption" color="shade6">
          Remaining Stock:{' '}
          <span>
            {props.remaining} / {props.originalWeight}{' '}
            {props.unit?.toLowerCase()}
          </span>
        </ItemDetail>

        <ItemDetail variant="caption" color="shade6">
          Price:{' '}
          <span>
            ${props.price} per {props.unit}
          </span>
        </ItemDetail>

        <ItemDetail variant="caption" color="shade6">
          Sold: <span>{props.sales}</span>
        </ItemDetail>

        <ItemDetail variant="caption" color="shade6">
          Time left: <span>{props.expiresIn && formattedExpiresIn()}</span>
        </ItemDetail>
      </div>
    </ItemCard>
  );
};

const SellingView = (props: SellingGeneratedProps) => {
  // const theme = useTheme();
  const history = useHistory();
  const { listings, pending, goToListingDetails } = props;

  if (pending) {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Row className="row" justify="center">
        <Col>
          {listings.length === 0 ? (
            <EmptyState
              title="The are no listings here at the moment"
              buttonText="Add a product"
              Svg={Crab}
              onButtonClicked={() => history.push(SELLER_ROUTES.ADD_PRODUCT)}
            />
          ) : (
            listings.map((listing) => (
              <Item
                key={listing.id}
                {...listingToItem(listing)}
                onClick={() => goToListingDetails(listing.id)}
              />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SellingView;
