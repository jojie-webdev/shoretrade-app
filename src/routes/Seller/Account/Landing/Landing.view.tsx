import React from 'react';

// import { useTheme } from 'utils/Theme';

import Select from 'components/base/Select';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useHistory } from 'react-router-dom';

import { AccountLandingGeneratedProps } from './Landing.props';
import { Container, NavInteraction, Header, DropdownContainer } from './Landing.style';

const AccountLandingView = (props: AccountLandingGeneratedProps) => {
  // const theme = useTheme();
  const history = useHistory();

  const {
    companies,
    currentCompany,
    profilePicture,
    loadingUser,
    profileName,
    companyRelationship,
  } = props;

  const INTERACTIONS = [
    {
      value: 'Your Details',
      path: `${SELLER_ACCOUNT_ROUTES.YOUR_DETAILS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      value: 'Shipping Addresses',
      path: `${SELLER_ACCOUNT_ROUTES.SHIPPING_ADDRESS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    { value: 'Change Password', path: SELLER_ACCOUNT_ROUTES.CHANGE_PASSWORD },
    {
      value: 'Fisherman / Assistants',
      path: `${SELLER_ACCOUNT_ROUTES.ASSISTANTS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      value: 'Bank Details',
      path: `${SELLER_ACCOUNT_ROUTES.BANK_DETAILS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    { value: 'Help & Support', path: SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT },
  ];

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
      <Header>
        <div className="left-content">
          <img src={profilePicture} alt="profile picture" />
          <div>
            <Typography variant="overline" color="noshade">
              {companyRelationship === 'ADMIN' ? 'Owner' : companyRelationship}
            </Typography>
            <Typography variant="title5" color="noshade">
              {profileName}
            </Typography>
          </div>
        </div>

        <div className="right-content">
          <DropdownContainer>
            <Select
              label=""
              options={companyOptions}
              value={currentCompany?.id}
              size="small"
              dark={true}
            />
          </DropdownContainer>
          {/* <AccountSelect options={['one', 'two', 'three']} /> */}
        </div>
      </Header>

      {INTERACTIONS.map((interaction) => (
        <NavInteraction
          key={interaction.path}
          value={interaction.value}
          onClick={() => history.push(interaction.path)}
        />
      ))}
    </Container>
  );
};

export default AccountLandingView;
