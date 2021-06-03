import React, { useEffect, useState } from 'react';

import { ADD_PRODUCT_ROUTES, SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import pathOr from 'ramda/src/pathOr';
import pick from 'ramda/src/pick';
import unnest from 'ramda/src/unnest';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import {
  uploadBulkActions,
  editableListingActions,
  searchProductTypeActions,
  updateListingActions,
  createCustomListingActions,
  createListingActions,
  getCustomFormDataActions,
  modifyBulkUploadActions,
} from 'store/actions';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { GetCoopUsersResponseItem } from 'types/store/GetCoopUsersState';
import { Store } from 'types/store/Store';
import { fileToBase64 } from 'utils/File';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';

import { AddProductGeneratedProps } from './AddProduct.props';
import AddProductView from './AddProduct.view';

export const toEmployeeOptions = (user: GetCoopUsersResponseItem) =>
  user.employees
    ? user.employees.map((employee) => ({
        label:
          employee.relationship === 'ADMIN'
            ? user.company
            : `${user.company} - ${employee.firstName} ${employee.lastName}`,
        value: employee.employeeId,
        company: user.company,
      }))
    : {
        label: user.company,
        value: user.ownerEmployeeId,
        company: user.company,
      };

const AddProduct = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const userPending =
    user !== undefined &&
    !(user.companies || []).some((a) =>
      a.addresses.some((b) => b.approved === 'APPROVED')
    );

  const currentPage =
    useSelector((state: Store) => state.editableListing.currentStep) || 1;

  const uploadBulk = useSelector((store: Store) => store.uploadBulk);

  function onChangeCurrentPage(newPage: number) {
    if (newPage >= 1 && newPage <= 8) {
      dispatch(
        editableListingActions.update({
          currentStep: newPage,
        })
      );
    }
  }

  const getUser = useSelector((state: Store) => state.getUser);
  const accounts =
    useSelector((state: Store) => state.getCoopUsers.data?.data.users) || [];
  const employeeList = unnest(accounts.map(toEmployeeOptions));
  const accountOptions = employeeList.map(({ company, ...data }) => data);

  const onSelectAccount = (account: string) => {
    if (account) {
      const company =
        employeeList.find((e) => e.value === account)?.company || '';

      if (company) {
        dispatch(
          editableListingActions.update({
            employee: account,
            company,
          })
        );
        onChangeCurrentPage(2);
      }
    }
  };

  const search = (term: string) => {
    dispatch(
      searchProductTypeActions.request({
        term,
      })
    );
  };

  const searchResults =
    useSelector(
      (state: Store) => state.searchProductType.data?.data.types || []
    ) || [];

  const pendingSearch =
    useSelector((state: Store) => state.searchProductType.pending) || false;

  const selectProductType = (typeId: string) => {
    dispatch(
      editableListingActions.update({
        type: typeId,
      })
    );
    onChangeCurrentPage(3);
  };

  const [showCustomTypeSettings, setShowCustomTypeSettings] = useState(false);

  useEffect(() => {
    if (currentPage === 1 && showCustomTypeSettings) {
      setShowCustomTypeSettings(false);
    }
  }, [currentPage]);

  const getCustomFormData = () => {
    dispatch(getCustomFormDataActions.request());
  };

  const selectCustomType = ({
    customTypeName,
    selectedCategory,
    selectedMetric,
  }: {
    customTypeName: string;
    selectedCategory: string;
    selectedMetric: {
      id: string;
      name: string;
    };
  }) => {
    dispatch(
      editableListingActions.update({
        isCustomType: true,
        customTypeData: {
          name: customTypeName,
          categoryId: selectedCategory,
          metric: {
            id: selectedMetric.id,
            name: selectedMetric.name,
          },
        },
      })
    );
    onChangeCurrentPage(3);
  };

  const categories =
    useSelector(
      (state: Store) => state.getCustomFormData.data?.data.categories
    ) || [];

  const listingFormData =
    useSelector((state: Store) => state.getListingFormData.data?.data) || null;

  const editableListing = useSelector((state: Store) => state.editableListing);

  const modifyBulkUpload = useSelector(
    (state: Store) => state.modifyBulkUpload
  );

  const isCustomType = editableListing?.isCustomType || false;

  const isBulkUpload = modifyBulkUpload.currentData.index !== undefined;

  useEffect(() => {
    if (isCustomType && currentPage !== 1) {
      setShowCustomTypeSettings(true);
    }
  }, [isCustomType]);

  const boxes = (editableListing?.boxes || []).length.toString();

  const boxesDetails = editableListing?.boxes || [];

  const typeName =
    (isCustomType
      ? editableListing?.customTypeData?.name
      : listingFormData?.type.name) || '';

  const onSelectSpecifications = (
    specificationIds: string[],
    specificationLabels: string[]
  ) => {
    if (isBulkUpload) {
      dispatch(
        modifyBulkUploadActions.update({
          ...(!modifyBulkUpload.currentData.type
            ? {
                typeDisplayText: typeName,
                type: editableListing.type,
                sizeFrom: '',
                sizeTo: '',
              }
            : {}),
          specifications: specificationIds,
          specificationsDisplayText: specificationLabels,
        })
      );
    } else {
      dispatch(
        editableListingActions.update({
          states: specificationIds,
        })
      );
      onChangeCurrentPage(4);
    }
  };

  const onSelectSizes = (sizes: {
    sizeFrom?: string;
    sizeTo?: string;
    isUngraded: boolean;
  }) => {
    if (isBulkUpload) {
      dispatch(
        modifyBulkUploadActions.update({
          sizeFrom: sizes.sizeFrom,
          sizeTo: sizes.sizeTo,
          isUngraded: sizes.isUngraded,
        })
      );
    } else {
      dispatch(
        editableListingActions.update({
          sizeFrom: sizes.sizeFrom,
          sizeTo: sizes.sizeTo,
          isUngraded: sizes.isUngraded,
        })
      );
      onChangeCurrentPage(5);
    }
  };

  const isExisting = (editableListing?.currentListingId || '').length > 0;

  const onUpdateImage = async (
    images: Record<string, File | null>,
    existingImages: Record<string, string>,
    callback?: () => void
  ) => {
    const imagesArray = Object.keys(images)
      .map((id) => ({
        requirementId: id,
        image: images[id],
      }))
      .filter((img) => img.image !== null);
    const existingImagesArray = Object.keys(existingImages)
      .map((id) => ({
        requirementId: id,
        image: existingImages[id],
      }))
      .filter((imgData) => imgData.image.length > 0);

    try {
      const base64Images = await Promise.all(
        imagesArray.map((imgData) => fileToBase64(imgData.image))
      );

      dispatch(
        editableListingActions.update({
          images: imagesArray.map((imgData, index) => ({
            image: base64Images[index],
            requirementId: imgData.requirementId,
          })),
          existingImages: existingImagesArray,
        })
      );

      if (isExisting) {
        onChangeCurrentPage(8); // should redirect to review
      } else {
        onChangeCurrentPage(6);
      }
    } catch (error) {
      if (callback) {
        callback();
      }
    }
  };

  const onAddBoxes = ({
    isAquafuture,
    sellInMultiples,
    boxes,
    minimumOrder,
  }: {
    isAquafuture: boolean;
    sellInMultiples: boolean;
    boxes: {
      id: string;
      weight: number;
      quantity: number;
      count?: number;
    }[];
    minimumOrder: string;
  }) => {
    if (isBulkUpload) {
      dispatch(
        modifyBulkUploadActions.update({
          isAquafuture,
          sellInMultiplesOfMinOrder: sellInMultiples,
          boxes,
          minOrder: Number(minimumOrder),
        })
      );
    } else {
      dispatch(
        editableListingActions.update({
          isAquafuture,
          sellInMultiplesOfMinOrder: sellInMultiples,
          boxes,
          minOrder: Number(minimumOrder),
        })
      );
      onChangeCurrentPage(7);
    }
  };

  const marketEstimateData = useSelector(
    (state: Store) => state.getMarketEstimate.data?.data
  ) || { min: null, max: null };

  const marketEstimate: {
    min: number | null;
    max: number | null;
  } = pick(['min', 'max'], marketEstimateData);

  const onUpdateDetails = ({
    pricePerKilo,
    catchDate,
    ends,
    origin,
    description,
    addressId,
  }: {
    pricePerKilo: number;
    catchDate: Date;
    ends: Date;
    origin: {
      suburb: string;
      state: string;
      countryCode: string;
    };
    description: string;
    addressId: string;
  }) => {
    if (isBulkUpload) {
      dispatch(
        modifyBulkUploadActions.update({
          pricePerKilo,
          catchDate,
          ends,
          origin,
          description,
        })
      );
    } else {
      dispatch(
        editableListingActions.update({
          pricePerKilo,
          catchDate,
          ends,
          origin,
          description,
          addressId,
        })
      );
      onChangeCurrentPage(8);
    }
  };

  const isPendingCreateListing =
    useSelector((state: Store) => state.createListing.pending) || false;
  const isPendingCreateCustomListing =
    useSelector((state: Store) => state.createCustomListing.pending) || false;
  const isPendingUpdateListing =
    useSelector((state: Store) => state.updateListing.pending) || false;
  const isPending =
    isPendingCreateListing ||
    isPendingCreateCustomListing ||
    isPendingUpdateListing;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const saveListing = () => {
    if (!isPending) {
      if (isExisting) {
        dispatch(updateListingActions.request());
      } else if (isCustomType) {
        dispatch(createCustomListingActions.request());
      } else {
        dispatch(createListingActions.request());
        history.push(ADD_PRODUCT_ROUTES.PREVIEW);
      }
    }
  };

  const discardChanges = () => {
    history.push(SELLER_ROUTES.SELLING);
    dispatch(editableListingActions.clear());
  };

  const discardBulkUploadChanges = () => {
    history.push(ADD_PRODUCT_ROUTES.BULK_UPLOAD_PREVIEW);
    dispatch(modifyBulkUploadActions.clearSelection());
    dispatch(editableListingActions.clear());
  };

  const preview = () => {
    history.push(ADD_PRODUCT_ROUTES.PREVIEW);
  };

  const categoryData = GetCategoryData(
    editableListing?.customTypeData?.categoryId || ''
  );

  const measurementUnit = formatMeasurementUnit(
    (() => {
      if (isCustomType) {
        const isPortions =
          editableListing?.customTypeData?.metric.name === 'Portions';
        return isPortions ? 'Portions' : categoryData?.measurementUnit;
      }

      return listingFormData?.measurementUnit;
    })()
  );

  const onUploadCSV = (csv: File, account: string) => {
    const companies = getUser.data?.data.user.companies || [];
    const companyId = companies.find((c) => c.employeeId === account)?.id || '';

    if (companyId) {
      const reader = new FileReader();
      reader.readAsText(csv);

      reader.onload = () => {
        dispatch(
          uploadBulkActions.request({
            companyId,
            csv: reader.result as string,
          })
        );
      };
    }
  };

  const navBack = () => {
    onChangeCurrentPage(currentPage - 1);
  };

  const generatedProps: AddProductGeneratedProps = {
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
    listingFormData,
    editableListing,
    typeName,
    isCustomType,
    onSelectSpecifications,
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
    isUploadingCSV: uploadBulk?.pending || false,
    userPending,
    isBulkUpload,
    discardBulkUploadChanges,
    navBack,
  };

  return <AddProductView {...generatedProps} />;
};

export default AddProduct;
