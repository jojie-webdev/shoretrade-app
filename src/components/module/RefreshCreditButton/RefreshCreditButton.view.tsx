import React from 'react';

import { Sync } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { RefreshCreditButtonProps } from './RefreshCreditButton.props';
import { Container, IconContainer, ToolTip } from './RefreshCreditButton.style';

const RefreshCreditButton = (props: RefreshCreditButtonProps): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <Container>
        <Typography
          color={props.color || 'primary'}
          variant="overline"
          weight="900"
        >
          {props.label || 'CREDIT BALANCE'}
        </Typography>
        <IconContainer
          isRefreshing={props.isRefreshing || false}
          data-tip
          data-for="update-aas-balance"
          onClick={(e) => {
            if (props.onRefresh) {
              props.onRefresh();
            }
            e.stopPropagation();
          }}
        >
          <Sync width={12} height={12} fill={theme.brand.primary} />
        </IconContainer>
      </Container>
      <ToolTip
        id="update-aas-balance"
        className="update-aas-balance-tooltip"
        effect="solid"
        backgroundColor={theme.grey.noshade}
        place="top"
        offset={{ right: 70 }}
      >
        <Typography color="shade8" variant="caption">
          {'Update your AAS credit Balance'.split(' ').join('\xa0')}
        </Typography>
      </ToolTip>
    </>
  );
};

export default React.memo(RefreshCreditButton);
