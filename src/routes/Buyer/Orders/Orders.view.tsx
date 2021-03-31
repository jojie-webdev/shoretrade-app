import React, { useState } from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import { Oysters } from 'components/base/SVG';
import DateRangePicker from 'components/module/DateRangePicker';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  const {
    currentTab,
    loadingCurrentTab,
    onChangeCurrentTab,
    pendingOrders,
    completedOrders,
    inTransitOrders,
  } = props;

  const {
    filters,
    updateFilters,
    setFromFocusedInput,
    fromFocusedInput,
  } = props;

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

  const fromOnFocusChange = (f: any) => {
    setFromFocusedInput(!f ? 'startDate' : f);
  };

  const handleSearchValue = (value: string) => {
    updateFilter({
      ...currentFilter,
      term: value,
    });
  };

  const fromOnDatesChange = (value: any) => {
    console.log(value);
    updateFilter({
      ...currentFilter,
      dateFrom: value.startDate,
      dateTo: value.endDate,
    });
  };

  const toOnDatesChange = (value: any) => {
    console.log(value);
    updateFilter({
      ...filters,
      dateFrom: value.startDate,
      dateTo: value.endDate,
    });
  };

  let content;
  switch (currentTab) {
    case PENDING:
      title = 'awaiting shipment';
      break;
    case IN_TRANSIT:
      title = 'in transit';
      break;
    case COMPLETE:
      title = 'completed';
      break;

    default:
      break;
  }
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
            value={currentFilter.term}
            onChange={(e) => handleSearchValue(e.target.value)}
            resetValue={() => handleSearchValue('')}
            placeholder="Search by order#, product type & seller..."
            rounded
          />
        </SearchContainer>
        <DateRangeContainer>
          <DateRangePicker
            onFocusChange={fromOnFocusChange}
            focusedInput={fromFocusedInput}
            startDate={currentFilter.dateFrom}
            endDate={currentFilter.dateTo}
            onDatesChange={(val) => fromOnDatesChange(val)}
            format="D MMM YYYY"
          />
          {/* <DateRangePicker
            onDatesChange={toOnDatesChange}
            startDate={currentFilter.dateFrom}
            endDate={currentFilter.dateTo}
            format="D MMM YYYY"
            focusedInput={toFocusedInput}
            onFocusChange={toOnFocusChange}
          /> */}
        </DateRangeContainer>
      </SearchFilterRow>
      {content}
    </Container>
  );
};

export default OrdersView;
