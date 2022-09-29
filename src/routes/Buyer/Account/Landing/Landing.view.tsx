import React from 'react';

import Button from 'components/base/Button';
import Select from 'components/base/Select';
import {
  Account,
  Anchor,
  CategoriesOutline,
  Cog,
  CreditCardOutline,
  FileAlt,
  HelmOutline,
  Location,
  Lock,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import AccountPicture from 'components/module/AccountPicture';
import FreeTrialCountdown from 'components/module/FreeTrialCountdown';
import GradientProgressCircle from 'components/module/GradientProgressCircle';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES, BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import qs from 'qs';
import { isEmpty } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { CompanyPlanName } from 'types/store/GetCompanyPlanState';
import { useTheme } from 'utils/Theme';

import { LandingGeneratedProps } from './Landing.props';
import {
  Container,
  NavInteraction,
  UserInfoContainer,
  AccountPictureProgress,
} from './Landing.style';

const LandingView = (props: LandingGeneratedProps) => {
  const history = useHistory();
  const theme = useTheme();
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
    accountCompletion,
    companyPlan,
    currentMarketSector,
    isApprovedCompany,
  } = props;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'account':
        return <Account fill={theme.grey.shade6} />;
      case 'creditCardOutline':
        return <CreditCardOutline fill={theme.grey.shade6} />;
      case 'dashboardOutline':
        return <HelmOutline fill={theme.grey.shade6} />;
      case 'anchor':
        return <Anchor fill={theme.grey.shade6} />;
      case 'lock':
        return <Lock width={24} height={24} fill={theme.grey.shade6} />;
      case 'location':
        return <Location width={24} height={24} fill={theme.grey.shade6} />;
      case 'categoriesOutline':
        return <CategoriesOutline fill={theme.grey.shade6} />;
      case 'cog':
        return <Cog fill={theme.grey.shade6} />;
    }
  };

  const INTERACTIONS = [
    {
      iconName: 'account',
      value: 'Account Completion',
      path: BUYER_ACCOUNT_ROUTES.ACCOUNT_COMPLETION,
    },
    {
      iconName: 'account',
      value: 'Your Details',
      path: BUYER_ACCOUNT_ROUTES.DETAILS,
    },
    {
      iconName: 'location',
      value: 'Delivery Address',
      path: BUYER_ACCOUNT_ROUTES.ADDRESS,
    },
    {
      iconName: 'dashboardOutline',
      value: 'Your Plan',
      path: BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
    },
    {
      iconName: 'creditCardOutline',
      value: 'Balance & Payments',
      path: BUYER_ACCOUNT_ROUTES.BANK_DETAILS,
    },
    {
      iconName: 'lock',
      value: 'Change Password',
      path: BUYER_ACCOUNT_ROUTES.CHANGE_PASSWORD,
    },

    permission
      ? {
          iconName: 'anchor',
          value: 'Linked Accounts',
          path: BUYER_ACCOUNT_ROUTES.LINKED_ACCOUNTS,
        }
      : {},
    {
      iconName: 'categoriesOutline',
      value: "Products I'm Buying",
      path: BUYER_ACCOUNT_ROUTES.MARKET_INTERESTS,
    },
    {
      iconName: 'cog',
      value: 'Notifications Settings',
      path: `${BUYER_ACCOUNT_ROUTES.NOTIFICATIONS_SETTINGS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      iconName: 'cog',
      value: 'Help & Support',
      path: BUYER_ROUTES.HELP_AND_SUPPORT,
    },
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

  const currentPlan = companyPlan?.activePlans.find((ac) =>
    [CompanyPlanName.PRO, CompanyPlanName.BASE].includes(ac.plan.name)
  );

  const freeTrialSubscription = currentPlan?.plan.alias.includes('FREE');
  const endDate = currentPlan
    ? currentPlan.subscription.ends_at
    : moment().startOf('day');

  const startDate = currentPlan
    ? currentPlan.subscription.starts_at
    : moment().startOf('day');

  const currentDate = moment().startOf('day');
  const freeTrialPeriod = moment(endDate).diff(startDate, 'days');
  const daysLeft = moment(endDate).diff(currentDate, 'days');

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <UserInfoContainer>
            <AccountPictureProgress>
              <AccountPicture
                size={64}
                profilePicture={profilePicture}
                updateImage={updateImage}
                updatingImage={updatingImage}
              />
              <div>
                <GradientProgressCircle
                  width={55}
                  percentage={parseInt(
                    accountCompletion?.progressPercentage?.replace('%', '') ||
                      '0'
                  )}
                  primaryColor={[theme.brand.success, theme.brand.success]}
                />
              </div>
            </AccountPictureProgress>

            <Typography variant="overline" color="shade6">
              {companyRelationship === 'ADMIN' ? 'Owner' : companyRelationship}
            </Typography>

            <Typography variant="title6" color="shade8" altFont>
              {profileName}
            </Typography>

            <div style={{ width: '60%' }}>
              <Select
                label=""
                options={companyOptions}
                value={currentCompany?.id}
                size="large"
                grey
                border="none"
              />
            </div>
          </UserInfoContainer>

          {freeTrialSubscription && isApprovedCompany && (
            <FreeTrialCountdown
              freeTrialPeriod={freeTrialPeriod}
              daysLeft={daysLeft}
              small={true}
            />
          )}
        </Col>

        <Col sm={8}>
          {INTERACTIONS.map((link: any) => {
            if (isEmpty(link)) {
              return <></>;
            }
            return (
              <NavInteraction
                leftComponent={
                  <>
                    <div style={{ marginRight: '13px' }}>
                      {getIcon(link.iconName)}
                    </div>
                    {link.value}
                  </>
                }
                key={link.path}
                onClick={() => {
                  history.push(link.path);
                }}
              />
            );
          })}
        </Col>
      </Row>

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
