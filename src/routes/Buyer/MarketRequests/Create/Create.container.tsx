import React, { useEffect, useState } from 'react';

import { BUYER_MARKET_REQUEST_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  getListingFormDataActions,
  getMarketInterestsActions,
  createMarketRequestActions,
  searchProductTypeActions,
  editableMarketRequestActions,
} from 'store/actions';
import { GetDefaultCompany, GetAddressOptions } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import {
  ConfirmSentRequestModalProps,
  CreateRequestGeneratedProps,
} from './Create.props';
import CreateRequestLandingView from './Create.view';
import { SizeOptions } from './SelectSize/SelectSize.props';

const CreateRequest = (): JSX.Element => {
  // MARK:- States / Variables
  const dispatch = useDispatch();
  const history = useHistory();
  const pendingCreate = useSelector(
    (state: Store) => state.createMarketRequest.pending
  );

  const successStatus = useSelector(
    (state: Store) => state.createMarketRequest.data?.status
  );

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [hideSearchResult, setHideSearchResult] = useState(false);
  const [termsAgreement, setTermsAgreement] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [didFinishStep, setDidFinishStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSentModal, setShowSentModal] = useState(false);
  const [selectedSpecifications, setSelectedSpecifications] = useState<{
    items: any[];
  }>({
    items: [],
  });
  const [selectedQuantity, setSelectedQuantity] = useState({
    from: '',
    to: '',
  });
  const [selectedSize, setSelectedSize] = useState<SizeOptions>({
    from: '',
    to: '',
    ungraded: false,
    items: [''],
  });
  const [sendConfModalisOpen, setSendConfModalisOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    id: '',
    name: '',
  });

  const getUser = useSelector((state: Store) => state.getUser);
  const user = getUser.data?.data.user;
  const currentCompany = GetDefaultCompany();
  const buying =
    useSelector((store: Store) => store.getMarketInterests.data?.data.buying) ||
    [];

  const companyId = currentCompany?.id || '';
  const addressOptions = GetAddressOptions();
  const addresses =
    useSelector((state: Store) => state.getAddresses.data?.data.addresses) ||
    [];
  const currentDefaultAddress = addresses.find((i) => i.default) || {
    id: '',
  };
  const currentFoundAddress = addressOptions.find(
    (a) => a.value === currentDefaultAddress.id
  );
  const [selectedAddress, setSelectedAddress] = useState<{
    label: string;
    value: string;
  }>({
    label: '',
    value: currentDefaultAddress.id,
  });

  const updateCategory = (v: any) => {
    dispatch(
      editableMarketRequestActions.update({
        typeId: v.id,
        typeName: v.name,
      })
    );
  };

  useEffect(() => {
    if (currentFoundAddress?.label != undefined) {
      setSelectedAddress(currentFoundAddress);
    }
  }, [currentDefaultAddress]);

  const onChangeAddress = (e: { label: string; value: string }) => {
    setSelectedAddress(e);
  };
  const listingFormData =
    useSelector((state: Store) => state.getListingFormData.data?.data) || null;

  const getFormData = (typeId: string) => {
    dispatch(
      getListingFormDataActions.request({
        typeId,
      })
    );
  };

  const pendingSearch =
    useSelector((state: Store) => state.searchProductType.pending) || false;

  const onSearchCategoryType = (term: string) => {
    dispatch(
      searchProductTypeActions.request({
        term,
      })
    );
  };

  const onBack = (step: number) => {
    if (step === 1) {
      //reset
      // setSelectedCategory({ id: '', name: '' });
      // setSelectedSize({ from: '', to: '', items: [] });
      // setSelectedSpecifications({ items: [] });
      // setSelectedQuantity({ from: '', to: '' });
      getFormData(selectedCategory.id);
    }
    setCurrentStep(step);
  };

  const onSubmitRequest = () => {
    dispatch(
      createMarketRequestActions.request({
        typeId: listingFormData?.type.id,
        companyId: companyId,
        buyerId: user?.id,
        addressId: selectedAddress.value,
        stateOptions: selectedSpecifications.items.map((item) => item.value),
        weight: {
          from: Number(selectedQuantity.from),
          to: Number(selectedQuantity.to),
        },
        size: {
          ungraded: false,
          from: selectedSize.from ? selectedSize.from : null,
          to: selectedSize.to ? selectedSize.to : null,
          options: selectedSize.items,
        },
        autoClose: true,
      })
    );
  };

  const onConfirmSentRequest = (props: ConfirmSentRequestModalProps) => {
    setShowSentModal(false);
    dispatch(createMarketRequestActions.clear());
    if (props.continue) {
      history.push(BUYER_MARKET_REQUEST_ROUTES.LANDING);
    }
  };

  const typeSearchResults =
    useSelector(
      (state: Store) => state.searchProductType.data?.data.types || []
    ) || [];

  useEffect(() => {
    if (searchTerm.length > 2) {
      if (!hideSearchResult) {
        setHideSearchResult(true);
      }

      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      const timerId = setTimeout(() => {
        setHideSearchResult(false);
        dispatch(
          searchProductTypeActions.request({
            term: searchTerm,
          })
        );
      }, 200);

      setTimer(timerId);
    } else {
      setHideSearchResult(true);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (companyId) {
      dispatch(
        getMarketInterestsActions.request({
          companyId,
        })
      );
    }
  }, [companyId]);

  useEffect(() => {
    window.scrollTo(0, 0); //reset scroll to top
    if (currentStep === 1) {
      setSelectedSpecifications({ items: [] });
      setSelectedSize({ from: '', to: '', ungraded: false, items: [] });
      setSelectedQuantity({ from: '', to: '' });
    }
  }, [currentStep]);

  useEffect(() => {
    if (selectedCategory.id) {
      getFormData(selectedCategory.id);
    }
  }, [selectedCategory.id]);

  useEffect(() => {
    if (successStatus === 200) {
      setShowSentModal(true);
    } else {
      setShowSentModal(false);
    }
  }, [successStatus]);

  const generatedProps: CreateRequestGeneratedProps = {
    didFinishStep,
    setDidFinishStep,
    buying,
    pendingSearch,
    hideSearchResult,
    search: onSearchCategoryType,
    selectedSize,
    sendConfModalisOpen,
    onSubmitRequest,
    typeSearchResults,
    setSendConfModalisOpen,
    listingFormData,
    selectedSpecifications,
    selectedQuantity,
    termsAgreement,
    setSelectedQuantity,
    setSelectedSize,
    setSelectedSpecifications,
    onBack,
    step: {
      total: 5,
      current: currentStep,
    },
    setStep: setCurrentStep,
    setTermsAgreement,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addressOptions,
    selectedAddress,
    setSelectedAddress,
    onChangeAddress,
    updateCategory,
    isLoadingCreate: pendingCreate || false,
    showSentModal: successStatus === 200,
    onConfirmSentRequest,
  };

  return <CreateRequestLandingView {...generatedProps} />;
};

export default CreateRequest;
