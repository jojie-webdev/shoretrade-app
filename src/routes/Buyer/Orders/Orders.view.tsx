import React from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import DateRangePicker from 'components/module/DateRangePicker';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
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
    updateFilter({
      ...currentFilter,
      term: value,
    });
  };

  const fromOnDatesChange = (value: any) => {
    updateFilter({
      ...currentFilter,
      dateFrom: value.startDate,
      dateTo: value.endDate,
    });
  };

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
            value={currentFilter.term}
            onChange={(e) => handleSearchValue(e.target.value)}
            resetValue={() => handleSearchValue('')}
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
