import React from 'react';

import Accordion from 'components/base/Accordion';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useTheme } from 'utils/Theme';

import { HelpAndSupportGeneratedProps } from './HelpAndSupport.props';
import { Container } from './HelpAndSupport.style';

const HELP_AND_SUPPORT = [
  {
    title: 'How do fees work on ShoreTrade?',
    description: `Joining and adding listings on ShoreTrade is free. We only charge a
    transaction fee per sale. Once an item sells, there is a transaction
    fee on the sale price (excluding the shipping price).`,
  },
  {
    title: 'What do I need to sign up?',
    description: `The signing up process is simple, all you need is your business name,
    ABN, banking details and address. Our team will review your
    application before you can start listing and selling your products in
    our seafood marketplace.`,
  },
  {
    title: 'What can I sell on ShoreTrade?',
    description: `Seafood products that can sell at the fish markets can also be sold on
    ShoreTrade.`,
  },
  {
    title: 'Can I purchase from overseas?',
    description: `International exports is launching early 2021 for fishermen and
    fisheries with valid export licences.`,
  },
  {
    title: 'Who can sell on ShoreTrade?',
    description: `ShoreTrade is suitable for commercial fishermen, fisheries,
    cooperative or seafood suppliers. If you have the license to sell
    seafood you can sign up for an account and get it approved by our
    team.`,
  },
  {
    title: 'How does delivery work?',
    description: `Delivery is handled by ShoreTrade with logistics put into place to
    pick up and deliver your products to your buyers desired location. The
    buyers can also track their order at every step of the delivery
    process.`,
  },
];

const HelpAndSupportView = (props: HelpAndSupportGeneratedProps) => {
  const theme = useTheme();

  return (
    <Container>
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
              { label: 'Help & Support' },
            ]}
          />
        </div>

        <p className="help-text">
          You’ll find answers to common questions below. <br />
          For everything else contact us on <span>1300 095 746</span> or{' '}
          <span>buyers@shoretrade.com</span>
        </p>

        {HELP_AND_SUPPORT.map((help, ndx) => (
          <div className="accordion-container" key={`help${ndx}`}>
            <Accordion title={help.title} iconColor={theme.brand.primary}>
              <Typography variant="label" color="shade9">
                {help.description}
              </Typography>
            </Accordion>
          </div>
        ))}
      </BoxContainer>
    </Container>
  );
};

export default HelpAndSupportView;
