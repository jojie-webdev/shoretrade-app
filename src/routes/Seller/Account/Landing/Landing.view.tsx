import React from 'react';

import Button from 'components/base/Button';
import Select from 'components/base/Select';
import {
  FileCheck2,
  Account,
  Anchor,
  CategoriesOutline,
  Cog,
  QuestionCircle,
  University,
  FileAlt,
  HelmOutline,
  Location,
  Lock,
  Fishes,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import AccountPicture from 'components/module/AccountPicture';
import FreeTrialCountdown from 'components/module/FreeTrialCountdown';
import GradientProgressCircle from 'components/module/GradientProgressCircle';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES, SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { COMPANY_RELATIONSHIPS } from 'consts/companyRelationships';
import qs from 'qs';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { AccountLandingGeneratedProps } from './Landing.props';
import {
  Container,
  NavInteraction,
  UserInfoContainer,
  AccountPictureProgress,
} from './Landing.style';

const AccountLandingView = ({
  logout,
  companies,
  currentCompany,
  profilePicture,
  loadingUser,
  profileName,
  companyRelationship,
  updateImage,
  updatingImage,
  accountCompletion,
  activePlan,
}: AccountLandingGeneratedProps) => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const theme = useTheme();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'account':
        return <Account fill={theme.grey.shade7} />;
      case 'university':
        return <University fill={theme.grey.shade7} />;
      case 'dashboardOutline':
        return <HelmOutline fill={theme.grey.shade7} />;
      case 'fileAlt':
        return <FileAlt fill={theme.grey.shade7} />;
      case 'anchor':
        return <Anchor fill={theme.grey.shade7} />;
      case 'lock':
        return <Lock width={24} height={24} fill={theme.grey.shade7} />;
      case 'location':
        return <Location width={24} height={24} fill={theme.grey.shade7} />;
      case 'categoriesOutline':
        return <CategoriesOutline fill={theme.grey.shade7} />;
      case 'cog':
        return <Cog fill={theme.grey.shade7} />;
      case 'fileCheck':
        return <FileCheck2 fill={theme.grey.shade7} />;
      case 'fishes':
        return <Fishes fill={theme.grey.shade7} />;
      case 'questionCircle':
        return <QuestionCircle fill={theme.grey.shade7} />;
    }
  };

  const INTERACTIONS = [
    {
      iconName: 'account',
      value: 'Account Completion',
      path: `${SELLER_ACCOUNT_ROUTES.ACCOUNT_COMPLETION}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      iconName: 'account',
      value: 'Your Details',
      path: `${SELLER_ACCOUNT_ROUTES.YOUR_DETAILS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      iconName: 'dashboardOutline',
      value: 'Your Plan',
      path: `${SELLER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      iconName: 'fileAlt',
      value: 'Payment History',
      path: SELLER_ACCOUNT_ROUTES.PAYMENT_HISTORY,
    },
    {
      iconName: 'location',
      value: 'Shipping Addresses',
      path: `${SELLER_ACCOUNT_ROUTES.SHIPPING_ADDRESS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      iconName: 'lock',
      value: 'Change Password',
      path: SELLER_ACCOUNT_ROUTES.CHANGE_PASSWORD,
    },
    {
      iconName: 'fileCheck',
      value: 'Fishing Licenses',
      path: `${SELLER_ACCOUNT_ROUTES.LICENSES}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      iconName: 'fishes',
      value: "Products I'm Selling",
      path: `${SELLER_ACCOUNT_ROUTES.MARKET_INTERESTS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
      hideFrom: [COMPANY_RELATIONSHIPS.FISHERMAN],
    },
    {
      iconName: 'anchor',
      value: 'Fisherman / Assistant',
      path: `${SELLER_ACCOUNT_ROUTES.ASSISTANTS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
      hideFrom: [COMPANY_RELATIONSHIPS.FISHERMAN],
    },
    {
      iconName: 'university',
      value: 'Bank Details',
      path: `${SELLER_ACCOUNT_ROUTES.BANK_DETAILS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      iconName: 'cog',
      value: 'Notifications Settings',
      path: `${SELLER_ACCOUNT_ROUTES.NOTIFICATIONS_SETTINGS}${qs.stringify(
        { companyId: currentCompany?.id },
        { addQueryPrefix: true }
      )}`,
    },
    {
      iconName: 'questionCircle',
      value: 'Help & Support',
      path: SELLER_ROUTES.HELP_AND_SUPPORT,
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
                  secondaryColor={theme.grey.shade8}
                  fontColor={theme.grey.noshade}
                />
              </div>
            </AccountPictureProgress>

            <Typography variant="overline" color="shade6">
              {companyRelationship === 'ADMIN' ? 'Owner' : companyRelationship}
            </Typography>

            <Typography variant="title6" color="noshade" altFont>
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

          {/* {activePlan?.is_free_trial && (
            <FreeTrialCountdown daysLeft={activePlan.countdown} small={true} />
          )} */}
        </Col>

        <Col sm={8}>
          {INTERACTIONS.filter(
            (interaction) =>
              !interaction.hideFrom?.includes(companyRelationship)
          ).map((link) => {
            return (
              <NavInteraction
                leftComponent={
                  <>
                    <div style={{ marginRight: '13px' }}>
                      {getIcon(link.iconName)}
                    </div>
                    <Typography variant="body" color="noshade" weight="400">
                      {link.value}
                    </Typography>
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
          onClick={logout}
          style={{ marginTop: 24 }}
        />
      )}
    </Container>
  );
};

export default AccountLandingView;
