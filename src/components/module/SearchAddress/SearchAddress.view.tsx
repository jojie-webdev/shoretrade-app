import React, { useEffect, useState } from 'react';

import PaginateList from 'components/base/PaginateList';
import Select from 'components/base/Select';
import { Search as SearchSVG, CloseFilled, Octopus } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyState from 'components/module/EmptyState';
import { BUYER_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { SearchAddressProps } from './SearchAddress.props';
import {
  InputContainer,
  Container,
  AddressContainer,
} from './SearchAddress.style';
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
      <div style={{ flexDirection: 'column', flex: 3 }}>
        <InputContainer>
          <SearchSVG height={16} width={16} />
          <input
            type="text"
            placeholder="Search for a product"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            onFocus={() => {
              setIsFocused(true);
            }}
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
            setTargetAddress(e.value);
          }}
          value={currentDefaultAddressId}
        />
      </AddressContainer>
      <div className="search-result">
        {!shouldHideResult && !isSearching && (
          <>
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
          </>
        )}
      </div>
    </Container>
  );
};

export default SearchAddressView;
