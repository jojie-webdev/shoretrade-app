import React from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';

import { AddProductGeneratedProps } from './AddProduct.props';
import { Container, ProgressIndicator } from './AddProduct.style';
import Step1 from './Step1/Step1.view';
import Step2 from './Step2/Step2.view';
import Step3 from './Step3/Step3.view';
import Step4 from './Step4/Step4.view';
import Step5 from './Step5/Step5.view';
import Step6 from './Step6/Step6.view';
import Step7 from './Step7/Step7.view';
import Step8 from './Step8/Step8.view';

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
  } = props;

  const currentStep = () => {
    switch (currentPage) {
      default:
      case 1:
        return (
          <Step1
            accountOptions={accountOptions}
            onSelectAccount={onSelectAccount}
            onUploadCSV={onUploadCSV}
            isUploadingCSV={isUploadingCSV}
            userPending={userPending}
          />
        );
      case 2:
        return (
          <Step2
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
          />
        );
      case 3:
        return (
          <Step3
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            onSelectSpecifications={onSelectSpecifications}
          />
        );
      case 4:
        return (
          <Step4
            editableListing={editableListing}
            listingFormData={listingFormData}
            isCustomType={isCustomType}
            onSelectSizes={onSelectSizes}
          />
        );
      case 5:
        return (
          <Step5
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            onUpdateImage={onUpdateImage}
          />
        );
      case 6:
        return (
          <Step6
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            onAddBoxes={onAddBoxes}
            isExisting={isExisting}
          />
        );
      case 7:
        return (
          <Step7
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            onUpdateDetails={onUpdateDetails}
            marketEstimate={marketEstimate}
          />
        );
      case 8:
        return (
          <Step8
            measurementUnit={measurementUnit}
            boxesDetails={boxesDetails}
            onChangeCurrentPage={onChangeCurrentPage}
            isCustomType={isCustomType}
            editableListing={editableListing}
            listingFormData={listingFormData}
            saveListing={saveListing}
            preview={preview}
          />
        );
    }
  };

  const pageTitle = () => {
    switch (currentPage) {
      case 1:
        return 'Product Type';
      case 2:
        return showCustomTypeSettings ? 'Custom Type' : 'Product Type';
      case 3:
        return 'Enter Type';
      case 4:
        return 'Enter Size';
      case 5:
        return 'Add Photos';
      case 6:
        return 'Enter Boxes';
      case 7:
        return 'Details';
      case 8:
        return 'Summary';

      default:
        return 'Summary';
    }
  };

  return (
    <Container>
      <ProgressIndicator style={{ width: `${(currentPage / 8) * 100}%` }} />
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
        <Typography variant="overline" color="shade6">
          Step {currentPage} / 8
        </Typography>
        <InnerRouteHeader
          title={pageTitle()}
          onClickBack={() => {
            if (isExisting) {
              if (currentPage === 8) {
                discardChanges();
              } else {
                onChangeCurrentPage(8);
              }
            } else {
              onChangeCurrentPage(currentPage - 1);
            }
          }}
          showIcon={currentPage !== 1}
          subtitle={currentPage > 2 ? typeName : undefined}
        />
      </div>
      {currentStep()}
    </Container>
  );
};

export default AddProductView;
