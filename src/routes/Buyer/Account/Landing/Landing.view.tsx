import React from 'react';

import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';

// import { useTheme } from 'utils/Theme';
import { LandingGeneratedProps } from './Landing.props';
import { Container, Header, NavInteraction } from './Landing.style';

const LandingView = (props: LandingGeneratedProps) => {
  const INTERACTIONS = [
    { value: 'Balance & Payment', path: BUYER_ACCOUNT_ROUTES.BANK_DETAILS },
    {
      value: 'Your Details',
      path:
        BUYER_ACCOUNT_ROUTES.DETAILS + `?companyId=${props.currentCompany?.id}`,
    },
    { value: 'Delivery Address', path: BUYER_ACCOUNT_ROUTES.ADDRESS },
    { value: 'Linked Accounts', path: BUYER_ACCOUNT_ROUTES.LINKED_ACCOUNTS },
    { value: 'Change Password', path: BUYER_ACCOUNT_ROUTES.CHANGE_PASSWORD },
    { value: 'Help & Support', path: BUYER_ACCOUNT_ROUTES.HELP },
  ];
  // const theme = useTheme();
  const history = useHistory();
  const {
    currentCompany,
    companyRelationship,
    companies,
    profilePicture,
    profileName,
    loadingUser,
  } = props;

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <Container>
      <Header>
        <div className="left-content">
          <img src={profilePicture} alt="profile picture" />
          <div>
            <Typography variant="overline" color="shade6">
              {companyRelationship === 'ADMIN' ? 'Owner' : companyRelationship}
            </Typography>
            <Typography variant="title5" color="shade8">
              {profileName}
            </Typography>
          </div>
        </div>

        <div className="right-content">
          <select name="company">
            {companies.map((company) => (
              <option
                value={company.id}
                selected={currentCompany?.id === company.id}
                key={company.id}
              >
                {company.name}
              </option>
            ))}
          </select>
          {/* <AccountSelect options={['one', 'two', 'three']} /> */}
        </div>
      </Header>

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
