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
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
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
    setSendConfModalisOpen,
    onBack,
    maxKgAutoClose,
    listingFormData,
    setMaxKgAutoClose,
  } = props;
  const history = useHistory();

  const handleSubmit = () => {
    setSendConfModalisOpen(true);
  };

  const SummaryBadges = (props: { items: string[]; label: string }) => {
    const { items, label } = props;

    if (!items) return <></>;

    const tagsMarkup = items.map((item, index) => (
      <Badge
        key={index}
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

  const sizeSummary = () => {
    if (selectedSize.ungraded === true) {
      return <SummaryBadges label="Size" items={['Ungraded']} />;
    }

    if (selectedSize.from !== '') {
      return (
        <Row>
          <Col sm={12} md={12}>
            <StyledTextField
              className="text-field"
              type="number"
              label="Size From"
              value={selectedSize.from}
              disabled
            />
          </Col>
          <Col sm={12} md={12}>
            <StyledTextField
              className="text-field"
              type="number"
              label="Size To"
              value={selectedSize.to}
              disabled
            />
          </Col>
        </Row>
      );
    } else {
      return <SummaryBadges label="Size" items={['Ungraded']} />;
    }
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
          imgSrc={listingFormData?.defaultPhoto}
          caption="Aliquip ullamco dolore amet sunt ullamco. 
  Voluptate aliquip velit et commodo reprehenderit tempor laboris amet. 
  Sint ea nulla velit mollit amet sint esa."
        />
        <SummaryContentContainer>
          <SummaryBadges
            label="Specs"
            items={selectedSpecifications.items.map((spec) => spec.label)}
          />
          <div className="size-container">{sizeSummary()}</div>
          <div className="quantity-container">
            <StyledTextField
              className="text-field"
              type="number"
              label="From"
              value={selectedQuantity.from}
              disabled
              LeftComponent={
                <TypographyView variant="label" color="shade6">
                  {formatMeasurementUnit(listingFormData?.measurementUnit)}
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
                  {formatMeasurementUnit(listingFormData?.measurementUnit)}
                </TypographyView>
              }
            />
            <Checkbox
              checked={maxKgAutoClose}
              onClick={() => setMaxKgAutoClose(!maxKgAutoClose)}
              label="Auto-close this listing when reached max kg"
            ></Checkbox>
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
