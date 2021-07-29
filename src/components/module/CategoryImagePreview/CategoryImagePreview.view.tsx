import React from 'react';

import Badge from 'components/base/Badge';
import TypographyView from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { CategoryImagePreviewProps } from './CategoryImagePreview.props';
import {
  Container,
  BadgeContainer,
  MarketBoardBadge,
} from './CategoryImagePreview.style';

const CategoryImagePreview = (
  props: CategoryImagePreviewProps
): JSX.Element => {
  const theme = useTheme();
  const { imgSrc, categoryName, caption, marketBoard } = props;
  const isBuyer = theme.appType === 'buyer';
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container img={imgSrc ? parseImageUrl(imgSrc) : undefined}>
      {marketBoard && !isMobile && categoryName && (
        <MarketBoardBadge>
          <Badge badgeColor={theme.grey.shade3}>
            <TypographyView variant="overline">{categoryName}</TypographyView>
          </Badge>
        </MarketBoardBadge>
      )}
      <div className="imgContainer">
        <div className="img" />
        {!marketBoard && (
          <BadgeContainer>
            <Badge badgeColor={theme.grey.shade3}>
              <TypographyView variant="overline">{categoryName}</TypographyView>
            </Badge>
          </BadgeContainer>
        )}
      </div>
      <TypographyView
        className="label"
        variant="label"
        color={isBuyer ? 'shade9' : 'noshade'}
      >
        {caption}
      </TypographyView>
    </Container>
  );
};

export default React.memo(CategoryImagePreview);
