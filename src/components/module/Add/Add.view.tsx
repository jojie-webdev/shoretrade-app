import React from 'react';

import { Camera } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { AddProps } from './Add.props';
import { Container } from './Add.style';

const Add = (props: AddProps): JSX.Element => {
  const theme = useTheme();

  const { title, onClick, Svg } = props;

  return (
    <Container onClick={onClick}>
      <div className="content">
        <div className="svg-container">
          <Svg fill={theme.brand.primary} />
        </div>

        <Typography color="primary" variant="label">
          {title}
        </Typography>
      </div>
    </Container>
  );
};

export default React.memo(Add);
