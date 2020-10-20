import React, { useState, useEffect } from 'react';

import PaginateList from 'components/base/PaginateList';
import Select from 'components/base/Select';
import { Search as SearchSVG, CloseFilled, Octopus } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyState from 'components/module/EmptyState';
import { BUYER_ROUTES } from 'consts';
import { isEmpty, remove } from 'ramda';
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
  const dispatch = useDispatch();
  // const { value, containerStyle, resetValue, ...inputProps } = props;
  const [addressModalChange, setAddressModalChange] = useState(false);
  const [currentAddressSelected, setCurrentAddressSelected] = useState();
  const [changeAddress, setChangeAddress] = useState({
    currentAddress: '',
    newChangeAddress: '',
  });
  const history = useHistory();
  //#region Address

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
  //#endregion

  //#region Search
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const recent =
    useSelector((state: Store) => state.history.buyerRecentSearch) || [];

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
  const showRecentSearch = searchTerm.length === 0;
  const data = showRecentSearch ? reverse(recent) : results;

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      search();
    }, 800);

    setTimer(timerId);
  }, [searchTerm]);
  //#endregion

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
            placeholder="Search for a product"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <div onClick={onReset} className="close-svg-container">
            <CloseFilled
              fill={
                searchTerm.length === 0 ? theme.grey.shade3 : theme.grey.shade6
              }
              height={20}
              width={20}
            />
          </div>
        </InputContainer>
      </div>
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
      <div className="wrapper">
        {!isEmpty(data) && searchTerm.length > 2 ? (
          <Typography variant="overline" color="shade6">
            {showRecentSearch ? 'Recent Searches' : 'Results'}
          </Typography>
        ) : (
          ''
        )}
        {isEmpty(data) && searchTerm.length > 0 && !loading ? (
          <>
            <EmptyState
              onButtonClicked={onReset}
              Svg={Octopus}
              title="No search result"
              buttonText="Reset Search"
            />
          </>
        ) : (
          <PaginateList
            list={searchTerm.length > 2 ? data || [] : []}
            labelPath={['label']}
            maxItemPerPage={6}
            // resultCount="3"
            onClickItem={(item) => {
              history.push(BUYER_ROUTES.SEARCH_PREVIEW(item.value));
              saveSearchHistory(item.value, item.label, item.count);
              window.location.reload();
            }}
          />
        )}
      </div>
    </Container>
  );
};

export default SearchAddressView;
