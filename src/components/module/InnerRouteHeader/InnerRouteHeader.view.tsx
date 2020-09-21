import React from 'react';

import { ArrowLeft } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { InnerRouteHeaderProps } from './InnerRouteHeader.props';
import { HeaderRow, TitleRow } from './InnerRouteHeader.style';

const InnerRouteHeader = (props: InnerRouteHeaderProps): JSX.Element => {
  const theme = useTheme();
  const history = useHistory();

  const {
    fullRow = true,
    showIcon = true,
    title,
    onClickBack,
    subtitle = '',
  } = props;

  const content = (
    <>
      {showIcon && (
        <Touchable
          className="icon-container"
          onPress={onClickBack || history.goBack}
        >
          <ArrowLeft fill={theme.brand.primary} height={24} width={24} />
        </Touchable>
      )}
      <TitleRow>
        <Typography variant="title5" color="shade1">
          {title}
        </Typography>
        <Typography variant="label" color="shade1">
          {subtitle}
        </Typography>
      </TitleRow>
    </>
  );

  return fullRow ? (
    <HeaderRow>
      <Col className="header">{content}</Col>
    </HeaderRow>
  ) : (
    <div style={{ display: 'flex', alignItems: 'center' }}>{content}</div>
  );
};

export default React.memo(InnerRouteHeader);
