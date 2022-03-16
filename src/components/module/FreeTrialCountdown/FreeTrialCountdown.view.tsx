import React from 'react';

import ProgressBar from 'components/base/ProgressBar';
import {
  ShoretradeProBuyerLogo,
  ShoretradeProSellerLogo,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BUYER_ROUTES, SELLER_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { FreeTrialCountdownProps } from './FreeTrialCountdown.props';
import { Container } from './FreeTrialCountdown.style';

const FreeTrialCountdown = (props: FreeTrialCountdownProps): JSX.Element => {
  const { daysLeft, small = false } = props;
  const theme = useTheme();
  const history = useHistory();
  const isBuyer = theme.appType === 'buyer';
  const Logo = isBuyer ? ShoretradeProBuyerLogo : ShoretradeProSellerLogo;
  const barColor =
    daysLeft > 15
      ? theme.brand.success
      : daysLeft > 3 && daysLeft <= 15
      ? theme.brand.alert
      : theme.brand.error;

  const pushToUpgrade = () => {
    if (isBuyer) {
      history.push(BUYER_ROUTES.UPGRADE);
    } else {
      history.push(SELLER_ROUTES.UPGRADE);
    }
  };

  return (
    <Container {...props} onClick={() => daysLeft === 0 && pushToUpgrade()}>
      {!small && <Logo width={82} />}
      <div>
        <Typography
          weight="400"
          color={isBuyer ? 'shade9' : 'noshade'}
          style={{ marginBottom: '8px' }}
        >
          {daysLeft > 0
            ? `FREE Trial will expire in ${daysLeft} day ${
                daysLeft > 1 ? 's' : ''
              }`
            : 'Free Trial Expired'}
        </Typography>
        <ProgressBar
          progress={(daysLeft / 30) * 100}
          color={barColor}
          height={4}
        />
      </div>
    </Container>
  );
};

export default React.memo(FreeTrialCountdown);
