import React, { useState } from 'react';

import FavoriteButton from 'components/base/FavoriteButton';
import PlaceholderImage from 'components/base/PlaceholderImage';
import {
  Star,
  StarFilled,
  HeartFilled,
  Heart,
  PlaceholderProfile,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';

import { ProductSellerRatingProps } from './ProductSellerCard.props';
import {
  Row,
  FlexShrinked,
  Bold,
  RatingRow,
  StarContainer,
  EndRow,
  AvatarContainer,
  AvatarPreview,
  AvatarPlaceholder,
  SellerCardContainer,
} from './ProductSellerCard.style';

const ProductSellerCard = (props: ProductSellerRatingProps): JSX.Element => {
  const {
    name,
    isSmallName,
    uri,
    location,
    rating,
    isFavorite,
    showFavoriteButton,
    onFavorite,
    onClickSeller,
  } = props;

  const [defaultImage, setDefaultImage] = useState(uri);
  return (
    <SellerCardContainer withBackground={props.withBackground}>
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
              <PlaceholderProfile width={56} height={56} />
            </AvatarPlaceholder>
          )}
        </AvatarContainer>

        <FlexShrinked onClick={() => onClickSeller()}>
          <Typography variant="overlineSmall" weight="900" color="shade6">
            {location}
          </Typography>
          <Typography variant="body" weight="bold" color="shade9">
            {name}
          </Typography>
          <RatingRow>
            <Typography
              className="rating-value"
              variant="caption"
              weight="normal"
              color="shade9"
            >
              {rating || 0}
            </Typography>
            {[...Array(5).keys()].map((r) => (
              <StarContainer key={r} location={location}>
                {Number(rating) > r ? <StarFilled /> : <Star />}
              </StarContainer>
            ))}
          </RatingRow>
        </FlexShrinked>
        <EndRow>
          {showFavoriteButton && (
            <FavoriteButton isFavorite={isFavorite} onClick={onFavorite} />
          )}
        </EndRow>
      </Row>
    </SellerCardContainer>
  );
};

export default React.memo(ProductSellerCard);
