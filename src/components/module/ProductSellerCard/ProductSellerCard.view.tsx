import React, { useState } from 'react';

import FavoriteButton from 'components/base/FavoriteButton';
import StarRating from 'components/base/StarRating';
import { PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useMediaQuery } from 'react-responsive';

import { BREAKPOINTS } from './../../../consts/breakpoints';
import { ProductSellerProps } from './ProductSellerCard.props';
import {
  SellerCardContainer,
  Row,
  FlexShrinked,
  RatingRow,
  EndRow,
  AvatarContainer,
  AvatarPreview,
  AvatarPlaceholder,
} from './ProductSellerCard.style';

const ProductSellerCard = (props: ProductSellerProps): JSX.Element => {
  const {
    name,
    uri,
    location,
    rating,
    isFavorite,
    showFavoriteButton,
    onFavorite,
    onClickSeller,
    bottomComponent,
    isPendingAccount,
  } = props;

  const [defaultImage, setDefaultImage] = useState(uri);
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <SellerCardContainer
      withBackground={props.withBackground}
      fullWidth={props.fullWidth}
    >
      <Row>
        <AvatarContainer
          style={{
            marginTop: '4px',
            filter: `${isPendingAccount ? 'blur(4px)' : ''}`,
          }}
        >
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
          onClick={() => onClickSeller && !isPendingAccount && onClickSeller()}
          showCursor={!!onClickSeller}
          style={{ pointerEvents: isPendingAccount ? 'none' : 'auto' }}
        >
          <Typography variant="overlineSmall" weight="900" color="shade6">
            {location}
          </Typography>

          <div
            style={{
              marginTop: '4px',
              filter: `${isPendingAccount ? 'blur(4px)' : ''}`,
            }}
          >
            <Typography variant="body" weight="bold" color="shade9">
              {name}
            </Typography>
          </div>

          {/* <RatingRow>
            <Typography
              className="rating-value"
              variant="caption"
              weight="normal"
              color="shade9"
            >
              {isMobile ? '' : rating || 0}
            </Typography>
            <StarRating rating={Number(rating)} spacing={6} />
          </RatingRow> */}
        </FlexShrinked>
        <EndRow>
          {showFavoriteButton && (
            <FavoriteButton isFavorite={isFavorite} onClick={onFavorite} />
          )}
        </EndRow>
      </Row>
      {bottomComponent ? bottomComponent : ''}
    </SellerCardContainer>
  );
};

export default React.memo(ProductSellerCard);
