import React, { useEffect, useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { useMediaQuery } from 'react-responsive';

import { AddProductGeneratedProps } from './AddProduct.props';
import {
  Container,
  ProgressIndicator,
  SearchContainerDesktop,
  InnerHeaderContainer,
} from './AddProduct.style';
import Step0 from './Step0/Step0.view';
import Step1 from './Step1/Step1.view';
import Step2 from './Step2/Step2.view';
import Step3 from './Step3/Step3.view';
import Step4 from './Step4/Step4.view';
import Step5 from './Step5/Step5.view';
import Step6 from './Step6/Step6.view';
import Step7 from './Step7/Step7.view';

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
    onAddBoxes,
    onUpdateDetails,
    saveListing,
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
          <Step0
            accountOptions={accountOptions}
            onSelectAccount={onSelectAccount}
            onUploadCSV={onUploadCSV}
            isUploadingCSV={isUploadingCSV}
            userPending={userPending}
          />
        );
      case 2:
        return (
          <Step1
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
          <Step2
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            navBack={navBack}
            onSelectSpecifications={onSelectSpecifications}
          />
        );
      case 4:
        return (
          <Step3
            editableListing={editableListing}
            listingFormData={listingFormData}
            isCustomType={isCustomType}
            navBack={navBack}
            onSelectSizes={onSelectSizes}
          />
        );
      case 5:
        return (
          <Step4
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            navBack={navBack}
            onUpdateImage={onUpdateImage}
          />
        );
      case 6:
        return (
          <Step5
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            onAddBoxes={onAddBoxes}
            navBack={navBack}
            isExisting={isExisting}
          />
        );
      case 7:
        return (
          <Step6
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            onUpdateDetails={onUpdateDetails}
            navBack={navBack}
            marketEstimate={marketEstimate}
          />
        );
      case 8:
        return (
          <Step7
            measurementUnit={measurementUnit}
            boxesDetails={boxesDetails}
            onChangeCurrentPage={onChangeCurrentPage}
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            saveListing={saveListing}
            navBack={navBack}
            preview={preview}
          />
        );
    }
  };

  const [title, setTitle] = useState('Summary');
  const pageTitle = () => {
    switch (currentPage) {
      case 1:
        return 'Product Type';

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
        return 'Upload Boxes';
      case 7:
        return 'Details';
      case 8:
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
          style={{ width: `${(actualCurrentPage / 7) * 100}%` }}
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
          <Typography
            variant="title5"
            color="noshade"
            className="title-step-text "
          >
            Add a Product
          </Typography>
        )}

        {currentPage > 1 && (
          <Typography variant="overline" color="shade6">
            Step {currentPage - 1} / 7
          </Typography>
        )}

        <InnerHeaderContainer currentPage={currentPage}>
          <InnerRouteHeader
            title={currentPage > 1 && !isMobile ? title : ''}
            onClickBack={() => {
              if (isExisting) {
                if (currentPage === 8) {
                  discardChanges();
                } else {
                  onChangeCurrentPage(8);
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
