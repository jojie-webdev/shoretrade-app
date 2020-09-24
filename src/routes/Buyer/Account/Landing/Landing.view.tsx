import React from 'react';

import Typography from 'components/base/Typography';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';

// import { useTheme } from 'utils/Theme';
import { LandingGeneratedProps } from './Landing.props';
import { Container, Header, NavInteraction, } from './Landing.style';

const LandingView = (props: LandingGeneratedProps) => {
  const INTERACTIONS = [
    { value: 'Balance & Payment', path: BUYER_ACCOUNT_ROUTES.BANK_DETAILS },
    {
      value: 'Your Details',
      path: BUYER_ACCOUNT_ROUTES.DETAILS + `?companyId=${props.company?.id}`,
    },
    { value: 'Delivery Address', path: BUYER_ACCOUNT_ROUTES.DELIVERY },
    { value: 'Linked Accounts', path: BUYER_ACCOUNT_ROUTES.LINKED_ACCOUNTS },
    { value: 'Change Password', path: BUYER_ACCOUNT_ROUTES.CHANGE_PASSWORD },
    { value: 'Fisherman / Assistants', path: BUYER_ACCOUNT_ROUTES.ASSISTANT },
    { value: 'Help & Support', path: BUYER_ACCOUNT_ROUTES.HELP },
  ];
  // const theme = useTheme();
  const history = useHistory();

  return (
    <Container>
      <Header>&nbsp;</Header>
      {INTERACTIONS.map((link) => (
        <NavInteraction
          key={link.path}
          value={link.value}
          onClick={() => {
            history.push(link.path);
          }}
        />
      ))}
    </Container>
  );
};

export default LandingView;
