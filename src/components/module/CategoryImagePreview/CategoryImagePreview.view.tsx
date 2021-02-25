import React from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import TypographyView from 'components/base/Typography';
import theme from 'utils/Theme';

import { CategoryImagePreviewProps } from './CategoryImagePreview.props';
import { Container, BadgeContainer } from './CategoryImagePreview.style';

const CategoryImagePreview = (
  props: CategoryImagePreviewProps
): JSX.Element => {
  const { imgSrc, categoryName, caption } = props;
  return (
    <Container img={imgSrc}>
      <div className="imgContainer">
        <div className="img" style={{ maxHeight: 280 }} />
        <BadgeContainer>
          <Badge
            className="badge"
            fontColor={theme.grey.shade9}
            badgeColor={theme.grey.shade3}
          >
            {categoryName}
          </Badge>
        </BadgeContainer>
      </div>
      <TypographyView className="caption" variant="caption">
        {caption}
      </TypographyView>
    </Container>
  );
};

export default React.memo(CategoryImagePreview);
