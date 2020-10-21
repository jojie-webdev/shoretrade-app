import React, { useState, useEffect } from 'react';

import { remove } from 'ramda';
import reverse from 'ramda/es/reverse';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  currentAddressActions,
  updateAddressActions,
  cartActions,
  searchAndCountProductTypeActions,
  historyActions,
} from 'store/actions';
import { GetAddressOptions, GetDefaultCompany } from 'store/selectors/buyer';
import { PlaceData } from 'types/PlaceData';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import { addressSelectionOption, searchInterface } from './SearchAddress.props';
import {
  addressToPlaceData,
  placeDataToUpdateAddressMeta,
} from './SearchAddress.transfrom';
import SearchAddressView from './SearchAddress.view';

const SearchAddress = (): JSX.Element => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [addressModalChange, setAddressModalChange] = useState(false);
  const [currentAddressSelected, setCurrentAddressSelected] = useState<
    addressSelectionOption
  >();
  const [changeAddress, setChangeAddress] = useState({
    currentAddress: currentAddressSelected,
    newChangeAddress: '',
  });
  //#region Address
  const companyAdressDefault = GetDefaultCompany();
  const [companyId, setCompanyId] = useState('');
  const getAddress = useSelector((state: Store) => state.getAddresses);
  const addresses = getAddress.data?.data.addresses || [];
  const addressOptions = GetAddressOptions();
  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';
  const statusAddress = useSelector(
    (state: Store) => state.updateAddress.data?.status
  );
  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

  const currentAddress = addresses.find((a) => a.id === selectedAddress);

  const initialAddress = currentAddress
    ? addressToPlaceData(currentAddress)
    : null;
  const [address, setAddress] = useState<PlaceData | null>(initialAddress);

  const changeDefaultAddress = async (id: string) => {
    const filtererdAddress = await addresses.filter(
      (addr) => addr.id === id
    )[0];
    const isDefault = true;
    dispatch(
      updateAddressActions.request(
        placeDataToUpdateAddressMeta(
          addressToPlaceData(filtererdAddress) as PlaceData,
          filtererdAddress.unitNumber,
          companyId,
          isDefault,
          id
        )
      )
    );
    dispatch(cartActions.clear());
    window.location.reload();
  };

  const confirmChangeAddress = () => {
    changeDefaultAddress(changeAddress.newChangeAddress);
  };

  const setDefaultAddress = () => {
    const filterAddressDefault = addresses.filter((i) => i.default);
    const filteredArray = addressOptions.find(
      (a) => a.value === filterAddressDefault[0].id
    );
    setCurrentAddressSelected(filteredArray);
  };

  const changeAddressModal = (value: boolean) => {
    setAddressModalChange(value);
  };

  const changeAddressFunc = (value: string) => {
    setChangeAddress({ ...changeAddress, newChangeAddress: value });
  };

  useEffect(() => {
    if (currentAddress) {
      setAddress(addressToPlaceData(currentAddress));
    }
  }, [currentAddress]);

  useEffect(() => {
    setCompanyId(companyAdressDefault?.id || '');
  }, [companyAdressDefault]);

  useEffect(() => {
    if (addressOptions && addresses && !currentAddressSelected) {
      setDefaultAddress();
    }
  }, [addressOptions, addresses]);

  useEffect(() => {
    setChangeAddress({
      ...changeAddress,
      currentAddress: currentAddressSelected,
    });
  }, [currentAddressSelected]);

  //#endregion

  //#region Search
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const recent =
    useSelector((state: Store) => state.history.buyerRecentSearch) || [];
  const [data, setData] = useState<searchInterface[]>([]);
  const [load, setLoad] = useState(false);

  const results =
    useSelector(
      (state: Store) => state.searchAndCountProductType.data?.data.types
    ) || [];
  const loading =
    useSelector((state: Store) => state.searchAndCountProductType.pending) ||
    false;

  const search = () => {
    dispatch(
      searchAndCountProductTypeActions.request({
        term: searchTerm,
        address: '',
      })
    );
  };

  const onReset = () => {
    setSearchTerm('');
  };

  const saveSearchHistory = (id: string, label: string, count: string) => {
    const historyLimit = 20;
    const isExisting = recent.findIndex((r) => r.value === id) !== -1;
    if (!isExisting) {
      dispatch(
        historyActions.update({
          buyerRecentSearch: [
            ...(recent.length === historyLimit ? remove(0, 1, recent) : recent),
            {
              value: id,
              label,
              count,
            },
          ],
        })
      );
    }
  };

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    setLoad(true);
    const filterData = searchTerm.length === 0 ? reverse(recent) : results;
    if (filterData.length > 0 && !loading) {
      setData(filterData);
    } else if (filterData.length <= 0 && !loading) {
      setData([]);
    }
    setLoad(false);
  }, [results]);

  useEffect(() => {
    setLoad(true);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      search();
    }, 200);

    setTimer(timerId);
  }, [searchTerm]);
  //#endregion

  const generatedProps = {
    load,
    //#region Address
    addressModalChange,
    addressOptions,
    currentAddressSelected,
    changeAddressModal,
    changeAddressFunc,
    changeAddress,
    setDefaultAddress,
    confirmChangeAddress,
    //#endregion
    //#region Search
    onSearchChange,
    saveSearchHistory,
    searchTerm,
    onReset,
    data,
    //#endregion
  };

  return <SearchAddressView {...generatedProps} />;
};

export default SearchAddress;
