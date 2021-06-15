import React, { useState } from 'react';

import FavoriteButton from 'components/base/FavoriteButton';
import { Star, StarFilled, PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { ProductSellerProps } from './ProductSellerCard.props';
import {
  SellerCardContainer,
  Row,
  FlexShrinked,
  RatingRow,
  StarContainer,
  EndRow,
  AvatarContainer,
  AvatarPreview,
  AvatarPlaceholder,
} from './ProductSellerCard.style';

const ProductSellerCard = (props: ProductSellerProps): JSX.Element => {
  const theme = useTheme();
  const {
    name,
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
    <SellerCardContainer
      withBackground={props.withBackground}
      fullWidth={props.fullWidth}
    >
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

        <FlexShrinked
          onClick={() => onClickSeller && onClickSeller()}
          showCursor={!!onClickSeller}
        >
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
                {Number(rating) > r ? (
                  <StarFilled fill={theme.brand.alert} />
                ) : (
                  <Star />
                )}
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
