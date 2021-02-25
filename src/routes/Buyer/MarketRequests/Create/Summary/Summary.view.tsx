import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Spinner from 'components/base/Spinner';
import { ArrowLeft, Filter } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { useHistory, Link } from 'react-router-dom';
import theme from 'utils/Theme';

import { CreateStepProps } from '../Create.props';
import {
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
} from '../Create.style';
import { SummaryProps } from './Summary.props';
import {
  SummaryContentContainer,
  BadgesContainer,
  BadgeText,
  StyledTextField,
} from './Summary.style';

const SummaryView = (props: SummaryProps) => {
  const {
    step,
    stepCountComponent,
    selectedCategory,
    selectedQuantity,
    selectedSize,
    selectedSpecifications,
    onBack,
  } = props;
  const history = useHistory();

  const handleSubmit = () => {
    console.log('submit');
  };

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
      <div>
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

  return (
    <>
      <CreateRequestHeaderContainer>
        <div>
          {stepCountComponent}
          <div className="title-container">
            <Touchable
              className="back-button-container"
              onPress={() => onBack()}
            >
              <ArrowLeft fill={theme.grey.shade7} height={24} width={24} />
            </Touchable>
            <TypographyView variant="title4">Summary</TypographyView>
          </div>
        </div>
      </CreateRequestHeaderContainer>
      <ContainerWithCategoryImagePreview>
        <CategoryImagePreviewView
          categoryName={selectedCategory.name}
          imgSrc="http://placekitten.com/474/280"
          caption="Aliquip ullamco dolore amet sunt ullamco. 
  Voluptate aliquip velit et commodo reprehenderit tempor laboris amet. 
  Sint ea nulla velit mollit amet sint ea."
        />
        <SummaryContentContainer>
          <SummaryBadges label="Specs" items={selectedSpecifications} />
          <SummaryBadges label="Sizes" items={selectedSize} />
          <div className="quantity-container">
            <StyledTextField
              className="text-field"
              type="number"
              label="From"
              value={selectedQuantity.from}
              disabled
              LeftComponent={
                <TypographyView variant="label" color="shade6">
                  kg
                </TypographyView>
              }
            />
            <StyledTextField
              className="text-field"
              type="number"
              label="To"
              value={selectedQuantity.to}
              disabled
              LeftComponent={
                <TypographyView variant="label" color="shade6">
                  kg
                </TypographyView>
              }
            />
            <Checkbox label="Auto-close this listing when reached max kg"></Checkbox>
          </div>
          <Button
            onClick={() => handleSubmit()}
            className="submit-btn"
            text="Send Request to the Market"
            variant="primary"
          />
        </SummaryContentContainer>
      </ContainerWithCategoryImagePreview>
    </>
  );
};

export default SummaryView;
