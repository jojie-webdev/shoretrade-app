import React from 'react';

import { Expand } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { MARKET_BY_ROLES } from 'consts/markets';
import moment from 'moment';
import { useTheme } from 'utils/Theme';

import { ScanHistoryButtonProps } from './ScanHistoryButton.props';
import { Container } from './ScanHistoryButton.style';

const ScanHistoryButton = (props: ScanHistoryButtonProps): JSX.Element => {
  const theme = useTheme();
  const isBuyer = theme.appType === 'buyer';
  const { scanData } = props;
  return (
    <Container
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
        e.stopPropagation();
      }}
    >
      <div className="text-container">
        <Typography variant="small" color={isBuyer ? 'shade6' : 'noshade'}>
          {`Scanned by ${scanData.user_first_name} ${scanData.user_last_name} (${scanData.user_role})`}
        </Typography>
        <Typography variant="small" color={isBuyer ? 'shade6' : 'noshade'}>
          {`${moment(scanData.updated_at).format('DD MMM YYYY hh:mm a')} at ${
            MARKET_BY_ROLES[scanData.user_role_alias] || MARKET_BY_ROLES.DEFAULT
          }`}
        </Typography>
      </div>
      <div>
        <Expand fill={theme.brand.primary} width={18} height={18} />
      </div>
    </Container>
  );
};

export default React.memo(ScanHistoryButton);
