import React, { useRef, useState } from 'react';

import MultiSelect from 'components/base/MultiSelect';
import PaginateList from 'components/base/PaginateList';
import Select from 'components/base/Select';
import Slider from 'components/base/Slider';
import { Octopus } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyState from 'components/module/EmptyState';
import Search from 'components/module/Search';
import { SearchAddressProps } from 'components/module/SearchAddress/SearchAddress.props';
import { BUYER_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import {
  Container,
  FiltersContainer,
  BuyingQuantityContainer,
} from './SearchAddress.style';

const SearchAddressView = (props: SearchAddressProps): JSX.Element => {
  const {
    addressOptions,
    currentDefaultAddressId,
    targetAddress,
    setTargetAddress,
    setDefaultAddress,
    saveSearchHistory,
    searchTerm,
    setSearchTerm,
    onReset,
    data,
    isSearching,
    shouldHideResult,
  } = props;
  const theme = useTheme();
  const history = useHistory();
  const [isFocused, setIsFocused] = useState(false);
  const [minOrderQty, setMinOrderQty] = useState(50);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function blurOnEnter(event: any) {
    if (event.key === 'Enter' && inputRef !== null) {
      inputRef?.current?.blur();
    }
  }

  return (
    <Container>
      <ConfirmationModal
        isOpen={targetAddress.length > 0}
        title="Change your Buying Address?"
        description="Are you sure you want to change your buying address? This will reset your current cart."
        action={() => {
          setDefaultAddress(targetAddress);
        }}
        actionText="Okay"
        onClickClose={() => {
          setTargetAddress('');
        }}
      />

      <Search
        className="search-product"
        inputRef={inputRef}
        placeholder="Search for a product"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onFocus={() => {
          setIsFocused(true);
        }}
        onKeyPress={blurOnEnter}
      />

      {/* <AddressContainer>
        <Select
          className="search-address-select"
          options={addressOptions}
          label="Buying For"
          unbordered={true}
          size="small"
          onChange={(e) => {
            if (e.value !== currentDefaultAddressId) {
              setTargetAddress(e.value);
            }
          }}
          value={
            addressOptions.length > 0 ? currentDefaultAddressId : undefined
          }
        />
      </AddressContainer> */}

      <FiltersContainer>
        <Select
          className="search-address-select"
          options={addressOptions}
          label="Buying For"
          unbordered={true}
          onChange={(e) => {
            if (e.value !== currentDefaultAddressId) {
              setTargetAddress(e.value);
            }
          }}
          value={
            addressOptions.length > 0 ? currentDefaultAddressId : undefined
          }
        />

        <MultiSelect
          className="search-address-select"
          label="Buying to"
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
            { label: 'Option 4', value: '4' },
          ]}
          placeholder="Select..."
          selectedAllText="All States"
          background={theme.grey.shade3}
          unbordered
        />

        <BuyingQuantityContainer>
          <Typography
            variant="overline"
            color="shade6"
            style={{ width: '100%' }}
          >
            Minimum Buying Quantity
          </Typography>
          <div className="filters">
            <TextField
              className="weight-input"
              value={minOrderQty}
              onChange={(e) => setMinOrderQty(Number(e.target.value))}
            />

            <Select
              className="search-address-select"
              options={[
                { label: 'Kg', value: 'kg' },
                { label: 'Lb', value: 'lb' },
              ]}
              unbordered={true}
              onChange={(e) => {
                // something
              }}
              value={'kg'}
            />

            <div style={{ minWidth: '50%', marginTop: '8px' }}>
              <Slider
                value={minOrderQty}
                onChange={(v) => {
                  if (v && typeof v === 'number') {
                    setMinOrderQty(v);
                  }
                }}
                max={100}
                maskValue={(v) => ``}
                onAfterChange={() => {
                  // if (!isSizeModified) {
                  //   setIsSizeModified(true);
                  // } else {
                  //   if (
                  //     sizeFrom.toString() === maskSizeValue(sizeRange[0]) &&
                  //     sizeTo.toString() === maskSizeValue(sizeRange[1])
                  //   ) {
                  //     setIsSizeModified(false);
                  //   } else {
                  //     handleUpdate();
                  //   }
                  // }
                }}
              />
            </div>
          </div>
        </BuyingQuantityContainer>
      </FiltersContainer>

      {!shouldHideResult && !isSearching && searchTerm !== '' && (
        <div className="search-result">
          {data.length === 0 && searchTerm.length > 2 && (
            <EmptyState
              onButtonClicked={onReset}
              Svg={Octopus}
              title="No search result"
              buttonText="Reset Search"
            />
          )}
          {isFocused && data.length > 0 && (
            <>
              <Typography variant="overline" color="shade6">
                {searchTerm.length === 0 ? 'Recent Searches' : 'Results'}
              </Typography>
              <PaginateList
                list={data}
                labelPath={['label']}
                maxItemPerPage={6}
                onClickItem={(item) => {
                  saveSearchHistory(item.value, item.label, item.count);
                  history.push(BUYER_ROUTES.SEARCH_PREVIEW(item.value));
                }}
              />
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default SearchAddressView;
