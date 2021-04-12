import React, { useEffect, useReducer, useState } from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import DateRangePicker from 'components/module/DateRangePicker';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
import { createUpdateReducer } from 'utils/Hooks';
import { parseOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';

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

  const { currentTab, loadingCurrentTab, onChangeCurrentTab } = props;

  const { filters, updateFilters } = props;

  const currentFilter = {
    [PENDING]: filters.pendingOrdersFilter,
    [IN_TRANSIT]: filters.inTransitOrdersFilter,
    [COMPLETE]: filters.completedOrdersFilter,
  }[currentTab];
  const updateFilter = {
    [PENDING]: updateFilters.updatePendingOrdersFilter,
    [IN_TRANSIT]: updateFilters.updateInTransitOrdersFilter,
    [COMPLETE]: updateFilters.updateCompletedOrdersFilter,
  }[currentTab];

  const handleSearchValue = (value: string) => {
    const parsedValue = parseOrderReferenceNumber(value);

    updateFilter({
      ...currentFilter,
      term: parsedValue,
    });
  };

  const clearSearchValue = () => {
    updateFilter({
      ...currentFilter,
      term: '',
    });
    setSearchValue('');
  };

  const fromOnDatesChange = (value: any) => {
    updateFilter({
      ...currentFilter,
      dateFrom: value.startDate,
      dateTo: value.endDate,
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
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(searchValueTable[currentTab]);
  }, [currentTab]);

  let content;
  if (loadingCurrentTab) {
    content = <Loading />;
  } else if (currentTab == PENDING) {
    content = <Pending {...props} />;
  } else if (currentTab == IN_TRANSIT) {
    content = <InTransit {...props} />;
  } else if (currentTab == COMPLETE) {
    content = <Complete {...props} />;
  }

  return (
    <Container>
      <Row className="controls-row">
        <Col>
          <SegmentedControls
            options={['Pending', 'In Transit', 'Complete']}
            selectedOption={currentTab}
            onClickControl={(value) => onChangeCurrentTab(value as TabOptions)}
          />
        </Col>
      </Row>
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
            placeholder="Search by order#, product type & seller..."
            rounded
          />
        </SearchContainer>
        <DateRangeContainer>
          <DateRangePicker
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
