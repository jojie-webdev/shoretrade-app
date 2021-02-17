import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import { CheckFilled, PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import GradientProgressCircle from 'components/module/GradientProgressCircle';
import Loading from 'components/module/Loading/Loading.view';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Col, Row } from 'react-grid-system';
import { AccountCompletionGeneratedProps } from 'routes/Seller/Account/AccountCompletion/AccountCompletion.props';
import {
  Container,
  InfoContainer,
} from 'routes/Seller/Account/AccountCompletion/AccountCompletion.style';
import { useTheme } from 'utils/Theme';

const AccountCompletionView = ({
  accountCompletion,
  ...props
}: AccountCompletionGeneratedProps) => {
  const theme = useTheme();

  if (!accountCompletion) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            { label: 'Account Completion' },
          ]}
        />
      </div>

      <InfoContainer>
        <div className="gradient-container">
          <GradientProgressCircle
            percentage={parseInt(
              accountCompletion.progressPercentage.replace('%', '')
            )}
            hidePercentageText
          />
          <div className="profile-image">
            {props.profileImage ? (
              <img src={props.profileImage} alt="Profile" />
            ) : (
              <PlaceholderProfile width={34} height={34} />
            )}
          </div>
        </div>

        <div className="owner-container">
          <Typography variant="overlineSmall" color="shade6">
            OWNER
          </Typography>
          <Typography variant="title6" color="noshade">
            {props.name}
          </Typography>
        </div>

        <Badge badgeColor={theme.grey.shade8} className="percent-badge">
          <Typography variant="overlineSmall" color="noshade">
            {accountCompletion.progressPercentage}
          </Typography>
        </Badge>
      </InfoContainer>

      <Typography variant="overline" color="shade6">
        SUMMARY
      </Typography>
      <Row className="summary-row">
        {accountCompletion.checklist.map((c) => (
          <Col lg={12} xl={4} key={c.label} className="summary-item">
            <CheckFilled
              width={24}
              height={24}
              fill={!c.isChecked ? theme.grey.shade7 : ''}
            />
            <Typography
              variant="label"
              color="noshade"
              className="summary-item-text"
            >
              {c.label}
            </Typography>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AccountCompletionView;
