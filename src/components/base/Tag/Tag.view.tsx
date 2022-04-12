import React from 'react';

import { Close } from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { TagProps } from './Tag.props';
import { Container } from './Tag.style';

const Tag = (props: TagProps): JSX.Element => {
  const theme = useTheme();
  const { selected, label, disabled, onClickRemove } = props;
  return (
    <Container {...props}>
      {onClickRemove && (
        <span style={{ marginRight: 8, marginLeft: 4 }}>
          <Close fill={theme.grey.shade7} />
        </span>
      )}
      {label}
    </Container>
  );
};

export default React.memo(Tag);
