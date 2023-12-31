import React from 'react';

import Button from 'components/base/Button';
import { ArrowRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { HomeSectionHeaderProps } from './HomeSectionHeader.props';
import { Container } from './HomeSectionHeader.style';

const HomeSectionHeader = (props: HomeSectionHeaderProps): JSX.Element => {
  const theme = useTheme();
  const { title, onClick, noMargin } = props;

  return (
    <Container noMargin={noMargin}>
      <Typography
        altFont={theme.isSFM}
        variant="title5"
        color={theme.isSFM ? 'secondary' : 'shade8'}
      >
        {title}
      </Typography>

      {onClick && (
        <Button
          text="See All"
          variant="unselected"
          icon={<ArrowRight fill={theme.brand.primary} />}
          style={{ padding: '4px 8px' }}
          onClick={onClick}
        />
      )}
    </Container>
  );
};

export default React.memo(HomeSectionHeader);
