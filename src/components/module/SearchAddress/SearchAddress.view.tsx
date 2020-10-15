import React, { useState, useEffect } from 'react';

import Select from 'components/base/Select';
import { Search as SearchSVG, CloseFilled } from 'components/base/SVG';
import ConfirmationModal from 'components/module/ConfirmationModal';
import { useSelector, useDispatch } from 'react-redux';
import {
  currentAddressActions,
  updateAddressActions,
  cartActions,
} from 'store/actions';
import { GetAddressOptions, GetDefaultCompany } from 'store/selectors/buyer';
import { PlaceData } from 'types/PlaceData';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import { SearchAddressProps } from './SearchAddress.props';
import {
  InputContainer,
  Container,
  AddressContainer,
} from './SearchAddress.style';
import {
  addressToPlaceData,
  placeDataToUpdateAddressMeta,
} from './SearchAddress.transfrom';

const SearchAddressView = (props: SearchAddressProps): JSX.Element => {
  const theme = useTheme();
  const { value, containerStyle, resetValue, ...inputProps } = props;
  const [addressModalChange, setAddressModalChange] = useState(false);
  const [currentAddressSelected, setCurrentAddressSelected] = useState();
  const [changeAddress, setChangeAddress] = useState({
    currentAddress: '',
    newChangeAddress: '',
  });

  //#region
  const dispatch = useDispatch();

  const companyAdressDefault = GetDefaultCompany();
  const [companyId, setCompanyId] = useState('');
  const getAddress = useSelector((state: Store) => state.getAddresses);
  const addresses = getAddress.data?.data.addresses || [];
  const addressOptions = GetAddressOptions();

  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';

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
    await dispatch(
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
    await dispatch(cartActions.clear());
  };

  useEffect(() => {
    if (currentAddress) {
      setAddress(addressToPlaceData(currentAddress));
    }
  }, [currentAddress]);

  useEffect(() => {
    setCompanyId(companyAdressDefault?.id || '');
  }, [companyAdressDefault]);
  //#endregion
  const confirmChangeAddress = () => {
    changeDefaultAddress(changeAddress.newChangeAddress);
  };

  useEffect(() => {
    if (addressOptions && addresses && !currentAddressSelected) {
      const filterAddressDefault = addresses.filter((i) => i.default);
      const filteredArray = addressOptions.find(
        (a) => a.value === filterAddressDefault[0].id
      );
      setCurrentAddressSelected(filteredArray);
    }
  }, [addressOptions, addresses, currentAddressSelected]);

  useEffect(() => {
    setChangeAddress({
      ...changeAddress,
      currentAddress: currentAddressSelected || '',
    });
  }, [currentAddressSelected]);

  return (
    <Container>
      <ConfirmationModal
        isOpen={addressModalChange}
        title="Change your Buying Address?"
        description="Are you sure you want to change your buying address? This will reset your current cart."
        action={() => {
          confirmChangeAddress();
          setAddressModalChange(false);
        }}
        actionText="Okay"
        onClickClose={() => {
          setAddressModalChange(false);
        }}
      />
      <div style={{ flexDirection: 'column', flex: 3 }}>
        <InputContainer>
          <SearchSVG height={16} width={16} />
          <input
            type="text"
            placeholder="Placeholder"
            {...inputProps}
            value={value}
          />
          <div onClick={resetValue} className="close-svg-container">
            <CloseFilled
              fill={value.length === 0 ? theme.grey.shade3 : theme.grey.shade6}
              height={20}
              width={20}
            />
          </div>
        </InputContainer>
      </div>
      <div style={{ flexDirection: 'column', flex: 1 }}>
        <AddressContainer>
          <Select
            className="search-address-select"
            options={addressOptions}
            label="Buying For"
            size="small"
            onChange={(e) => {
              setAddressModalChange(true);
              setChangeAddress({
                ...changeAddress,
                newChangeAddress: e.value,
              });
            }}
            value={currentAddressSelected}
          />
        </AddressContainer>
      </div>
    </Container>
  );
};

export default SearchAddressView;
