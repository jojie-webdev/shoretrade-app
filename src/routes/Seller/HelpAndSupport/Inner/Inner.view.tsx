import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import HelpAndSupportFooter from 'components/module/HelpAndSupportFooter';
import { SHORETRADE_EMAIL } from 'consts';
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
          component="h2"
        >
          {props?.topic?.fields?.title}
        </Typography>
      )}

      <Contents>{props.convertedElements}</Contents>

      <HelpAndSupportFooter
        contactNo={SHORETRADE_TEL}
        email={SHORETRADE_EMAIL}
        handleEmailClick={props.handleEmailUsClick}
      />
    </Container>
  );
};

export default InnerView;
