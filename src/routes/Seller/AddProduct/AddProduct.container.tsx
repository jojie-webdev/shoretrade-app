import React, { useEffect, useState, useReducer, useMemo } from 'react';

import { ADD_PRODUCT_ROUTES, SELLING_ROUTES } from 'consts';
import pick from 'ramda/src/pick';
import unnest from 'ramda/src/unnest';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getAvailableCratesActions,
  uploadBulkActions,
  editableListingActions,
  searchProductTypeActions,
  updateListingActions,
  createCustomListingActions,
  createListingActions,
  getCustomFormDataActions,
  modifyBulkUploadActions,
  getMarketInterestsActions,
  getHistoricalListingsActions,
  useHistoricalListingActions,
  historyActions,
  getNSWHolidaysActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { GetCoopUsersResponseItem } from 'types/store/GetCoopUsersState';
import { Store } from 'types/store/Store';
import { fileToBase64 } from 'utils/File';
import { createUpdateReducer } from 'utils/Hooks';
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
        image: employee.profileImage || '',
        company: user.company,
      }))
    : {
        label: user.company,
        value: user.ownerEmployeeId,
        company: user.company,
        image: user.profileImage || '',
      };

const AddProduct = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedHistoricalId, setSelectedHistoricalId] = useState('');

  const isFromBulkUploadPreview = useSelector(
    (state: Store) => state.history.isFromBulkUploadPreview || false
  );
  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  const userPending =
    user !== undefined &&
    !(user.companies || []).some((a) =>
      a.addresses.some((b) => b.approved === 'APPROVED')
    );

  const currentPage =
    useSelector((state: Store) => state.editableListing.currentStep) || 1;

  const uploadBulk = useSelector((store: Store) => store.uploadBulk);

  const onChangeCurrentPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= 9) {
      dispatch(
        editableListingActions.update({
          currentStep: newPage,
        })
      );
    }
  };

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
            isIkeJime: false,
            isIceSlurry: false,
          })
        );
        onChangeCurrentPage(1.5);
        updateAdditionalInfos({ isIkeJime: false, isIceSlurry: false });
      }
    }
  };

  const editableListing = useSelector((state: Store) => state.editableListing);

  const searchHistoricalListings = (term: string) => {
    dispatch(
      getHistoricalListingsActions.request({
        term,
        employeeId: editableListing.employee || '',
      })
    );
  };

  const historicalListings =
    useSelector(
      (state: Store) => state.getHistoricalListings.data?.data.listings || []
    ) || [];

  const onSkipHistoricalListings = () => {
    onChangeCurrentPage(2);
    dispatch(historyActions.clear());
  };

  const onUseHistoricalListing = (listingId: string, typeId: string) => {
    dispatch(
      useHistoricalListingActions.update({
        id: listingId,
        typeId,
      })
    );
    setSelectedHistoricalId(listingId);
  };

  const searchResults =
    useSelector(
      (state: Store) => state.searchProductType.data?.data.types || []
    ) || [];

  const productsToSell = useSelector((state: Store) =>
    (state.getMarketInterests.data?.data.selling || []).map((p) => {
      const availableData = searchResults.find((a) => a.value === p.id);
      return {
        label: p.name,
        value: p.id,
        image: availableData?.image || '',
      };
    })
  );

  const search = (term: string) => {
    dispatch(
      searchProductTypeActions.request({
        term,
      })
    );
  };

  const pendingSearchProductType =
    useSelector((state: Store) => state.searchProductType.pending) || false;

  const pendingMarketInterests =
    useSelector((state: Store) => state.getMarketInterests.pending) || false;

  const pendingSearch = pendingSearchProductType || pendingMarketInterests;

  const selectProductType = (typeId: string) => {
    dispatch(
      editableListingActions.update({
        type: typeId,
        isIkeJime: false,
        isIceSlurry: false,
      })
    );
    onChangeCurrentPage(3);
    updateAdditionalInfos({ isIkeJime: false, isIceSlurry: false });
  };

  const [showCustomTypeSettings, setShowCustomTypeSettings] = useState(false);

  const getCustomFormData = () => {
    dispatch(getCustomFormDataActions.request());
  };

  const getNSWHolidays = () => {
    dispatch(getNSWHolidaysActions.request());
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
        isIkeJime: false,
        isIceSlurry: false,
      })
    );
    onChangeCurrentPage(3);
    updateAdditionalInfos({ isIkeJime: false, isIceSlurry: false });
  };

  const categories =
    useSelector(
      (state: Store) => state.getCustomFormData.data?.data.categories
    ) || [];

  const listingFormData =
    useSelector((state: Store) => state.getListingFormData.data?.data) || null;

  const modifyBulkUpload = useSelector(
    (state: Store) => state.modifyBulkUpload
  );

  const nswHolidays =
    useSelector((state: Store) => state.getNSWHolidays.data || null) || null;

  const isCustomType = editableListing?.isCustomType || false;

  const isGstIncl = listingFormData?.type.isGstIncl || false;

  const isBulkUpload = modifyBulkUpload.currentData.index !== undefined;

  const boxesDetails = editableListing?.boxes
    ? editableListing?.boxes
        ?.map((box) => {
          const quantity = box.quantity || 0;
          const sold = box.sold || 0;

          return {
            ...box,
            stocks: quantity - sold,
          };
        })
        .filter((box) => box.stocks !== 0)
    : [];

  const typeName =
    (isCustomType
      ? editableListing?.customTypeData?.name
      : listingFormData?.type.name) || '';

  // for review page only
  const getTypeMarginCategory = listingFormData?.type?.id
    ? searchResults.find((result) => result.value === listingFormData?.type?.id)
        ?.marginCategory || null
    : null;
  const typeMarginCategory = isCustomType ? null : getTypeMarginCategory;

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
          isIkeJime: additionalInfos.isIkeJime,
          isIceSlurry: additionalInfos.isIceSlurry,
        })
      );
      onChangeCurrentPage(4);
    }
  };

  const onSelectSizes = (sizes: {
    sizeFrom?: string;
    sizeTo?: string;
    isUngraded: boolean;
    quality: string | null;
  }) => {
    if (isBulkUpload) {
      dispatch(
        modifyBulkUploadActions.update({
          sizeFrom: sizes.sizeFrom,
          sizeTo: sizes.sizeTo,
          isUngraded: sizes.isUngraded,
          quality: sizes.quality,
        })
      );
    } else {
      dispatch(
        editableListingActions.update({
          sizeFrom: sizes.sizeFrom,
          sizeTo: sizes.sizeTo,
          isUngraded: sizes.isUngraded,
          quality: sizes.quality,
        })
      );
      onChangeCurrentPage(5);
    }
  };

  const isExisting = (editableListing?.currentListingId || '').length > 0;

  const onSetProductPhotoType = (photoTypes: {
    isActualPhoto: boolean;
    isForSaleRepPhoto: boolean;
  }) => {
    dispatch(
      editableListingActions.update({
        ...photoTypes,
      })
    );
  };

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
        onChangeCurrentPage(9); // should redirect to review
      } else {
        if (isBulkUpload) {
          onChangeCurrentPage(7);
        } else {
          onChangeCurrentPage(6);
        }
      }
    } catch (error) {
      if (callback) {
        callback();
      }
    }
  };

  const onAddPackaging = ({
    isAquafuture,
    id,
    custom,
  }: {
    isAquafuture: boolean;
    id?: string;
    custom?: {
      width: number;
      height: number;
      length: number;
      airlineApproved?: boolean;
    };
  }) => {
    dispatch(
      editableListingActions.update({
        isAquafuture: isAquafuture,
        ...(id || custom
          ? {
              packaging: {
                ...(id ? { id: id } : {}),
                ...(custom
                  ? {
                      custom: custom,
                    }
                  : {}),
              },
            }
          : {}),
      })
    );
    onChangeCurrentPage(7);
  };

  const onAddBoxes = ({
    sellInMultiples,
    boxes,
    minimumOrder,
    isAquafuture,
  }: {
    sellInMultiples: boolean;
    boxes: {
      id: string;
      weight: number;
      quantity: number;
      count?: number;
      sold?: number;
    }[];
    minimumOrder: string;
    isAquafuture: boolean;
  }) => {
    if (isBulkUpload) {
      dispatch(
        modifyBulkUploadActions.update({
          isAquafuture: isAquafuture,
          sellInMultiplesOfMinOrder: sellInMultiples,
          boxes,
          minOrder: Number(minimumOrder),
        })
      );
    } else {
      dispatch(
        editableListingActions.update({
          sellInMultiplesOfMinOrder: sellInMultiples,
          boxes,
          minOrder: Number(minimumOrder),
        })
      );
      onChangeCurrentPage(8);
    }
  };

  const marketEstimateData = useSelector(
    (state: Store) => state.getMarketEstimate.data?.data
  ) || { min: null, max: null };

  const marketEstimate: {
    min: number | null;
    max: number | null;
  } = pick(['min', 'max'], marketEstimateData);

  //TODO: bulk upload catch recurrence
  const onUpdateDetails = ({
    pricePerKilo,
    catchDate,
    auctionDate,
    catchRecurrence,
    ends,
    origin,
    description,
    addressId,
    alwaysAvailable,
    isAquafuture,
    isAuctionSale,
    isPreAuctionSale,
    templateDeliveryDate,
    restrictToState,
    allowNegotiations,
  }: {
    pricePerKilo: number;
    catchDate: Date | null;
    auctionDate: Date | null;
    catchRecurrence: string | null;
    ends: Date | null;
    origin: {
      suburb: string;
      state: string;
      countryCode: string;
    };
    description: string;
    addressId: string;
    alwaysAvailable: boolean;
    isAquafuture: boolean;
    isAuctionSale: boolean;
    isPreAuctionSale: boolean;
    templateDeliveryDate: string | null;
    restrictToState?: boolean;
    allowNegotiations: boolean;
  }) => {
    if (isBulkUpload) {
      dispatch(
        modifyBulkUploadActions.update({
          pricePerKilo,
          //@ts-ignore
          auctionDate,
          catchDate,
          //@ts-ignore
          ends,
          origin,
          description,
          allowNegotiations,
        })
      );
    } else {
      dispatch(
        editableListingActions.update(
          alwaysAvailable
            ? {
                pricePerKilo,
                catchDate: null,
                catchRecurrence,
                ends: null,
                origin,
                description,
                addressId,
                templateDeliveryDate,
                restrictToState,
                allowNegotiations,
              }
            : {
                isAquafuture,
                isPreAuctionSale,
                isAuctionSale,
                pricePerKilo,
                auctionDate,
                catchDate,
                catchRecurrence: null,
                ends,
                origin,
                description,
                addressId,
                templateDeliveryDate,
                restrictToState,
                allowNegotiations,
              }
        )
      );
      onChangeCurrentPage(9);
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

  const saveListing = () => {
    if (!isPending) {
      if (isExisting) {
        dispatch(updateListingActions.request());
      } else if (isCustomType) {
        dispatch(createCustomListingActions.request());
      } else {
        dispatch(createListingActions.request());
      }
    }
  };

  const discardChanges = () => {
    dispatch(editableListingActions.clear());
    history.push(ADD_PRODUCT_ROUTES.LANDING);
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

  const onUploadCSV = (csv: File, salesChannel: string) => {
    const companies = getUser.data?.data.user.companies || [{ id: '' }];
    const companyId = companies[0].id || '';

    if (companyId) {
      const reader = new FileReader();
      reader.readAsText(csv);

      reader.onload = () => {
        dispatch(
          uploadBulkActions.request({
            companyId,
            csv: reader.result as string,
            salesChannel,
          })
        );
      };
    }
  };

  const exitFlow = () => {
    dispatch(editableListingActions.clear());
    dispatch(modifyBulkUploadActions.clearSelection());
    if (isExisting && editableListing?.currentListingId) {
      history.push(
        SELLING_ROUTES.LISTING_DETAILS.replace(
          ':listingId',
          editableListing?.currentListingId
        )
      );
      return;
    } else {
      onChangeCurrentPage(1);
    }
  };

  const navBack = () => {
    if (isBulkUpload && currentPage === 7) {
      onChangeCurrentPage(5);
    } else if (currentPage === 2) {
      onChangeCurrentPage(1.5);
    } else if (currentPage === 1.5) {
      onChangeCurrentPage(1);
    } else {
      onChangeCurrentPage(currentPage - 1);
    }
  };

  const [additionalInfos, updateAdditionalInfos] = useReducer(
    createUpdateReducer<{
      isIkeJime: boolean;
      isIceSlurry: boolean;
    }>(),
    {
      isIkeJime: editableListing.isIkeJime || false,
      isIceSlurry: editableListing.isIceSlurry || false,
    }
  );

  // MARK:- Effects

  useEffect(() => {
    if (currentPage === 1) {
      if (showCustomTypeSettings) {
        setShowCustomTypeSettings(false);
      }
    }
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    if (isCustomType && currentPage !== 1) {
      setShowCustomTypeSettings(true);
    }
    // eslint-disable-next-line
  }, [isCustomType]);

  useEffect(() => {
    if (companyId) {
      dispatch(
        getAvailableCratesActions.request({
          companyId,
        })
      );
      dispatch(getMarketInterestsActions.request({ companyId }));
    }
    // eslint-disable-next-line
  }, [companyId]);

  useEffect(() => {
    getCustomFormData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getNSWHolidays();
    // eslint-disable-next-line
  }, []);

  const generatedProps: AddProductGeneratedProps = {
    currentPage,
    onChangeCurrentPage,
    accountOptions,
    onSelectAccount,
    historicalListings,
    onSkipHistoricalListings,
    onUseHistoricalListing,
    searchHistoricalListings,
    search,
    searchResults,
    productsToSell,
    pendingSearch,
    selectProductType,
    showCustomTypeSettings,
    setShowCustomTypeSettings,
    getCustomFormData,
    nswHolidays,
    categories,
    selectCustomType,
    listingFormData,
    editableListing,
    typeName,
    typeMarginCategory,
    isCustomType,
    isGstIncl,
    onSelectSpecifications,
    onSelectSizes,
    onUpdateImage,
    onSetProductPhotoType,
    onAddPackaging,
    onAddBoxes,
    onUpdateDetails,
    saveListing,
    pendingSave: isPending,
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
    exitFlow,
    additionalInfos,
    updateAdditionalInfos,
    isFromBulkUploadPreview,
  };

  return <AddProductView {...generatedProps} />;
};

export default AddProduct;
