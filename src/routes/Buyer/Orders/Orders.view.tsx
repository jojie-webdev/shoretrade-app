import React, { useEffect, useState } from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import DateRangePicker from 'components/module/DateRangePicker';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
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
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const { currentTab, loadingCurrentTab, onChangeCurrentTab } = props;

  const { filters, updateFilters } = props;

  let currentFilter = filters.completedOrdersFilter;
  let updateFilter = updateFilters.updatePendingOrdersFilter;
  let title;

  const updateWatchers = (currentTab: string) => {
    switch (currentTab) {
      case PENDING:
        title = 'awaiting shipment';
        currentFilter = filters.pendingOrdersFilter;
        updateFilter = updateFilters.updatePendingOrdersFilter;
        break;
      case IN_TRANSIT:
        title = 'in transit';
        currentFilter = filters.inTransitOrdersFilter;
        updateFilter = updateFilters.updateInTransitOrdersFilter;
        break;
      case COMPLETE:
        title = 'completed';
        currentFilter = filters.completedOrdersFilter;
        updateFilter = updateFilters.updateCompletedOrdersFilter;
        break;
      default:
        currentFilter = filters.pendingOrdersFilter;
        updateFilter = updateFilters.updatePendingOrdersFilter;
        break;
    }
  };

  updateWatchers(currentTab);

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
    //enter
    if (e.charCode === 13 && searchValue.length > 2 && !loadingCurrentTab) {
      handleSearchValue(searchValue);
    }
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    if (!loadingCurrentTab) {
      const timerId = setTimeout(() => {
        handleSearchValue(searchValue);
      }, 800);
      setTimer(timerId);
    }
  }, [searchValue]);

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
            onChange={(val) => setSearchValue(val.currentTarget.value)}
            resetValue={() => clearSearchValue()}
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
          />
        </DateRangeContainer>
      </SearchFilterRow>
      {content}
    </Container>
  );
};

export default OrdersView;
