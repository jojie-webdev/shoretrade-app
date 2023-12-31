import React, { useEffect, useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { useMediaQuery } from 'react-responsive';

import AddBoxes from './AddBoxes/AddBoxes.view';
import AddDetails from './AddDetails/AddDetails.view';
import AddPackaging from './AddPackaging/AddPackaging.view';
import AddPhotos from './AddPhotos/AddPhotos.view';
import { AddProductGeneratedProps } from './AddProduct.props';
import {
  Container,
  ProgressIndicator,
  SearchContainerDesktop,
  InnerHeaderContainer,
  ExitContainer,
} from './AddProduct.style';
import ChooseAccount from './ChooseAccount/ChooseAccount.view';
import ChooseSize from './ChooseSize/ChooseSize.view';
import ChooseSpecifications from './ChooseSpecifications/ChooseSpecifications.view';
import ChooseType from './ChooseType/ChooseType.view';
import HistoricalListings from './HistoricalListings/HistoricalListings.view';
import Review from './Review/Review.view';

const AddProductView = (props: AddProductGeneratedProps) => {
  // const theme = useTheme();

  const {
    currentPage,
    onChangeCurrentPage,
    accountOptions,
    searchHistoricalListings,
    historicalListings,
    onSkipHistoricalListings,
    onUseHistoricalListing,
    onSelectAccount,
    search,
    searchResults,
    productsToSell,
    pendingSearch,
    selectProductType,
    showCustomTypeSettings,
    setShowCustomTypeSettings,
    getCustomFormData,
    categories,
    selectCustomType,
    typeName,
    typeMarginCategory,
    listingFormData,
    editableListing,
    onSelectSpecifications,
    isCustomType,
    isGstIncl,
    onSelectSizes,
    onUpdateImage,
    onSetProductPhotoType,
    onAddPackaging,
    onAddBoxes,
    onUpdateDetails,
    saveListing,
    pendingSave,
    isExisting,
    discardChanges,
    preview,
    marketEstimate,
    onUploadCSV,
    boxesDetails,
    measurementUnit,
    isUploadingCSV,
    userPending,
    isBulkUpload,
    discardBulkUploadChanges,
    navBack,
    exitFlow,
    additionalInfos,
    updateAdditionalInfos,
    isFromBulkUploadPreview,
    nswHolidays,
  } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  //#region Modified Search
  const [searchKey, setSearchKey] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    if (searchKey.length > 2) {
      const timerId = setTimeout(() => {
        search(searchKey);
        setIsTriggered(true);
      }, 200);
      setTimer(timerId);
    } else if (searchKey.length <= 2 && isEmpty(searchResults)) {
      search('');
    }
    // eslint-disable-next-line
  }, [searchKey]);
  //#endregion1

  useEffect(() => {
    if (currentPage === 1 || currentPage === 1.5) {
      setSearchKey('');
    }
  }, [currentPage]);

  const currentStep = () => {
    switch (currentPage) {
      default:
      case 1:
        return (
          <ChooseAccount
            accountOptions={accountOptions}
            onSelectAccount={onSelectAccount}
            onUploadCSV={onUploadCSV}
            isUploadingCSV={isUploadingCSV}
            userPending={userPending}
          />
        );
      case 1.5:
        return (
          <HistoricalListings
            searchHistoricalListings={searchHistoricalListings}
            historicalListings={historicalListings}
            navBack={navBack}
            onSkipHistoricalListings={onSkipHistoricalListings}
            onUseHistoricalListing={onUseHistoricalListing}
          />
        );
      case 2:
        return (
          <ChooseType
            editableListing={editableListing}
            showCustomTypeSettings={showCustomTypeSettings}
            setShowCustomTypeSettings={setShowCustomTypeSettings}
            search={search}
            searchResults={searchResults}
            productsToSell={productsToSell}
            pendingSearch={pendingSearch}
            selectProductType={selectProductType}
            categories={categories}
            getCustomFormData={getCustomFormData}
            exitFlow={exitFlow}
            selectCustomType={selectCustomType}
            navBack={navBack}
            desktopSearchValue={searchKey}
            disableBackBtn={isFromBulkUploadPreview}
          />
        );
      case 3:
        return (
          <ChooseSpecifications
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            categories={categories}
            additionalInfos={additionalInfos}
            navBack={navBack}
            exitFlow={exitFlow}
            onSelectSpecifications={onSelectSpecifications}
            updateAdditionalInfos={updateAdditionalInfos}
            disableBackBtn={isFromBulkUploadPreview}
          />
        );
      case 4:
        return (
          <ChooseSize
            editableListing={editableListing}
            listingFormData={listingFormData}
            isCustomType={isCustomType}
            navBack={navBack}
            exitFlow={exitFlow}
            onSelectSizes={onSelectSizes}
            disableBackBtn={isFromBulkUploadPreview}
          />
        );
      case 5:
        return (
          <AddPhotos
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            navBack={navBack}
            exitFlow={exitFlow}
            onUpdateImage={onUpdateImage}
            onSetProductPhotoType={onSetProductPhotoType}
            disableBackBtn={isFromBulkUploadPreview}
          />
        );
      case 6:
        return (
          <AddPackaging
            editableListing={editableListing}
            listingFormData={listingFormData}
            onAddPackaging={onAddPackaging}
            navBack={navBack}
            exitFlow={exitFlow}
            disableBackBtn={isFromBulkUploadPreview}
          />
        );
      case 7:
        return (
          <AddBoxes
            isBulkUpload={isBulkUpload}
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            onAddBoxes={onAddBoxes}
            navBack={navBack}
            exitFlow={exitFlow}
            isExisting={isExisting}
            disableBackBtn={isFromBulkUploadPreview}
          />
        );
      case 8:
        return (
          <AddDetails
            isBulkUpload={isBulkUpload}
            isCustomType={isCustomType}
            isGstIncl={isGstIncl}
            editableListing={editableListing}
            listingFormData={listingFormData}
            onUpdateDetails={onUpdateDetails}
            navBack={navBack}
            exitFlow={exitFlow}
            marketEstimate={marketEstimate}
            disableBackBtn={isFromBulkUploadPreview}
            nswHolidays={nswHolidays}
          />
        );
      case 9:
        return (
          <Review
            measurementUnit={measurementUnit}
            boxesDetails={boxesDetails}
            onChangeCurrentPage={onChangeCurrentPage}
            typeMarginCategory={typeMarginCategory}
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            saveListing={saveListing}
            navBack={navBack}
            exitFlow={exitFlow}
            preview={preview}
            pendingSave={pendingSave}
            isBulkUpload={isBulkUpload}
          />
        );
    }
  };

  const [title, setTitle] = useState('Summary');
  const pageTitle = () => {
    switch (currentPage) {
      case 2:
        return showCustomTypeSettings
          ? 'Custom Type'
          : !isTriggered || searchResults.length > 0
          ? 'Product Type'
          : 'No Results found';
      case 3:
        return 'Select Product Specifications';
      case 4:
        return 'Set Size';
      case 5:
        return 'Upload Photos';
      case 6:
        return 'Select Packaging';
      case 7:
        return 'Add Boxes';
      case 8:
        return 'Listing Details';
      case 9:
        return 'Summary';
      default:
        return 'Summary';
    }
  };

  useEffect(() => {
    setTitle(pageTitle());
    // eslint-disable-next-line
  }, [currentPage, searchResults]);

  const actualCurrentPage = currentPage - 1;
  return (
    <Container>
      {currentPage > 1.5 && (
        <ProgressIndicator
          style={{ width: `${(actualCurrentPage / 8) * 100}%` }}
        />
      )}
      <div>
        {userPending && (
          <Alert
            variant="alert"
            content={`Your account needs approval.`}
            fullWidth
            alignText="center"
            style={{ marginBottom: 16 }}
          />
        )}
        {isMobile && (
          <MobileHeader>
            {isExisting ? 'Edit a Listing' : 'Add a Listing'}
          </MobileHeader>
        )}
        {currentPage > 1.5 && (
          <Typography variant="overline" color="shade6">
            Step {currentPage - 1} - 8
          </Typography>
        )}

        <InnerHeaderContainer currentPage={currentPage} isFlex={true}>
          <InnerRouteHeader
            title={currentPage > 1.5 ? title : ''}
            onClickBack={() => {
              if (isExisting) {
                if (currentPage === 9) {
                  discardChanges();
                } else {
                  onChangeCurrentPage(9);
                }
              } else if (isBulkUpload) {
                discardBulkUploadChanges();
              } else {
                onChangeCurrentPage(currentPage - 1);
              }
            }}
            showIcon={false}
          />
          {currentPage === 2 && !isMobile && (
            <SearchContainerDesktop>
              <Search
                value={searchKey}
                placeholder="e.g. Ocean Trout"
                onChange={(e) => setSearchKey(e.currentTarget.value)}
                resetValue={() => setSearchKey('')}
              />
            </SearchContainerDesktop>
          )}
        </InnerHeaderContainer>
      </div>
      {currentStep()}
    </Container>
  );
};

export default AddProductView;
