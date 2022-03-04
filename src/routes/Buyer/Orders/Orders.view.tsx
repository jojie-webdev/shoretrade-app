import React, { useEffect, useReducer, useState } from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import Tabs from 'components/base/Tabs';
import DateRangePicker from 'components/module/DateRangePicker';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { createUpdateReducer } from 'utils/Hooks';
import { SpecialColors } from 'utils/SFMTheme';
import { parseOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { useTheme } from 'utils/Theme';

import Complete from './Complete/Complete.view';
import InTransit from './InTransit/InTransit.view';
import { OrdersGeneratedProps, TabOptions } from './Orders.props';
import {
  Container,
  SearchContainer,
  SearchFilterRow,
  DateRangeContainer,
} from './Orders.style';
import Pending from './Pending/Pending.view';

const PENDING = 'Pending';
const IN_TRANSIT = 'In Transit';
const COMPLETE = 'Complete';

const OrdersView = (props: OrdersGeneratedProps) => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [searchValueTable, updateSearchValueTable] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {
      [PENDING]: '',
      [IN_TRANSIT]: '',
      [COMPLETE]: '',
    }
  );

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const {
    currentTab,
    loadingCurrentTab,
    onChangeCurrentTab,
    filters,
    updateFilters,
    toShipOrdersCount,
    completedOrdersCount,
    inTransitOrdersCount,
  } = props;

  const currentFilter = {
    [PENDING]: filters.toShipOrdersFilter,
    [IN_TRANSIT]: filters.inTransitOrdersFilter,
    [COMPLETE]: filters.completedOrdersFilter,
  }[currentTab];
  const updateFilter = {
    [PENDING]: updateFilters.updateToShipOrdersFilter,
    [IN_TRANSIT]: updateFilters.updateInTransitOrdersFilter,
    [COMPLETE]: updateFilters.updateCompletedOrdersFilter,
  }[currentTab];

  const handleSearchValue = (value: string) => {
    const parsedValue = parseOrderReferenceNumber(value);

    updateFilter({
      ...currentFilter,
      term: parsedValue,
      page: '1',
    });
  };

  const clearSearchValue = () => {
    updateFilter({
      ...currentFilter,
      term: '',
      page: '1',
    });
    setSearchValue('');
  };

  const fromOnDatesChange = (value: any) => {
    updateFilter({
      ...currentFilter,
      dateFrom: value.startDate,
      dateTo: value.endDate,
      page: '1',
    });
  };

  const onKeyUp = (e: any) => {
    // Allowing searching for shorter terms(n < 3) using enter key
    if (e.key === 'Enter' && !loadingCurrentTab) {
      handleSearchValue(searchValue);
    }
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    if (!loadingCurrentTab && searchValue.length > 2) {
      const timerId = setTimeout(() => {
        handleSearchValue(searchValue);
      }, 800);
      setTimer(timerId);
    }
    // eslint-disable-next-line
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(searchValueTable[currentTab]);
    // eslint-disable-next-line
  }, [currentTab]);

  let content;
  if (loadingCurrentTab) {
    content = <Loading />;
  } else if (currentTab === PENDING) {
    content = <Pending {...props} />;
  } else if (currentTab === IN_TRANSIT) {
    content = <InTransit {...props} />;
  } else if (currentTab === COMPLETE) {
    content = <Complete {...props} />;
  }

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
      <div className="controls-row">
        <div className="tabs">
          <Tabs
            tabs={[PENDING, IN_TRANSIT, COMPLETE]}
            selectedTab={currentTab}
            onClickTab={(value) => onChangeCurrentTab(value as TabOptions)}
            activeTextColor={
              theme.isSFM ? SpecialColors.blue : theme.grey.shade9
            }
            textColor={theme.grey.shade6}
            underlineColor={theme.grey.shade3}
            customTabContent={[
              toShipOrdersCount,
              inTransitOrdersCount,
              completedOrdersCount,
            ]}
            light
            tabStyle={{ padding: '4px 8px' }}
          />
        </div>
      </div>
      <SearchFilterRow>
        <SearchContainer>
          <Search
            onKeyUp={onKeyUp}
            value={searchValue}
            onChange={(val) => {
              setSearchValue(val.currentTarget.value);
              updateSearchValueTable({
                [currentTab]: val.currentTarget.value,
              });
            }}
            resetValue={() => {
              clearSearchValue();
              updateSearchValueTable({
                [currentTab]: '',
              });
            }}
            placeholder={'Search for a product, order or Seller'}
            rounded
          />
        </SearchContainer>
        <DateRangeContainer>
          <DateRangePicker
            background={theme.grey.shade3}
            border="none"
            startDate={currentFilter.dateFrom}
            endDate={currentFilter.dateTo}
            onDatesChange={(val) => fromOnDatesChange(val)}
            format="D MMM YYYY"
            onClear={() => {
              updateFilter({
                ...currentFilter,
                dateFrom: null,
                dateTo: null,
              });
            }}
          />
        </DateRangeContainer>
      </SearchFilterRow>
      {content}
    </Container>
  );
};

export default OrdersView;
