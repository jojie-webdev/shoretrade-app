import React from 'react';

import { InfoFilled } from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { AlertInfoProps } from './AlertInfo.props';
import { Container, Text } from './AlertInfo.style';

const AlertInfo = (props: AlertInfoProps): JSX.Element => {
  const theme = useTheme();
  const { label, className } = props;
  return (
    <Container className={className}>
      <InfoFilled
        width={13.33}
        height={13.33}
        fill={theme.grey.shade9}
        {...props}
      />
      <Text variant="caption" color={'shade9'}>
        {label}
      </Text>
    </Container>
  );
};

export default React.memo(AlertInfo);
