import React, { useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import {
  Crab,
  AnchorHero,
  CaviarHero,
  OctopusHero,
  TexturedCrab,
  TexturedOctopus,
  TexturedSwordFish,
  Wave41,
  Group196,
  Wave31,
  Group195,
  Wave51,
  Group194,
} from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography/Typography.view';
import ConfirmationModal from 'components/module/ConfirmationModal';
import NumberedHeroView from 'components/module/NumberedHero';
import { Col, Hidden, Row, Visible } from 'react-grid-system';
import { getTermsAndConditions } from 'utils/Links';

import CategorySelectionView from './CategorySelection/CategorySelection.view';
import { CreateRequestGeneratedProps, CreateRequestStep } from './Create.props';
import {
  HeroImageContainer,
  TextAgreementContainer,
  MainAgreementContainer,
  HeroContainer,
  ProgressBar,
  HeaderContainer,
  GetStartedButton,
  TopAbsoContainer,
  TopGroupContainer,
  BottomAbsoContainer,
  BottomGroupContainer,
  LeftAbsoContainer,
  LeftGroupContainer,
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
    addressOptions,
    selectedAddress,
    setSelectedAddress,
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

  const agreementGuides = [
    {
      number: 1,
      title:
        'Search in our Database and choose between more than 50+  Categories ',
      heroImage: <TexturedOctopus />,
    },
    {
      number: 2,
      title:
        'Select specifications, size, quantity and send your request to the market',
      heroImage: <TexturedSwordFish />,
    },
    {
      number: 3,
      title:
        'Check and negotiate offers from more than 10.000+ sellers from ShoreTrade ',
      heroImage: <TexturedCrab />,
    },
  ];

  if (!termsAgreement) {
    return (
      <MainAgreementContainer>
        <TextAgreementContainer>
          {/* BEGIN MOBILE */}
          <Visible xs>
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
                There are hundreds of products in our database that you can
                request from. Once your request has been sent, you have the
                ability to review, negotiate, decline or accept your offers. The
                seller will arrange freight and you will be able to view the
                real time tracking of your products.
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
          </Visible>
          {/* END MOBILE */}
          <Hidden xs>
            <TopAbsoContainer>
              <Wave41 />
            </TopAbsoContainer>
            <TopGroupContainer>
              <Group196 />
            </TopGroupContainer>
            <BottomAbsoContainer>
              <Wave31 />
            </BottomAbsoContainer>
            <BottomGroupContainer>
              <Group195 />
            </BottomGroupContainer>
            <LeftAbsoContainer>
              <Wave51 />
            </LeftAbsoContainer>
            <LeftGroupContainer>
              <Group194 />
            </LeftGroupContainer>
            <Row gutterWidth={40}>
              <Col>
                <HeaderContainer>
                  <TypographyView variant="label" color="shade7">
                    Can&apos;t find your product?
                  </TypographyView>
                  <TypographyView
                    weight="700"
                    variant="title5"
                    style={{ fontFamily: 'Media Sans' }}
                  >
                    Create a new Market Request
                  </TypographyView>
                </HeaderContainer>
              </Col>
            </Row>
            <div>
              <Row gutterWidth={24}>
                {agreementGuides.map((item) => {
                  return (
                    <Col key={item.number} sm={12} md={12} lg={12} xl={4}>
                      <NumberedHeroView
                        number={item.number}
                        title={item.title}
                        heroImage={item.heroImage}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Hidden>
          <Visible xs>
            <HeroContainer>
              <HeroImageContainer>
                <Crab />
              </HeroImageContainer>
            </HeroContainer>
          </Visible>
        </TextAgreementContainer>
        <div>
          <div className="checkbox">
            <Checkbox
              onClick={(v: any) => handleCheck(v)}
              className="checkbox"
              checked={checkAgree}
            />
            <Typography className="label" variant="label" color="shade7">
              Accept{' '}
              <span
                className="terms-and-conditions"
                onClick={() => getTermsAndConditions()}
              >
                Terms &amp; Conditions
              </span>
            </Typography>
          </div>
          <GetStartedButton
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
            addressOptions={addressOptions}
            selectedAddress={selectedAddress}
            onChangeAddress={(a) => setSelectedAddress(a)}
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
      <ProgressBar progress={(step.current / step.total) * 100} />
      {StepView({ step })}
    </>
  );
};

export default CreateRequestLandingView;
