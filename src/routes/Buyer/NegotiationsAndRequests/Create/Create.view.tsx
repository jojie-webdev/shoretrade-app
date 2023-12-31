import React, { useState } from 'react';

import Checkbox from 'components/base/Checkbox';
import {
  Crab,
  TexturedCrab,
  TexturedOctopus,
  TexturedSwordFish,
  Wave41,
  Group196,
  Wave31,
  Group195,
  Wave51,
  Group194,
  Cross7,
  NewWave51,
  WaveNew31,
} from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography/Typography.view';
import ConfirmationModal from 'components/module/ConfirmationModal';
import LoadingOverlay from 'components/module/LoadingOverlay';
import NumberedHeroView from 'components/module/NumberedHero';
import { groupBy } from 'ramda';
import { Col, Hidden, Row, Visible } from 'react-grid-system';
import { getTermsAndConditions } from 'utils/Links';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/SFMTheme';

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
  DetailsContentContainer,
  DetailsDataContainer,
  MultipleBottomGroupContainer,
  MultipleLeftAbsoContainer,
  MultipleLeftGroupContainer,
  MultipleTopAbsoContainer,
  MultipleTopGroupContainer,
  DetailsHeaderContainer,
  CreateRequestContainer,
  FishermanNoteValue,
  FishermanNoteLabel,
  FishermanNoteHeader,
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
    updateCategory,
    didFinishStep,
    setDidFinishStep,
    isLoadingCreate,
    onConfirmSentRequest,
    showRequestSentModal,
  } = props;

  const theme = useTheme();

  const [checkAgree, setCheckAgree] = useState(false);
  const handleCheck = (v: any) => {
    setCheckAgree(!checkAgree);
  };

  const handleGetStarted = () => {
    setTermsAgreement(true);
    setSearchTerm('');
    setStep(1);
  };

  const groupSpecs = groupBy((a: any) => `group${a.groupOrder}`)(
    selectedSpecifications.items || []
  );

  const onSubmit = () => {
    setSendConfModalisOpen(false);
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
                  <TypographyView weight="700" variant="title5" altFont>
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

  const DetailsComponent = () => {
    const measurement = formatMeasurementUnit(listingFormData?.measurementUnit);
    return (
      <>
        <DetailsHeaderContainer>
          <FishermanNoteHeader
            customFont={!theme.isSFM ? 'Wilderness' : undefined}
          >
            Summary
          </FishermanNoteHeader>
          <FishermanNoteHeader
            customFont={!theme.isSFM ? 'Wilderness' : undefined}
          >
            {selectedCategory?.name}
          </FishermanNoteHeader>
        </DetailsHeaderContainer>
        {/* eslint-disable-next-line react/prop-types */}
        {selectedSpecifications.items.length > 0 && (
          <DetailsContentContainer>
            {Object.keys(groupSpecs).map((group, index) => {
              return (
                <div key={index} className="multi">
                  <FishermanNoteLabel
                    customFont={!theme.isSFM ? 'Wilderness' : undefined}
                    color="shade6"
                    variant="label"
                  >
                    Specs: {index + 1}
                  </FishermanNoteLabel>
                  <DetailsDataContainer>
                    <Cross7 />
                    <FishermanNoteValue
                      color="shade9"
                      variant="label"
                      customFont={!theme.isSFM ? 'Wilderness' : undefined}
                    >
                      {groupSpecs[group].map(
                        (spec, i, arr) =>
                          `${spec.label}${i < arr.length - 1 ? ', ' : ''}`
                      )}
                    </FishermanNoteValue>
                  </DetailsDataContainer>
                </div>
              );
            })}
          </DetailsContentContainer>
        )}
        {((selectedSize?.items.length > 0 && selectedSize?.items[0] !== '') ||
          selectedSize?.from !== '') && (
          <DetailsContentContainer>
            <FishermanNoteLabel
              color="shade6"
              variant="label"
              customFont={!theme.isSFM ? 'Wilderness' : undefined}
            >
              Size:
            </FishermanNoteLabel>
            <DetailsDataContainer>
              <Cross7 />
              <FishermanNoteValue
                color="shade9"
                variant="label"
                customFont={!theme.isSFM ? 'Wilderness' : undefined}
              >
                {selectedSize?.items[0] !== '' && !selectedSize?.from
                  ? selectedSize?.items?.map((i, index) => {
                      return index === selectedSpecifications?.items.length - 1
                        ? `${i} `
                        : `${i}, `;
                    })
                  : `${
                      selectedSize?.from
                    }${listingFormData?.metric?.name?.toLowerCase()} ${
                      selectedSize?.to &&
                      `- ${
                        selectedSize?.to
                      }${listingFormData?.metric?.name?.toLowerCase()}`
                    }`}
              </FishermanNoteValue>
            </DetailsDataContainer>
          </DetailsContentContainer>
        )}
        {selectedQuantity?.from && (
          <DetailsContentContainer>
            <FishermanNoteLabel
              color="shade6"
              variant="label"
              customFont={!theme.isSFM ? 'Wilderness' : undefined}
            >
              Quantity:
            </FishermanNoteLabel>
            <DetailsDataContainer>
              <Cross7 />
              <FishermanNoteValue
                color="shade9"
                variant="label"
                customFont={!theme.isSFM ? 'Wilderness' : undefined}
              >
                {`${selectedQuantity?.from}${measurement} ${
                  selectedQuantity?.to &&
                  `- ${selectedQuantity?.to}${measurement}`
                }`}
              </FishermanNoteValue>
            </DetailsDataContainer>
          </DetailsContentContainer>
        )}
      </>
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
            updateCategory={updateCategory}
            didFinishStep={didFinishStep}
            setDidFinishStep={setDidFinishStep}
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
            selectedQuantity={selectedQuantity}
            didFinishStep={didFinishStep}
            detailsListComponent={<DetailsComponent />}
            setDidFinishStep={setDidFinishStep}
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
            selectedSpecifications={selectedSpecifications}
            selectedQuantity={selectedQuantity}
            detailsListComponent={<DetailsComponent />}
            didFinishStep={didFinishStep}
            setDidFinishStep={setDidFinishStep}
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
            selectedSpecifications={selectedSpecifications}
            detailsListComponent={<DetailsComponent />}
            didFinishStep={didFinishStep}
            setDidFinishStep={setDidFinishStep}
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
            detailsListComponent={<DetailsComponent />}
            didFinishStep={didFinishStep}
            setDidFinishStep={setDidFinishStep}
          />
        );

      default:
        return <></>;
    }
  };

  if (isLoadingCreate) {
    return <LoadingOverlay />;
  }

  const SentRequestDescription = () => {
    return (
      <div>
        <Typography color="shade7" variant="body">
          Your request has been sent to our network of sellers.
        </Typography>
        <br />
        <Typography altFont color="shade7" variant="body" weight="bold">
          What happens next?
        </Typography>
        <br />
        <Typography color="shade7" variant="body">
          <ol>
            <li>
              You will receive offers directly from our authorised sellers which
              you can accept or negotiate
            </li>
            <li>
              Process payment within 24 hours for accepted offers to finalise
              the order
            </li>
            <li>
              Your Market Request will automatically close after 7 days or once
              your maximum quantity is fulfilled
            </li>
          </ol>
        </Typography>
        <Typography color="shade7" variant="body">
          You can review your requests and offers in my ‘Market Requests’
        </Typography>
      </div>
    );
  };

  if (showRequestSentModal) {
    return (
      <ConfirmationModal
        isOpen={showRequestSentModal}
        onClickClose={() => onConfirmSentRequest()}
        title="Market Request Sent"
        action={() => onConfirmSentRequest()}
        actionText="View Requests"
        hideCancel={true}
        description={<SentRequestDescription />}
      />
    );
  }

  return (
    <CreateRequestContainer>
      <ConfirmationModal
        isOpen={sendConfModalisOpen}
        title="Let us confirm your Market Request"
        description="Are you sure you want to send this request to the market?"
        action={() => {
          onSubmit();
        }}
        actionText="YES"
        cancelText="NO"
        onClickClose={() => setSendConfModalisOpen(false)}
        style={{ width: 686, borderRadius: 12 }}
      />
      {StepView({ step })}
      <ProgressBar progress={(step.current / step.total) * 100} />
      {step.current > 1 && (
        <Hidden xs sm>
          <MultipleTopAbsoContainer>
            <WaveNew31 />
          </MultipleTopAbsoContainer>
          <MultipleTopGroupContainer>
            <Group194 />
          </MultipleTopGroupContainer>
          <MultipleBottomGroupContainer>
            <Group195 />
          </MultipleBottomGroupContainer>
          <MultipleLeftAbsoContainer>
            <NewWave51 />
          </MultipleLeftAbsoContainer>
          <MultipleLeftGroupContainer>
            <Group196 />
          </MultipleLeftGroupContainer>
        </Hidden>
      )}
    </CreateRequestContainer>
  );
};

export default CreateRequestLandingView;
