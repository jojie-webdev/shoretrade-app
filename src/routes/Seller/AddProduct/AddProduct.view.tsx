import React, { useEffect, useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
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
} from './AddProduct.style';
import ChooseAccount from './ChooseAccount/ChooseAccount.view';
import ChooseSize from './ChooseSize/ChooseSize.view';
import ChooseSpecifications from './ChooseSpecifications/ChooseSpecifications.view';
import ChooseType from './ChooseType/ChooseType.view';
import Review from './Review/Review.view';

const AddProductView = (props: AddProductGeneratedProps) => {
  // const theme = useTheme();

  const {
    currentPage,
    onChangeCurrentPage,
    accountOptions,
    onSelectAccount,
    search,
    searchResults,
    pendingSearch,
    selectProductType,
    showCustomTypeSettings,
    setShowCustomTypeSettings,
    getCustomFormData,
    categories,
    selectCustomType,
    typeName,
    listingFormData,
    editableListing,
    onSelectSpecifications,
    isCustomType,
    onSelectSizes,
    onUpdateImage,
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
  } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  //#region Modified Search
  const [searchKey, setSearchKey] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  useEffect(() => {
    setSearchKey(searchKey);

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    if (searchKey.length > 2) {
      const timerId = setTimeout(() => {
        search(searchKey);
        setIsTriggered(true);
      }, 800);
      setTimer(timerId);
    } else if (setSearchKey.length <= 2 && isEmpty(searchResults)) {
      search('');
    }
  }, [searchKey]);
  //#endregion

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
      case 2:
        return (
          <ChooseType
            editableListing={editableListing}
            showCustomTypeSettings={showCustomTypeSettings}
            setShowCustomTypeSettings={setShowCustomTypeSettings}
            search={search}
            searchResults={searchResults}
            pendingSearch={pendingSearch}
            selectProductType={selectProductType}
            categories={categories}
            getCustomFormData={getCustomFormData}
            selectCustomType={selectCustomType}
            navBack={navBack}
            desktopSearchValue={searchKey}
          />
        );
      case 3:
        return (
          <ChooseSpecifications
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            navBack={navBack}
            onSelectSpecifications={onSelectSpecifications}
          />
        );
      case 4:
        return (
          <ChooseSize
            editableListing={editableListing}
            listingFormData={listingFormData}
            isCustomType={isCustomType}
            navBack={navBack}
            onSelectSizes={onSelectSizes}
          />
        );
      case 5:
        return (
          <AddPhotos
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            navBack={navBack}
            onUpdateImage={onUpdateImage}
          />
        );
      case 6:
        return (
          <AddPackaging
            editableListing={editableListing}
            listingFormData={listingFormData}
            onAddPackaging={onAddPackaging}
            navBack={navBack}
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
            isExisting={isExisting}
          />
        );
      case 8:
        return (
          <AddDetails
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            onUpdateDetails={onUpdateDetails}
            navBack={navBack}
            marketEstimate={marketEstimate}
          />
        );
      case 9:
        return (
          <Review
            measurementUnit={measurementUnit}
            boxesDetails={boxesDetails}
            onChangeCurrentPage={onChangeCurrentPage}
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            saveListing={saveListing}
            navBack={navBack}
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
        return 'Enter Type';
      case 4:
        return 'Set Size';
      case 5:
        return 'Upload Photos';
      case 6:
        return 'Select Packaging';
      case 7:
        return 'Add Boxes';
      case 8:
        return 'Details';
      case 9:
        return 'Summary';
      default:
        return 'Summary';
    }
  };

  useEffect(() => {
    setTitle(pageTitle());
  }, [currentPage, searchResults]);

  const actualCurrentPage = currentPage - 1;
  return (
    <Container>
      {currentPage > 1 && (
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
        {isMobile && <MobileHeader>Add a Product</MobileHeader>}

        {currentPage > 1 && (
          <Typography variant="overline" color="shade6">
            Step {currentPage - 1} - 8
          </Typography>
        )}

        <InnerHeaderContainer currentPage={currentPage}>
          <InnerRouteHeader
            title={currentPage > 1 && !isMobile ? title : ''}
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
            subtitle={currentPage > 2 && isMobile ? typeName : undefined}
            addProductSubtitle={currentPage > 2 && isMobile ? true : false}
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
