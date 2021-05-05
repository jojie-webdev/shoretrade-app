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
    subtitle,
    rightContent,
  } = props;

  const isSeller = theme.appType === 'seller';

  if (rightContent && subtitle) {
    throw new Error(
      'rightContent and subtitle cannot co-exist, only use one or none'
    );
  }

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
        {title && (
          <Typography variant="title5" color={isSeller ? 'shade1' : 'shade8'}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="label" color={isSeller ? 'shade1' : 'shade8'}>
            {subtitle}
          </Typography>
        )}

        {rightContent}
      </TitleRow>
    </>
  );

  return fullRow ? (
    <HeaderRow nogutter>
      <Col className="header">{content}</Col>
    </HeaderRow>
  ) : (
    <div style={{ display: 'flex', alignItems: 'center' }}>{content}</div>
  );
};

export default React.memo(InnerRouteHeader);
