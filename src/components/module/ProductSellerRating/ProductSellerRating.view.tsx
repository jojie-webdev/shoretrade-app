import React, { useState } from 'react';

import PlaceholderImage from 'components/base/PlaceholderImage';
import {
  Star,
  StarFilled,
  HeartFilled,
  Heart,
  PlaceholderProfile,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';

import { ProductSellerRatingProps } from './ProductSellerRating.props';
import {
  Row,
  FlexShrinked,
  Bold,
  StarContainer,
  Favorite,
  AvatarContainer,
  AvatarPreview,
  AvatarPlaceholder,
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
    onClickSeller,
  } = props;

  const [defaultImage, setDefaultImage] = useState(uri);
  return (
    <Row>
      <AvatarContainer>
        {(defaultImage || '').length > 0 ? (
          <AvatarPreview
            src={defaultImage}
            alt={`${name}-image`}
            onError={() => {
              setDefaultImage('');
            }}
          />
        ) : (
          <AvatarPlaceholder>
            <PlaceholderProfile width={96} height={96} />
          </AvatarPlaceholder>
        )}

        <Favorite onClick={onFavorite}>
          {isFavorite ? (
            <HeartFilled width={22} height={22} />
          ) : (
            <Heart width={22} height={22} />
          )}
        </Favorite>
      </AvatarContainer>

      <FlexShrinked onClick={() => onClickSeller()}>
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
    </Row>
  );
};

export default React.memo(ProductSellerRating);
