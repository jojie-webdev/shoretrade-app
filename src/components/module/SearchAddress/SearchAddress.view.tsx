import React, { useEffect, useRef, useState } from 'react';

import MultiSelect from 'components/base/MultiSelect';
import PaginateList from 'components/base/PaginateList';
import Select from 'components/base/Select';
import { OptionsType } from 'components/base/Select/Select.props';
import { Label } from 'components/base/Select/Select.style';
import Slider from 'components/base/Slider';
import { Octopus } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyState from 'components/module/EmptyState';
import Search from 'components/module/Search';
import { SearchAddressProps } from 'components/module/SearchAddress/SearchAddress.props';
import { BUYER_ROUTES } from 'consts';
import debounce from 'lodash.debounce';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import IconTooltip from '../IconTooltip';
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
    buyingStates,
    listingMetrics,
    minBuyingQuantity,
    searchPreferences,
    updatePreferences,
    initialisedPreferences,
    clearUpdate,
  } = props;
  const theme = useTheme();
  const history = useHistory();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedBuyingStates, setSelectedBuyingStates] = useState<
    OptionsType[]
  >(
        (
          searchPreferences.isAllStates ? 
          buyingStates :
          searchPreferences.states?.map((s) => ({
              label: s,
              value: s,
            })) 
        ) ?? buyingStates
  );
  const [selectedMinBuyingQty, setSelectedMinBuyingQty] = useState(
    searchPreferences.weight ?? 0
  );
  const [selectedMetric, setSelectedMetric] = useState('ALL');

  useEffect(() => {
    if (initialisedPreferences) {
      setSelectedBuyingStates(
        (
          searchPreferences.isAllStates ? 
          buyingStates :
          searchPreferences.states?.map((s) => ({
              label: s,
              value: s,
            })) 
        ) ?? buyingStates
      );
      setSelectedMinBuyingQty(searchPreferences.weight ?? 0);
      clearUpdate();
    }
  }, [initialisedPreferences]);

  function blurOnEnter(event: any) {
    if (event.key === 'Enter' && inputRef !== null) {
      inputRef?.current?.blur();
    }
  }

  const updateBuyingState = (states: OptionsType[]) => {
    setSelectedBuyingStates(states);
    if (searchPreferences.states?.length !== states.length)
      updatePreferences({
        search: {
          ...searchPreferences,
          states: states.map((s) => s.value),
          isAllStates: states.length === buyingStates.length
        },
      });
  };

  const updateMinBuyingQty = (weight: number) => {
    setSelectedMinBuyingQty(weight);
    updatePreferences({
      search: {
        ...searchPreferences,
        weight,
      },
    });
  };

  const updateMetric = (metric: string) => {
    setSelectedMetric(metric);
    updatePreferences({
      search: {
        ...searchPreferences,
        metric,
      },
    });
  };

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
        rounded
      />

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
          label="Buying from"
          options={buyingStates}
          placeholder="Select..."
          selectedAllText="All States"
          background={theme.grey.shade3}
          selected={selectedBuyingStates}
          updateSelected={updateBuyingState}
          unbordered
          labelTooltip={
            <IconTooltip
              variant="info"
              content="Only want to buy from certain areas? Restrict the states you want to purchase from using this filter."
            />
          }
        />

        <BuyingQuantityContainer>
          <Label variant="overline" color="shade6" style={{ width: '100%' }}>
            Minimum Buying Quantity
            <IconTooltip
              variant="info"
              content="Are the Minimum Order amounts too large for your business? Reduce the toggle here to see listings that have a less than or equal to Minimum Order amount."
            />
          </Label>
          <div className="filters">
            <TextField
              className="weight-input"
              value={selectedMinBuyingQty}
              onChange={(e) => updateMinBuyingQty(Number(e.target.value))}
              type="number"
            />

            {/* <Select
              className="search-address-select"
              options={listingMetrics}
              unbordered={true}
              onChange={(e) => {
                updateMetric(e.value);
              }}
              value={selectedMetric}
            /> */}

            <div style={{ minWidth: '70%' }}>
              <Slider
                value={selectedMinBuyingQty}
                onChange={(v) => {
                  if (typeof v === 'number') {
                    updateMinBuyingQty(v);
                  }
                }}
                min={0}
                max={minBuyingQuantity}
                maskValue={(v) => ``}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onAfterChange={() => {}}
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
