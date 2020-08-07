import React from 'react';

// import { useTheme } from 'utils/Theme';

import Typography from 'components/base/Typography';

import { AccountGeneratedProps } from './Account.props';
import {
  Container,
  NavInteraction,
  Header,
  AccountSelect,
} from './Account.style';

const interactions = [
  { value: 'Your Details', path: '/1' },
  { value: 'Shipping Addresses', path: '/2' },
  { value: 'Change Password', path: '/3' },
  { value: 'Fisherman / Assistants', path: '/4' },
  { value: 'Bank Details', path: '/5' },
  { value: 'Help & Support', path: '/6' },
];

const AccountView = (props: AccountGeneratedProps) => {
  // const theme = useTheme();
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
          onClick={() => {}}
        />
      ))}
    </Container>
  );
};

export default AccountView;
