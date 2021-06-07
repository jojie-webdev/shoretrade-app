import React, { useRef, useState } from 'react';

import PaginateList from 'components/base/PaginateList';
import Select from 'components/base/Select';
import { Octopus } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyState from 'components/module/EmptyState';
import Search from 'components/module/Search';
import { SearchAddressProps } from 'components/module/SearchAddress/SearchAddress.props';
import { BUYER_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { Container, AddressContainer } from './SearchAddress.style';

const SearchAddressView = (props: SearchAddressProps): JSX.Element => {
  const theme = useTheme();
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

  const history = useHistory();
  const [isFocused, setIsFocused] = useState(false);
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
        placeholder="Search for a Product"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onFocus={() => {
          setIsFocused(true);
        }}
        onKeyPress={blurOnEnter}
      />

      <AddressContainer>
        <Select
          className="search-address-select"
          options={addressOptions}
          label="Buying For"
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
      </AddressContainer>

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
