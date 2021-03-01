import React from 'react';

import Badge from 'components/base/Badge';
import TypographyView from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { CategoryImagePreviewProps } from './CategoryImagePreview.props';
import { Container, BadgeContainer } from './CategoryImagePreview.style';

const CategoryImagePreview = (
  props: CategoryImagePreviewProps
): JSX.Element => {
  const theme = useTheme();
  const { imgSrc, categoryName, caption } = props;
  const isBuyer = theme.appType === 'buyer';

  return (
    <Container img={imgSrc}>
      <div className="imgContainer">
        <div className="img" style={{ maxHeight: 280 }} />
        <BadgeContainer>
          <Badge badgeColor={theme.grey.shade3}>
            <TypographyView variant="overline">{categoryName}</TypographyView>
          </Badge>
        </BadgeContainer>
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
