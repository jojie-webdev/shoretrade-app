import React, { useReducer, useState, useEffect } from 'react';

import { BUYER_ROUTES, SELLER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAvailableCategories } from 'services/category';
import { getInactiveTypesByCategory } from 'services/listing';
import { registerActions, getStatesActions } from 'store/actions';
import {
  Category,
  CategoryType,
  CategoryPayload,
} from 'types/store/GetCategories';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { downloadShorePayApplicationForm } from 'utils/Links';
import { useTheme } from 'utils/Theme';

import { RegistrationDetails } from './Register.props';
import RegisterView from './Register.view';

const Register = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const theme = useTheme();
  const token = useSelector((state: Store) => state.auth.token);
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

  const states = useSelector(
    (store: Store) => store.getStates.data?.data || []
  );

  const plans = useSelector(
    (store: Store) => store.getSubscriptionPlans.data?.data || []
  );

  const licenseStates = useSelector(
    (store: Store) => store.getStates.data?.data || []
  );

  const getStateOptions = () =>
    states.map((s) => ({ value: s.id, label: s.name }));

  const setSummaryEdit = () => {
    setIsSummaryEdit(true);
  };

  const onChangeSearch = (search: string) => {
    setSearchTerm(search);
  };

  useEffect(() => {
    dispatch(getStatesActions.request({}));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      const timerId = setTimeout(() => {
        getAvailableCategories(searchTerm.toLowerCase().toString())
          .then(({ data }) => {
            const cata: any[] = data.data.categories;
            setSearchCategory(data.data.categories);
            setSearchCategoryType(
              cata
                .map((c: { id: string; types: CategoryType[] }) => {
                  if (c.types) {
                    return c.types.map((t) => ({
                      ...t,
                      categoryId: c.id,
                    }));
                  }
                  return [];
                })
                .reduce((acc, val) => acc.concat(val), [])
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }, 200);

      setTimer(timerId);
    } else {
      setSearchCategory(categories);
      setSearchCategoryType([]);
    }
    // eslint-disable-next-line
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
    setCategoryItems([]);
    setSearchCategoryType([]);

    const data = await getInactiveTypesByCategory(id, token);
    const result = data.data.data.type;

    setCategoryItems(result);
    setSearchCategoryType(result);
  };

  const onRemoveSelectedCategory = (name: string) => {
    setSelectedCategoryTypes(
      selectedCategoryTypes.filter((c) => c.name !== name)
    );
  };

  const [interestedInShorePay, setInterestedInShorePay] = useState(false);
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
      // SFM number,
      sfmNumber: null,
      // bank
      accountName: '',
      bsb: '',
      accountNumber: '',

      selectedMarketSector: '',
      subscriptionPreference: {
        plan: 'BASE',
        addOns: [],
        transactionValue: 'Less than $7,500',
      },

      tncAgreement: false,
      categoryMarketSector: '',
      // plan payment
      cardNumber: '',
      cardExpiryDate: '',
      cardCvc: '',
      cardName: '',
      cardBillingAddress: '',
      cardZipCode: '',
      cardCity: '',
      cardState: '',
      cardToken: '',
      //license
      licenses: [],
    }
  );

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
          cardToken: details.cardToken,
          subscriptionPreference: {
            plan: details.subscriptionPreference.plan,
            addOns: [...details.subscriptionPreference.addOns],
          },
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
          sfmNumber: details.sfmNumber,
          registerDebtFinancing: interestedInShorePay,
          debtFinancingSegment: details.selectedMarketSector,
          debtFinancingEstRevenue: interestedInShorePay ? '0' : '',
          userGroup: 'buyer',
          marketSector: details.categoryMarketSector,
          marketBuying: selectedCategoryTypes,
          cardToken: details.cardToken,
          subscriptionPreference: {
            plan: details.subscriptionPreference.plan,
            addOns: [...details.subscriptionPreference.addOns],
            transactionValue: details.subscriptionPreference.transactionValue,
          },
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

  const handleDownloadApplicationForm = () => {
    downloadShorePayApplicationForm();
  };

  const handleSelectShorePay = (shorePay: boolean) => {
    /**
       * shorepay == true
       registerDebtFinancing=true
       debtFinancingEstRevenue=0
       debtFinancingSegment=<selected market sector value>
       otherwise,
       registerDebtFinancing=false
       */

    setInterestedInShorePay(shorePay);
  };

  const isPending =
    useSelector((state: Store) => state.register.pending) || false;
  const error = useSelector((state: Store) => state.register.error) || '';
  const isSuccess =
    useSelector((state: Store) => (state.register.data?.status || 0) === 200) ||
    false;

  const goToLogIn = () => {
    history.push(isSeller ? SELLER_ROUTES.LOGIN : BUYER_ROUTES.LOGIN);
  };

  const generatedProps = {
    // generated props here
    plans,
    licenseStates,
    backToLogin,
    registrationDetails,
    updateRegistrationDetails,
    register,
    isPending,
    isSuccess,
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
    interestedInShorePay,
    handleSelectShorePay,
    handleDownloadApplicationForm,
    setSearchTerm,
    onRemoveSelectedCategory,
    goToLogIn,
    states: getStateOptions(),
  };
  return <RegisterView {...generatedProps} />;
};

export default Register;
