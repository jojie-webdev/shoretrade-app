import { AnyCnameRecord } from 'dns';

import React, { useRef, useState } from 'react';

import Button from 'components/base/Button';
import Select from 'components/base/Select';
import Spinner from 'components/base/Spinner/Spinner.view';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import AccountPicture from 'components/module/AccountPicture';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import qs from 'qs';
import { isEmpty } from 'ramda';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import theme from 'utils/Theme';

import { LandingGeneratedProps } from './Landing.props';
import { Container, Header, NavInteraction } from './Landing.style';

const LandingView = (props: LandingGeneratedProps) => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const {
    currentCompany,
    companyRelationship,
    companies,
    profilePicture,
    profileName,
    loadingUser,
    updateImage,
    updatingImage,
    permission,
  } = props;

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
    permission
      ? { value: 'Linked Accounts', path: BUYER_ACCOUNT_ROUTES.LINKED_ACCOUNTS }
      : {},
    { value: 'Change Password', path: BUYER_ACCOUNT_ROUTES.CHANGE_PASSWORD },
    {
      value: 'Notifications Settings',
      path: `${BUYER_ACCOUNT_ROUTES.NOTIFICATIONS_SETTINGS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    { value: 'Help & Support', path: BUYER_ACCOUNT_ROUTES.HELP },
  ];

  const imagePicker = useRef<HTMLInputElement | null>(null);

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
          <AccountPicture
            profilePicture={profilePicture}
            updateImage={updateImage}
            updatingImage={updatingImage}
          />
          <div>
            <Typography variant="overline" color="shade6">
              {companyRelationship === 'ADMIN' ? 'Owner' : companyRelationship}
            </Typography>
            <Typography variant="title5" color="shade8">
              {profileName}
            </Typography>
            {isMobile && (
              <div style={{ width: 167, marginTop: 8 }}>
                <Select
                  label=""
                  options={companyOptions}
                  value={currentCompany?.id}
                  size="small"
                  grey
                />
              </div>
            )}
          </div>
        </div>

        {!isMobile && (
          <div>
            <Select
              label=""
              options={companyOptions}
              value={currentCompany?.id}
              size="small"
              grey
            />
          </div>
        )}
      </Header>

      {INTERACTIONS.map((link: any) => {
        if (isEmpty(link)) {
          return <></>;
        }
        return (
          <NavInteraction
            key={link.path}
            value={link.value}
            onClick={() => {
              history.push(link.path);
            }}
          />
        );
      })}

      {isMobile && (
        <Button
          variant="outline"
          text="logout"
          takeFullWidth
          onClick={props.logout}
          style={{ marginTop: 24 }}
        />
      )}
    </Container>
  );
};

export default LandingView;
