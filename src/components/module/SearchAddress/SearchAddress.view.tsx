import React, { useState, useEffect } from 'react';

import Select from 'components/base/Select';
import { Search as SearchSVG, CloseFilled } from 'components/base/SVG';
import { Row, Col } from 'react-grid-system';
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

const SearchAddress = (props: SearchAddressProps): JSX.Element => {
  const theme = useTheme();
  const { value, containerStyle, resetValue, ...inputProps } = props;
  const dispatch = useDispatch();

  //#region
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

  return (
    <Container>
      <Row>
        <Col xs={9} style={{ paddingRight: 0 }}>
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
                fill={
                  value.length === 0 ? theme.grey.shade3 : theme.grey.shade6
                }
                height={20}
                width={20}
              />
            </div>
          </InputContainer>
        </Col>

        <Col xs={3} style={{ paddingLeft: 0 }}>
          <AddressContainer>
            <Select
              label="Buying For"
              className="dropdown"
              options={addressOptions}
              size="small"
              // onChange={(e) => {}}
              // value={currentAddress}
            />
          </AddressContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(SearchAddress);
