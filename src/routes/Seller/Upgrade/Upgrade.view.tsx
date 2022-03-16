import React, { useState } from 'react';

import Button from 'components/base/Button';
import { ShoretradeProSellerLogo } from 'components/base/SVG';
import TwoWayToggle from 'components/base/TwoWayToggle';
import Typography from 'components/base/Typography';
import PlanFeatures from 'components/module/PlanFeatures';
import { toPrice } from 'utils/String';

import { UpgradeGeneratedProps } from './Upgrade.props';
import {
  Container,
  TitleContainer,
  DicountContainer,
  PlanSection,
  ToggleContainer,
} from './Upgrade.style';

const UpgradeView = ({
  annualPrice,
  monthlyPrice,
  upgrading,
  upgradeSubscription,
}: UpgradeGeneratedProps) => {
  const [isMonthly, setIsMonthly] = useState(true);

  const price = toPrice(isMonthly ? monthlyPrice : annualPrice);

  return (
    <Container>
      <TitleContainer>
        <Typography variant="title5" color="noshade">
          Your 1 Month Free Trial expired
        </Typography>
        <Typography variant="label" color="shade6" weight="400">
          Please subscribe our plan to continue
        </Typography>
      </TitleContainer>

      <DicountContainer>
        <div className="discount">
          <Typography
            weight="400"
            color="noshade"
            style={{ fontFamily: 'Wilderness', fontSize: '24px' }}
          >
            10% OFF
          </Typography>
        </div>
      </DicountContainer>

      <ToggleContainer>
        <Typography
          variant="label"
          weight="400"
          color="noshade"
          style={{ marginRight: '8px' }}
        >
          Monthly
        </Typography>

        <TwoWayToggle
          checked={isMonthly}
          onClick={() => setIsMonthly(!isMonthly)}
        />

        <Typography
          variant="label"
          weight="400"
          color="noshade"
          style={{ marginLeft: '8px' }}
        >
          Annually
        </Typography>
      </ToggleContainer>

      <PlanSection>
        <div>
          <ShoretradeProSellerLogo />
          <Typography
            variant="label"
            weight="400"
            color="shade7"
            style={{ marginTop: '8px' }}
          >
            Sell your seafood products directly to businesses with a few clicks.
          </Typography>

          <div className="plan-rate">
            <Typography variant="title3" weight="400" color="noshade">
              {price}
            </Typography>
            <Typography variant="label" weight="400" color="shade6">
              &nbsp;/ {isMonthly ? 'Month' : 'Year'}
            </Typography>
          </div>

          <PlanFeatures />

          <div className="upgrade-btn">
            <Button
              text="Upgrade"
              loading={upgrading}
              onClick={() =>
                upgradeSubscription(isMonthly ? 'MONTHLY' : 'ANNUAL')
              }
            />
          </div>
        </div>
      </PlanSection>
    </Container>
  );
};

export default UpgradeView;
