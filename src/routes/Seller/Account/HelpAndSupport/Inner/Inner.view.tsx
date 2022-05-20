import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { InnerGeneratedProps } from './Inner.props';
import {
  Container,
  Account,
  Contents,
  Text1,
  Content,
  EnvelopeAltWrapper,
  ChatWrapper,
} from './Inner.style';

const InnerView = (props: InnerGeneratedProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container className="inner_page">
      <Account className="inner_page__account" variant="title5" weight="700">
        Account
      </Account>

      <div className="inner_page__breadcrumb">
        <Breadcrumbs
          color="noshade"
          sections={[
            {
              label: 'Account',
              link: SELLER_ACCOUNT_ROUTES.LANDING,
            },
            {
              label: 'Help & Support',
              link: SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT,
            },
            {
              label: props?.category?.fields?.title,
              link: SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_CATEGORY(
                props.categorySlug
              ),
              state: { categoryId: props.categoryId },
            },
            {
              label: props?.topic?.fields?.title,
            },
          ]}
        />
      </div>
      {props?.topic?.fields?.title && (
        <Typography
          color="noshade"
          className="inner_page__title"
          variant="title4"
          weight="500"
        >
          {props?.topic?.fields?.title}
        </Typography>
      )}

      <Contents>{props.convertedElements}</Contents>

      <Text1>
        <Typography
          variant="copy"
          weight="500"
          color="noshade"
          style={{ textAlign: isMobile ? 'left' : 'center' }}
        >
          Can’t find an answer?
        </Typography>
        {!isMobile && <div style={{ height: 8 }} />}
        <Typography
          variant="label"
          weight="500"
          color="shade6"
          style={{ textAlign: isMobile ? 'left' : 'center' }}
        >
          Get in touch with our success team
        </Typography>
      </Text1>

      <div className="inner__contact">
        <Content>
          <EnvelopeAltWrapper fill={theme.grey.shade6} />
          <div style={{ marginLeft: 14 }}>
            <Typography color="noshade" variant="body" weight="500">
              Email us
            </Typography>
            <Typography variant="caption" weight="500" color="shade6">
              Fill out the form, and we will get back to you
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content>
        <Content>
          <ChatWrapper fill={theme.grey.shade6} />
          <div style={{ marginLeft: 14 }}>
            <Typography color="noshade" variant="body" weight="500">
              Chat with us
            </Typography>
            <Typography variant="caption" weight="500" color="shade6">
              Connect with our live specialists
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content>
      </div>
    </Container>
  );
};

export default InnerView;
