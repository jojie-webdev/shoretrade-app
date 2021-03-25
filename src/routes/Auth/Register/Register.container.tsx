import React, { useReducer, useState, useEffect } from 'react';

import { BUYER_ROUTES, SELLER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAvailableCategories } from 'services/category';
import { getInactiveTypesByCategory } from 'services/listing';
import { registerActions } from 'store/actions';
import {
  Category,
  CategoryType,
  CategoryPayload,
} from 'types/store/GetCategories';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { PAYMENT_METHOD_OPTIONS } from './Register.constants';
import { RegistrationDetails } from './Register.props';
import RegisterView from './Register.view';

const Register = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryType[]>([]);
  const [isGotoDetails, setGoToDetails] = useState(false);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState<
    CategoryPayload[]
  >([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchCategory, setSearchCategory] = useState<Category[]>([]);
  const [searchCategoryType, setSearchCategoryType] = useState<CategoryType[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isSummaryEdit, setIsSummaryEdit] = useState(false);

  const setSummaryEdit = () => {
    setIsSummaryEdit(true);
  };

  const onChangeSearch = (search: string) => {
    setSearchTerm(search);
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      const timerId = setTimeout(() => {
        let value;
        if (isGotoDetails) {
          value = categoryItems.filter((i) =>
            i.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchCategoryType(value);
        } else {
          value = categories.filter((i) =>
            i.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchCategory(value);
        }
      }, 200);

      setTimer(timerId);
    } else {
      setSearchCategory(categories);
      setSearchCategoryType(categoryItems);
    }
  }, [searchTerm]);

  const addSelected = (category: {
    id: string;
    name: string;
    categoryId: string;
  }) => {
    if (
      selectedCategoryTypes.some((i: CategoryPayload) => i.id === category.id)
    ) {
      setSelectedCategoryTypes(
        selectedCategoryTypes.filter(
          (i: CategoryPayload) => i.id !== category.id
        )
      );
    } else {
      setSelectedCategoryTypes((oldArray) => [...oldArray, category]);
    }
  };

  const backToLogin = () => {
    history.replace(isSeller ? SELLER_ROUTES.LOGIN : BUYER_ROUTES.LOGIN);
  };

  const showDetails = () => {
    setSearchTerm('');
    setGoToDetails(true);
  };

  const hideDetails = () => {
    setSearchTerm('');
    setGoToDetails(false);
  };

  useEffect(() => {
    const load = async () => {
      const data = await getAvailableCategories();
      const result = data.data.data.categories;
      setSearchCategory(result);
      setCategories(result);
    };
    load();
  }, []);

  const getCategoryItem = async (id: string) => {
    const data = await getInactiveTypesByCategory(id);
    const result = data.data.data.type;
    setCategoryItems(result);
    setSearchCategoryType(result);
  };

  const [registrationDetails, updateRegistrationDetails] = useReducer(
    createUpdateReducer<RegistrationDetails>(),
    {
      // user
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      mobile: '',
      callingCode: '61',
      // business
      businessName: '',
      abn: '',
      address: null,
      unitNumber: '',
      businessLogo: null,
      // bank
      accountName: '',
      bsb: '',
      accountNumber: '',
      selectedPaymentMethod: '',
      estimatedAnnualRevenue: '',
      selectedMarketSector: '',
      tncAgreement: false,
      categoryMarketSector: '',
      //license
      licenses: [],
    }
  );

  const isApplicationForLineCredit =
    !isSeller &&
    registrationDetails.selectedPaymentMethod ===
      PAYMENT_METHOD_OPTIONS[0].value;

  const registerSeller = (details: RegistrationDetails) => {
    if (details.address) {
      dispatch(
        registerActions.request({
          firstName: details.firstName,
          lastName: details.lastName,
          email: details.email,
          password: details.password,
          passwordConfirm: details.passwordConfirm,
          mobile: `+${details.callingCode || '61'}${details.mobile}`,
          company: {
            businessName: details.businessName,
            abn: details.abn,
          },
          address: {
            ...details.address,
            unitNumber: details.unitNumber,
          },
          businessLogo: details.businessLogo,
          bankAccounts: {
            accountName: details.accountName,
            bsb: details.bsb,
            accountNumber: details.accountNumber,
          },
          userGroup: 'seller',
          marketSector: details.categoryMarketSector,
          marketSelling: selectedCategoryTypes,
          licenses: details.licenses,
        })
      );
    }
  };

  const registerBuyer = (details: RegistrationDetails) => {
    if (details.address) {
      dispatch(
        registerActions.request({
          firstName: details.firstName,
          lastName: details.lastName,
          email: details.email,
          password: details.password,
          passwordConfirm: details.passwordConfirm,
          mobile: `+${details.callingCode || '61'}${details.mobile}`,
          company: {
            businessName: details.businessName,
            abn: details.abn,
          },
          address: {
            ...details.address,
            unitNumber: details.unitNumber,
          },
          businessLogo: details.businessLogo,
          registerDebtFinancing:
            details.selectedPaymentMethod === PAYMENT_METHOD_OPTIONS[0].value,
          debtFinancingSegment: details.selectedMarketSector,
          debtFinancingEstRevenue: details.estimatedAnnualRevenue,
          userGroup: 'buyer',
          marketSector: details.categoryMarketSector,
          marketBuying: selectedCategoryTypes,
        })
      );
    }
  };

  const register = (details: RegistrationDetails) => {
    if (!isPending) {
      if (isSeller) {
        registerSeller(details);
      } else {
        registerBuyer(details);
      }
    }
  };

  const isPending =
    useSelector((state: Store) => state.register.pending) || false;
  const error = useSelector((state: Store) => state.register.error) || '';
  const isSuccess =
    useSelector((state: Store) => (state.register.data?.status || 0) === 200) ||
    false;

  const generatedProps = {
    // generated props here
    backToLogin,
    registrationDetails,
    updateRegistrationDetails,
    register,
    isPending,
    isSuccess,
    isApplicationForLineCredit,
    error,
    categories,
    getCategoryItem,
    categoryItems,
    isGotoDetails,
    showDetails,
    hideDetails,
    selectedCategoryTypes,
    addSelected,
    searchCategory,
    searchCategoryType,
    searchTerm,
    onChangeSearch,
    isSummaryEdit,
    setSummaryEdit,
  };
  return <RegisterView {...generatedProps} />;
};

export default Register;
