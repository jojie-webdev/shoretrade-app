import React from 'react';

import Select from 'components/base/Select';
import { PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';

// import { useTheme } from 'utils/Theme';
import { LandingGeneratedProps } from './Landing.props';
import {
  Container,
  Header,
  NavInteraction,
  NoProfilePic,
} from './Landing.style';

const LandingView = (props: LandingGeneratedProps) => {
  const INTERACTIONS = [
    {
      value: 'Account Completion',
      path: BUYER_ACCOUNT_ROUTES.ACCOUNT_COMPLETION,
    },
    { value: 'Balance & Payments', path: BUYER_ACCOUNT_ROUTES.BANK_DETAILS },
    {
      value: 'Your Details',
      path: BUYER_ACCOUNT_ROUTES.DETAILS,
    },
    { value: 'Delivery Address', path: BUYER_ACCOUNT_ROUTES.ADDRESS },
    {
      value: "Products I'm Buying",
      path: BUYER_ACCOUNT_ROUTES.MARKET_INTERESTS,
    },
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

  const companyOptions = companies.map((company) => {
    return {
      value: company.id,
      label: company.name,
    };
  });

  return (
    <Container>
      <BoxContainer>
        <Header>
          <div className="left-content">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" />
            ) : (
              <NoProfilePic>
                <PlaceholderProfile width={96} height={96} />
              </NoProfilePic>
            )}
            <div className="user-details">
              <Typography variant="overline" color="shade6">
                {companyRelationship === 'ADMIN'
                  ? 'Owner'
                  : companyRelationship}
              </Typography>
              <Typography variant="title5" color="shade8">
                {profileName}
              </Typography>
            </div>
          </div>

          <div>
            <Select
              label=""
              options={companyOptions}
              value={currentCompany?.id}
              size="small"
              grey
            />
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
      </BoxContainer>
    </Container>
  );
};

export default LandingView;
