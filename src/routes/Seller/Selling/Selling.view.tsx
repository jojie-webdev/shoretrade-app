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
    <ItemCard onClick={props.onClick} nogutter>
      <ItemImage src={props.data.images[0]} alt="" />

      <div className="content">
        <Typography variant="title5" color="noshade" className="item-title">
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

        <ItemDetail variant="caption" color="shade6">
          Size: <span>{props.size}</span>
        </ItemDetail>

        <ItemDetail variant="caption" color="shade6">
          Listed on: <span>{props.listedOn && formattedListedOn()}</span>
        </ItemDetail>

        <ItemDetail variant="caption" color="shade6">
          Expires in: <span>{props.expiresIn && formattedExpiresIn()}</span>
        </ItemDetail>

        <ItemDetail variant="caption" color="shade6">
          Remaining:{' '}
          <span>
            {props.remaining} {props.unit}
          </span>
        </ItemDetail>
      </div>

      <div className="pricing">
        <Typography variant="title5" weight="900" color="noshade">
          ${props.price}
        </Typography>
        <Typography color="shade6" variant="caption">
          per {props.unit}
        </Typography>
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
