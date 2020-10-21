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

interface addressSelectionOption {
  label: string;
  value: string;
}

interface searchInterface {
  count: string;
  label: string;
  value: string;
}
const SearchAddressView = (props: SearchAddressProps): JSX.Element => {
  const theme = useTheme();
  const {
    addressModalChange,
    addressOptions,
    currentAddressSelected,
    changeAddressModal,
    changeAddressFunc,
    changeAddress,
    setDefaultAddress,
    confirmChangeAddress,
    onSearchChange,
    saveSearchHistory,
    searchTerm,
    onReset,
    data,
    load,
  } = props;
  const dispatch = useDispatch();
  // const { value, containerStyle, resetValue, ...inputProps } = props;

  const history = useHistory();
  return (
    <Container>
      <ConfirmationModal
        isOpen={addressModalChange}
        title="Change your Buying Address?"
        description="Are you sure you want to change your buying address? This will reset your current cart."
        action={() => {
          confirmChangeAddress();
          changeAddressModal(false);
        }}
        actionText="Okay"
        onClickClose={() => {
          setDefaultAddress();
          changeAddressModal(false);
        }}
      />
      <div style={{ flexDirection: 'column', flex: 3 }}>
        <InputContainer>
          <SearchSVG height={16} width={16} />
          <input
            type="text"
            placeholder="Search for a product"
            onChange={(e) => onSearchChange(e.target.value)}
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
            if (e.value !== currentAddressSelected?.value) {
              changeAddressModal(true);
              changeAddressFunc(e.value);
            }
          }}
          value={currentAddressSelected}
        />
      </AddressContainer>
      <div className="wrapper">
        {!isEmpty(data) && searchTerm.length > 2 ? (
          <Typography variant="overline" color="shade6">
            {searchTerm.length === 0 ? 'Recent Searches' : 'Results'}
          </Typography>
        ) : null}

        {isEmpty(data) && searchTerm.length > 2 && !load ? (
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
