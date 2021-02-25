import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import TypographyView from 'components/base/Typography/Typography.view';
import Typography from 'components/base/Typography/Typography.view';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview/CategoryImagePreview.view';
import NegotiateModal from 'components/module/NegotiateModal';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useLocation } from 'react-router-dom';
import theme from 'utils/Theme';

import { RequestAndNegotiateGeneratedProps } from './RequestAndNegotiate.props';
import {
  SummaryContentContainer,
  Container,
  BadgesContainer,
  BadgeText,
} from './RequestAndNegotiate.style';

const SummaryBadges = (props: { items: string[]; label: string }) => {
  const { items, label } = props;

  if (!items) return <></>;

  const tagsMarkup = items.map((item) => (
    <Badge
      key={item}
      className="offers-state-badge"
      badgeColor={theme.grey.shade3}
    >
      <BadgeText color="shade8" weight="bold" variant="overline">
        {item}
      </BadgeText>
    </Badge>
  ));

  return (
    <div className="offer-badges">
      <TypographyView
        style={{ marginBottom: '8px' }}
        color="shade6"
        variant="overline"
      >
        {label}
      </TypographyView>
      <BadgesContainer>{tagsMarkup}</BadgesContainer>
    </div>
  );
};

const RequestAndNegotiateView = (props: RequestAndNegotiateGeneratedProps) => {
  const location = useLocation();
  const { pathname } = location;
  const isReview = pathname.includes(SELLER_MARKET_BOARD_ROUTES.REVIEW_REQUEST);

  const [isOpen, setIsOpen] = useState(false);

  const discountValue = 1.5;

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Market Board', link: SELLER_MARKET_BOARD_ROUTES.LANDING },
            {
              label: isReview ? 'Review Request' : 'Negotiate',
            },
          ]}
        />
      </div>

      <div className="contents">
        <CategoryImagePreviewView
          categoryName="Pale Octopus"
          imgSrc="http://placekitten.com/474/280"
          caption="Praesent vel et sed augue. Pharetra duis vitae pellentesque elementum.
             Cras id ac hac ultricies lorem in nisl nunc lectus. Consequat quam."
        />

        <SummaryContentContainer>
          <SummaryBadges label="Specs" items={['FRESH']} />
          <SummaryBadges label="Sizes" items={['MEDIUM']} />
          <div className="quantity-container">
            <TextField
              className="text-field"
              type="number"
              label="From"
              value={100}
              disabled
              LeftComponent={
                <TypographyView variant="label" color="shade6">
                  kg
                </TypographyView>
              }
            />
            <TextField
              className="text-field"
              type="number"
              label="To"
              value={250}
              disabled
              LeftComponent={
                <TypographyView variant="label" color="shade6">
                  kg
                </TypographyView>
              }
            />
          </div>

          {!isReview && (
            <div className="offer-container">
              <div className="computation-item-container">
                <Typography variant="label" color="noshade">
                  Your offer was
                </Typography>
                <Typography variant="label" weight="bold" color="noshade">
                  {'$'}
                  {'24'}/{'kg'}
                </Typography>
              </div>
              <div className="computation-item-container">
                <Typography variant="label" color="noshade">
                  Your counter offer is
                </Typography>
                <Typography variant="label" color="noshade" weight="bold">
                  {'$'}
                  {'48'}/{'kg'}
                </Typography>
              </div>
              <div className="computation-item-container">
                <Typography variant="label" color="noshade">
                  Discount Value <span className="indicator">{'0.5%'}</span>
                </Typography>
                {/*
                //@ts-ignore*/}
                {discountValue !== 0 ? (
                  <Typography
                    color={discountValue > 0 ? 'success' : 'error'}
                    variant="label"
                    weight="bold"
                  >
                    {'$'}
                    {discountValue > 0 ? '-' : '+'}
                    {Math.abs(discountValue)}/{'kg'}
                  </Typography>
                ) : (
                  <Typography variant="label" weight="bold" color="noshade">
                    0
                  </Typography>
                )}
              </div>
              <div className="computation-item-container">
                <Typography variant="label" color="noshade">
                  Original offer was
                </Typography>
                <Typography variant="label" color="noshade" weight="bold">
                  {'$'}
                  {'1800'}/{'kg'}
                </Typography>
              </div>
            </div>
          )}

          <div className="submit-btns">
            {!isReview ? (
              <>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="submit-btn"
                  text="Negotiate"
                  variant="outline"
                />
                <Button
                  onClick={() => {}}
                  className="submit-btn"
                  text="accept"
                  variant="primary"
                />
              </>
            ) : (
              <Button
                onClick={() => {}}
                className="submit-btn"
                text="Make an offer"
                variant="primary"
              />
            )}
          </div>
        </SummaryContentContainer>
      </div>

      <NegotiateModal
        onSubmit={() => setIsOpen(false)}
        offerId="2"
        negotiationId="1"
        originalOffer={1}
        weight={{
          unit: 'kg',
          value: 100,
        }}
        isOpen={isOpen}
        onClickClose={() => setIsOpen(false)}
      />
    </Container>
  );
};

export default RequestAndNegotiateView;
