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
      <InfoFilled width={13.33} height={13.33} fill={theme.brand.alert} />
      <Text variant="caption" color="alert">
        {label}
      </Text>
    </Container>
  );
};

export default React.memo(AlertInfo);
