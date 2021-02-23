import React, { useEffect, useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import { ButtonContainer } from 'components/base/Button/Button.style';
import Checkbox from 'components/base/Checkbox';
import Spinner from 'components/base/Spinner';
import { Crab, Filter } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography/Typography.view';
import { BoxContainer } from 'components/layout/BoxContainer';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { useHistory, Link } from 'react-router-dom';
import theme from 'utils/Theme';

import CategorySelectionView from './CategorySelection/CategorySelection.view';
import { CreateRequestGeneratedProps, CreateRequestStep } from './Create.props';
import {
  HeroImageContainer,
  TextAgreenmentContainer,
  MainAgreementContainer,
  HeroRightContainer,
  ProgressBar,
  CreateRequestHeaderContainer,
} from './Create.style';
import SelectSpecificationsView from './SelectSpecifications/SelectSpecifications.view';

const CreateRequestLandingView = (props: CreateRequestGeneratedProps) => {
  const history = useHistory();

  const {
    step,
    termsAgreement,
    setTermsAgreement,
    setStep,
    searchTerm,
    setSearchTerm,
    categories,
    onBack,
    selectedCategory,
    setSelectedCategory,
  } = props;
  const [checkAgree, setCheckAgree] = useState(false);

  const handleCheck = (v: any) => {
    setCheckAgree(!checkAgree);
  };

  const handleGetStarted = () => {
    setTermsAgreement(true);
    setStep(1);
  };

  if (!termsAgreement) {
    return (
      <BoxContainer>
        <MainAgreementContainer>
          <TextAgreenmentContainer>
            <TypographyView variant="title4">Market Request</TypographyView>
            <TypographyView
              className="text-content"
              variant="body"
              color="shade5"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur iure, laudantium doloremque ducimus aliquid enim, quam
              labore omnis deleniti itaque, cupiditate quia molestias error
              obcaecati accusamus ab earum laboriosam autem.
            </TypographyView>
            <div className="checkbox">
              <Checkbox
                onClick={(v: any) => handleCheck(v)}
                className="checkbox"
                checked={checkAgree}
              />
              <Typography className="label" variant="label" color="shade7">
                Accept Terms &amp; Conditions
              </Typography>
            </div>
            <Button
              className="btn-get-started"
              disabled={!checkAgree}
              variant="primary"
              text="Get Started"
              onClick={() => {
                handleGetStarted();
              }}
            />
          </TextAgreenmentContainer>
          <HeroRightContainer>
            <HeroImageContainer>
              <Crab width={310} height={310} />
            </HeroImageContainer>
          </HeroRightContainer>
        </MainAgreementContainer>
      </BoxContainer>
    );
  }

  const StepCountComponent = (props: { step: CreateRequestStep }) => {
    return (
      <TypographyView
        style={{ marginBottom: 6 }}
        variant="overline"
        color="shade6"
      >
        Step {step.current}/{step.total}
      </TypographyView>
    );
  };

  const StepView = (props: { step: CreateRequestStep }) => {
    switch (step.current) {
      case 1:
        return (
          <CategorySelectionView
            onBack={onBack}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            step={step}
            stepCountComponent={<StepCountComponent step={step} />}
          />
        );

      case 2:
        return (
          <SelectSpecificationsView
            selectedCategory={selectedCategory}
            onBack={onBack}
            step={step}
            stepCountComponent={<StepCountComponent step={step} />}
          />
        );

      default:
        return (
          <CategorySelectionView
            onBack={onBack}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            step={step}
            stepCountComponent={<StepCountComponent step={step} />}
          />
        );
    }
  };

  return (
    <>
      <BoxContainer>
        <ProgressBar progress={(step.current / step.total) * 100} />
        <StepView step={step} />
      </BoxContainer>
    </>
  );
};

export default CreateRequestLandingView;
