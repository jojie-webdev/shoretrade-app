import React from 'react';

import PlaceholderImage from 'components/base/PlaceholderImage';
import { Star, StarFilled, HeartFilled, Heart, PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography';

import { ProductSellerRatingProps } from './ProductSellerRating.props';
import {
  Row,
  PreviewContainer,
  FlexShrinked,
  Bold,
  Preview,
  StarContainer,
  Favorite,
  NoProfilePic,
} from './ProductSellerRating.style';

const ProductSellerRating = (props: ProductSellerRatingProps): JSX.Element => {
  const {
    name,
    isSmallName,
    uri,
    location,
    rating,
    isFavorite,
    onFavorite,
  } = props;
  return (
    <Row>
      <PreviewContainer>
        <Row>
          {uri ? (
            <Preview src={uri} />
          ) : (
            <NoProfilePic>
              <PlaceholderProfile />
            </NoProfilePic>
          )}

          <FlexShrinked>
            {isSmallName ? (
              <Typography
                variant="title5"
                weight="bold"
                color="shade9"
                style={{ marginTop: 16, marginLeft: 8 }}
              >
                {name}
              </Typography>
            ) : (
              <Typography
                style={{ marginTop: 16, marginLeft: 8 }}
                variant="title5"
                weight="bold"
                color="shade9"
              >
                {name}
              </Typography>
            )}

            <Row style={{ marginLeft: 10 }}>
              {[...Array(5).keys()].map((r) => (
                <StarContainer key={r} location={location}>
                  {Number(rating) > r ? <StarFilled /> : <Star />}
                </StarContainer>
              ))}
            </Row>
          </FlexShrinked>
          {onFavorite && (
            <div style={{ float: 'right' }} onClick={onFavorite}>
              {isFavorite ? <HeartFilled /> : <Heart />}
            </div>
          )}
        </Row>
      </PreviewContainer>
    </Row>
  );
};

export default React.memo(ProductSellerRating);
