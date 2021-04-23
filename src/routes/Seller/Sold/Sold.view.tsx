import React, { useEffect, useReducer, useState } from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import { Octopus, Crab, Fish } from 'components/base/SVG';
import DateRangePicker from 'components/module/DateRangePicker';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { SELLER_ROUTES } from 'consts';
import { isEmpty } from 'ramda';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { createUpdateReducer } from 'utils/Hooks';
import { parseOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';

import Delivered from './Delivered/Delivered.view';
import InTransit from './InTransit/InTransit.view';
import { SoldGeneratedProps, TabOptions } from './Sold.props';
import {
  Container,
  SearchFilterRow,
  SearchContainer,
  DateRangeContainer,
} from './Sold.style';
import ToShip from './ToShip/ToShip.view';

const TO_SHIP = 'To Ship';
const IN_TRANSIT = 'In Transit';
const DELIVERED = 'Delivered';

const EmptyView = (props: { currentTab: string }) => {
  const history = useHistory();
  const { currentTab } = props;

  const text = () => {
    if (currentTab === IN_TRANSIT) return 'transit';
    if (currentTab === DELIVERED) return 'delivery';

    return 'shipment';
  };

  const image = () => {
    if (currentTab === IN_TRANSIT) return Crab;
    if (currentTab === DELIVERED) return Fish;

    return Octopus;
  };

  return (
    <Row className="emptystate-row" align="center" justify="center">
      <Col>
        <EmptyState
          title={`You have no orders awaiting ${text()}`}
          Svg={image()}
          {...(currentTab === TO_SHIP
            ? {
                buttonText: 'Add a Product',
                onButtonClicked: () => history.push(SELLER_ROUTES.ADD_PRODUCT),
              }
            : {})}
        />
      </Col>
    </Row>
  );
};

const SoldView = (props: SoldGeneratedProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValueTable, updateSearchValueTable] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {
      [TO_SHIP]: '',
      [IN_TRANSIT]: '',
      [DELIVERED]: '',
    }
  );

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const {
    currentTab,
    onChangeCurrentTab,
    loadingCurrentTab,
    filters,
    updateFilters,
  } = props;

  const currentFilter = {
    [TO_SHIP]: filters.toShipFilters,
    [IN_TRANSIT]: filters.inTransitFilters,
    [DELIVERED]: filters.deliveredFilters,
  }[currentTab];
  const updateFilter = {
    [TO_SHIP]: updateFilters.updateToShipFilters,
    [IN_TRANSIT]: updateFilters.updateInTransitFilters,
    [DELIVERED]: updateFilters.updateDeliveredFilters,
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
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(searchValueTable[currentTab]);
  }, [currentTab]);

  let content;
  if (loadingCurrentTab) {
    content = <Loading label="Getting Listings" />;
  } else if (
    (currentTab === TO_SHIP &&
      isEmpty(props.toShip) &&
      isEmpty(props.pendingToShip)) ||
    (currentTab === IN_TRANSIT && isEmpty(props.inTransit)) ||
    (currentTab === DELIVERED &&
      isEmpty(props.delivered) &&
      !props.filters.deliveredFilters.dateFrom)
  ) {
    content = <EmptyView currentTab={currentTab} />;
  } else if (currentTab === TO_SHIP) {
    content = <ToShip {...props} />;
  } else if (currentTab === IN_TRANSIT) {
    content = <InTransit {...props} />;
  } else if (currentTab === DELIVERED) {
    content = <Delivered {...props} />;
  }

  return (
    <Container>
      <div className="controls-row">
        <SegmentedControls
          options={[TO_SHIP, IN_TRANSIT, DELIVERED]}
          selectedOption={currentTab}
          onClickControl={(value) => onChangeCurrentTab(value as TabOptions)}
        />
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

export default SoldView;
