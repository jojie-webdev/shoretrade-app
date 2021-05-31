import React from 'react';

import Button from 'components/base/Button';
import { ArrowRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import useHomeOld from 'utils/Hooks/useHomeOld';

import { HomeSectionHeaderProps } from './HomeSectionHeader.props';
import { Container } from './HomeSectionHeader.style';

const HomeSectionHeader = (props: HomeSectionHeaderProps): JSX.Element => {
  const { title, onClick, noMargin } = props;

  const isOld = useHomeOld();

  return (
    <Container noMargin={noMargin}>
      <Typography variant="title5" color="shade8">
        {title}
      </Typography>

      {isOld && (
        <Button
          text="See All"
          variant="unselected"
          size="sm"
          icon={<ArrowRight fill="#E35D32" />}
          style={{ padding: '4px 8px' }}
          onClick={onClick}
        />
      )}
    </Container>
  );
};

export default React.memo(HomeSectionHeader);
