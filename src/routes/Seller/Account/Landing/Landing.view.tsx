import React from 'react';

// import { useTheme } from 'utils/Theme';

import Typography from 'components/base/Typography';
import { SELLER_ACCOUNT_ROUTES } from 'consts';

import { AccountLandingGeneratedProps } from './Landing.props';
import {
  Container,
  NavInteraction,
  Header,
  AccountSelect,
} from './Landing.style';

const interactions = [
  { value: 'Your Details', path: SELLER_ACCOUNT_ROUTES.YOUR_DETAILS },
  { value: 'Shipping Addresses', path: SELLER_ACCOUNT_ROUTES.SHIPPING_ADDRESS },
  { value: 'Change Password', path: SELLER_ACCOUNT_ROUTES.CHANGE_PASSWORD },
  { value: 'Fisherman / Assistants', path: SELLER_ACCOUNT_ROUTES.ASSISTANTS },
  { value: 'Bank Details', path: SELLER_ACCOUNT_ROUTES.BANK_DETAILS },
  { value: 'Help & Support', path: SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT },
];

const AccountLandingView = (props: AccountLandingGeneratedProps) => {
  // const theme = useTheme();
  const { goto } = props;

  return (
    <Container>
      <Header>
        <div className="left-content">
          <img src="" alt="profile picture" />
          <div>
            <Typography variant="overline" color="noshade">
              Owner
            </Typography>
            <Typography variant="title5" color="noshade">
              Peter Manettas
            </Typography>
          </div>
        </div>

        <div className="right-content">
          <AccountSelect options={['one', 'two', 'three']} />
        </div>
      </Header>

      {interactions.map((interaction) => (
        <NavInteraction
          key={interaction.path}
          value={interaction.value}
          onClick={() => goto(interaction.path)}
        />
      ))}
    </Container>
  );
};

export default AccountLandingView;
