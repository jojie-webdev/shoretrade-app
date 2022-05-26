import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { SHORETRADE_TEL } from '../HelpAndSupport.constants';
import { InnerGeneratedProps } from './Inner.props';
import {
  Container,
  Account,
  Contents,
  Text1,
  Content,
  EnvelopeAltWrapper,
  ChatWrapper,
  Content2,
} from './Inner.style';

const InnerView = (props: InnerGeneratedProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container className="inner_page">
      <Account
        className="inner_page__account"
        variant="title5"
        weight="700"
        color="noshade"
      >
        Account
      </Account>

      <div className="inner_page__breadcrumb">
        <Breadcrumbs sections={props.breadCrumbsPath} />
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
        <Content onClick={() => props.handleEmailUsClick()}>
          <EnvelopeAltWrapper fill={theme.grey.shade6} />
          <div style={{ marginLeft: 14 }}>
            <Typography color="noshade" variant="body" weight="500">
              Email us
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content>
        <Content2 href={SHORETRADE_TEL}>
          <ChatWrapper fill={theme.grey.shade6} />
          <div style={{ marginLeft: 14 }}>
            <Typography color="noshade" variant="body" weight="500">
              Chat with us
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content2>
      </div>
    </Container>
  );
};

export default InnerView;
