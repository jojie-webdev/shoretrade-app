import React from 'react';

import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { HelpAndSupportFooterProps } from './HelpAndSupportFooter.props';
import {
  ChatWrapper,
  Container,
  Content1,
  Content3,
  EnvelopeAltWrapper,
  Text1,
} from './HelpAndSupportFooter.style';

const HelpAndSupportFooter = (
  props: HelpAndSupportFooterProps
): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const { contactNo, email } = props;
  const isSeller = theme.appType === 'seller';

  return (
    <Container>
      <Text1>
        <Typography
          variant="copy"
          weight="500"
          color={isSeller ? 'noshade' : 'shade9'}
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

      <div className="help_and_support__contact">
        <Content1 onClick={() => props.handleEmailClick()}>
          <EnvelopeAltWrapper fill={theme.grey.noshade} />
          <div style={{ marginLeft: 14 }}>
            <Typography
              color={isSeller ? 'noshade' : 'shade9'}
              variant="body"
              weight="500"
            >
              Email us at <a href={`mailto:${email}`}>{email}</a>
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content1>
        <Content3 href={contactNo}>
          <ChatWrapper fill={theme.grey.noshade} />
          <div style={{ marginLeft: 14 }}>
            <Typography
              color={isSeller ? 'noshade' : 'shade9'}
              variant="body"
              weight="500"
            >
              Contact Us at <b>{contactNo.replace('tel://', '')}</b>
            </Typography>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ChevronRight fill={theme.brand.primary} height={14} width={24} />
          </div>
        </Content3>
      </div>
    </Container>
  );
};

export default React.memo(HelpAndSupportFooter);
