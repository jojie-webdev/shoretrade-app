import React from 'react';

import { ArrowLeft } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { InnerRouteHeaderProps } from './InnerRouteHeader.props';
import { HeaderRow } from './InnerRouteHeader.style';

const InnerRouteHeader = (props: InnerRouteHeaderProps): JSX.Element => {
  const theme = useTheme();
  const history = useHistory();

  const { fullRow = true, title } = props;

  const content = (
    <>
      <Touchable className="icon-container" onPress={history.goBack}>
        <ArrowLeft fill={theme.brand.primary} height={24} width={24} />
      </Touchable>
      <Typography variant="title5" color="noshade">
        {title}
      </Typography>
    </>
  );

  return fullRow ? (
    <HeaderRow>
      <Col className="header">{content}</Col>
    </HeaderRow>
  ) : (
    content
  );
};

export default React.memo(InnerRouteHeader);
