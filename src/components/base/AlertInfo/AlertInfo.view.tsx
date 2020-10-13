import React from 'react';

import { InfoFilled } from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { AlertInfoProps } from './AlertInfo.props';
import { Container, Text } from './AlertInfo.style';

const AlertInfo = (props: AlertInfoProps): JSX.Element => {
  const theme = useTheme();
  const { label, className, dark } = props;
  return (
    <Container className={className} dark={dark}>
      <InfoFilled
        width={13.33}
        height={13.33}
        fill={dark ? theme.grey.shade9 : theme.brand.alert}
        {...props}
      />
      <Text variant="caption" color={dark ? 'shade9' : 'alert'}>
        {label}
      </Text>
    </Container>
  );
};

export default React.memo(AlertInfo);
