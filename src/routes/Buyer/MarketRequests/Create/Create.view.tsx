import React, { useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { Crab } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography/Typography.view';
import { BoxContainer } from 'components/layout/BoxContainer';
import ConfirmationModal from 'components/module/ConfirmationModal';

import CategorySelectionView from './CategorySelection/CategorySelection.view';
import { CreateRequestGeneratedProps, CreateRequestStep } from './Create.props';
import {
  HeroImageContainer,
  TextAgreenmentContainer,
  MainAgreementContainer,
  HeroContainer,
  ProgressBar,
} from './Create.style';
import SelectQuantityView from './SelectQuantity/SelectQuantity.view';
import SelectSizeView from './SelectSize/SelectSize.view';
import SelectSpecificationsView from './SelectSpecifications/SelectSpecifications.view';
import SummaryView from './Summary/Summary.view';

const CreateRequestLandingView = (props: CreateRequestGeneratedProps) => {
  const {
    step,
    sendConfModalisOpen,
    setSendConfModalisOpen,
    termsAgreement,
    setTermsAgreement,
    setStep,
    hideSearchResult,
    searchTerm,
    setSearchTerm,
    buying,
    onBack,
    selectedQuantity,
    selectedCategory,
    selectedSize,
    selectedSpecifications,
    setSelectedCategory,
    setSelectedQuantity,
    setSelectedSize,
    setSelectedSpecifications,
    listingFormData,
    typeSearchResults,
    onSubmitRequest,
    search,
    pendingSearch,
  } = props;
  const [checkAgree, setCheckAgree] = useState(false);
  const handleCheck = (v: any) => {
    setCheckAgree(!checkAgree);
  };

  const handleGetStarted = () => {
    setTermsAgreement(true);
    setSearchTerm('');
    setStep(1);
  };

  const onSubmit = () => {
    onSubmitRequest();
  };

  if (!termsAgreement) {
    return (
      <BoxContainer>
        <MainAgreementContainer>
          <TextAgreenmentContainer>
            <div>
              <TypographyView variant="title4">Market Request</TypographyView>
              <TypographyView
                className="text-content"
                variant="label"
                color="shade7"
              >
                A Market Request sends a notification directly to our sellers,
                detailing the product, specifications, size and quantity you
                want, allowing them to make an offer directly to your business.
              </TypographyView>
              <TypographyView
                className="text-content"
                variant="label"
                color="shade7"
              >
                There are over 600 products in our database that you can request
                from. Once your request has been sent, you can review, negotiate
                and/or accept your offers. The seller will arrange freight and
                you will be able to view the real time tracking of your
                products.
              </TypographyView>
              <TypographyView
                className="text-content"
                variant="label"
                color="shade7"
              >
                Your market request will automatically close after 7 days or
                once the maximum quantity requested has been reached.
              </TypographyView>
            </div>
            <HeroContainer>
              <HeroImageContainer>
                <Crab />
              </HeroImageContainer>
            </HeroContainer>
          </TextAgreenmentContainer>
          <div>
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
              takeFullWidth
              className="btn-get-started"
              disabled={!checkAgree}
              variant="primary"
              text="Get Started"
              onClick={() => {
                handleGetStarted();
              }}
            />
          </div>
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
            setStep={setStep}
            hideSearchResult={hideSearchResult}
            pendingSearch={pendingSearch}
            search={search}
            selectedSize={selectedSize}
            listingFormData={listingFormData}
            typeSearchResults={typeSearchResults}
            onBack={onBack}
            setSelectedCategory={setSelectedCategory}
            buying={buying}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            step={step}
            stepCountComponent={<StepCountComponent step={step} />}
          />
        );

      case 2:
        return (
          <SelectSpecificationsView
            setStep={setStep}
            selectedSpecifications={selectedSpecifications}
            selectedSize={selectedSize}
            listingFormData={listingFormData}
            setSelectedSpecifications={setSelectedSpecifications}
            selectedCategory={selectedCategory}
            onBack={onBack}
            step={step}
            stepCountComponent={<StepCountComponent step={step} />}
          />
        );

      case 3:
        return (
          <SelectSizeView
            setStep={setStep}
            selectedSize={selectedSize}
            listingFormData={listingFormData}
            setSelectedSize={setSelectedSize}
            selectedCategory={selectedCategory}
            onBack={onBack}
            step={step}
            stepCountComponent={<StepCountComponent step={step} />}
          />
        );

      case 4:
        return (
          <SelectQuantityView
            setStep={setStep}
            selectedQuantity={selectedQuantity}
            selectedSize={selectedSize}
            listingFormData={listingFormData}
            setSelectedQuantity={setSelectedQuantity}
            selectedCategory={selectedCategory}
            onBack={onBack}
            step={step}
            stepCountComponent={<StepCountComponent step={step} />}
          />
        );

      case 5:
        return (
          <SummaryView
            setStep={setStep}
            listingFormData={listingFormData}
            setSendConfModalisOpen={setSendConfModalisOpen}
            selectedSize={selectedSize}
            selectedCategory={selectedCategory}
            selectedSpecifications={selectedSpecifications}
            selectedQuantity={selectedQuantity}
            onBack={onBack}
            step={step}
            stepCountComponent={<StepCountComponent step={step} />}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={sendConfModalisOpen}
        title="Your request is ready to be sent to the market"
        description="Are you sure you want to send this request to the market?"
        action={() => {
          onSubmit();
        }}
        actionText="YES"
        cancelText="NO"
        onClickClose={() => setSendConfModalisOpen(false)}
      />
      <BoxContainer>
        <ProgressBar progress={(step.current / step.total) * 100} />
        {StepView({ step })}
      </BoxContainer>
    </>
  );
};

export default CreateRequestLandingView;
