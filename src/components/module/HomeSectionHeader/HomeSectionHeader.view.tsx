import React from 'react';

import Button from 'components/base/Button';
import { ArrowRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';

// import { useTheme } from 'utils/Theme';
import { HomeSectionHeaderProps } from './HomeSectionHeader.props';
import { Container } from './HomeSectionHeader.style';

const HomeSectionHeader = (props: HomeSectionHeaderProps): JSX.Element => {
  // const theme = useTheme();

  const { title, onClick } = props;

  return (
    <Container>
      <Typography variant="title5" color="shade8">
        {title}
      </Typography>
      <Button
        text="See All"
        variant="unselected"
        size="sm"
        icon={<ArrowRight fill="#E35D32" />}
        style={{ padding: '4px 8px' }}
        onClick={onClick}
      />
    </Container>
  );
};

export default React.memo(HomeSectionHeader);
