import React, { useEffect, useState } from 'react';

import Select from 'components/base/Select';
import { Octopus, Crab, Fish } from 'components/base/SVG';
import Tabs from 'components/base/Tabs';
import Typography from 'components/base/Typography';
// import DateRangePicker from 'components/module/DateRangePicker';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { parseOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';

import Delivered from './Delivered/Delivered.view';
import InTransit from './InTransit/InTransit.view';
import { SoldGeneratedProps, TabOptions } from './Sold.props';
import {
  Container,
  SearchFilterRow,
  SearchContainer,
  // DateRangeContainer,
} from './Sold.style';
import ToShip from './ToShip/ToShip.view';

const PENDING = 'Pending';
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
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isNonDesktop = useMediaQuery({ query: BREAKPOINTS.nonDesktop });

  const [searchValue, setSearchValue] = useState('');

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const {
    currentTab,
    onChangeCurrentTab,
    loadingCurrentTab,
    filters,
    updateFilters,
    toShipCount,
    inTransitCount,
    deliveredCount,
  } = props;

  const currentFilterMap = {
    [PENDING]: filters.pendingFilters,
    [TO_SHIP]: filters.toShipFilters,
    [IN_TRANSIT]: filters.inTransitFilters,
    [DELIVERED]: filters.deliveredFilters,
  };
  const currentFilter = currentFilterMap[currentTab];
  const updateFilterMap = {
    [PENDING]: updateFilters.updatePendingFilters,
    [TO_SHIP]: updateFilters.updateToShipFilters,
    [IN_TRANSIT]: updateFilters.updateInTransitFilters,
    [DELIVERED]: updateFilters.updateDeliveredFilters,
  };
  const updateFilter = updateFilterMap[currentTab];

  const handleSearchValue = (value: string) => {
    const parsedValue = parseOrderReferenceNumber(value);

    if (currentTab === TO_SHIP) {
      updateFilterMap[PENDING]({
        ...currentFilterMap[PENDING],
        term: parsedValue,
        page: '1',
      });
    }

    updateFilter({
      ...currentFilter,
      term: parsedValue,
      page: '1',
    });
  };

  const clearSearchValue = () => {
    if (currentTab === TO_SHIP) {
      updateFilterMap[PENDING]({
        ...currentFilterMap[PENDING],
        term: '',
        page: '1',
      });
    }
    updateFilter({
      ...currentFilter,
      term: '',
      page: '1',
    });
    setSearchValue('');
  };

  // const fromOnDatesChange = (value: any) => {
  //   updateFilter({
  //     ...currentFilter,
  //     dateFrom: value.startDate,
  //     dateTo: value.endDate,
  //     page: '1',
  //   });
  // };

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
    if (searchValue.length > 2) {
      handleSearchValue(searchValue);
    }
    // eslint-disable-next-line
  }, [currentTab]);

  let content;
  if (loadingCurrentTab) {
    content = <Loading />;
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
      {isNonDesktop && (
        <Typography
          variant="title5"
          style={{ marginBottom: 16 }}
          altFont
          color="noshade"
        >
          Sold
        </Typography>
      )}
      <div className="controls-row">
        <div className="tabs">
          {isMobile ? (
            <Select
              options={[
                { label: TO_SHIP, value: TO_SHIP },
                { label: IN_TRANSIT, value: IN_TRANSIT },
                { label: DELIVERED, value: DELIVERED },
              ]}
              value={currentTab}
              onChange={(v) => onChangeCurrentTab(v.value as TabOptions)}
              dark
            />
          ) : (
            <Tabs
              tabs={[TO_SHIP, IN_TRANSIT, DELIVERED]}
              selectedTab={currentTab}
              onClickTab={(value) => onChangeCurrentTab(value as TabOptions)}
              customTabContent={[toShipCount, inTransitCount, deliveredCount]}
              tabStyle={{ padding: '4px 8px' }}
            />
          )}
        </div>
        <SearchFilterRow>
          <SearchContainer>
            <Search
              className="search"
              onKeyUp={onKeyUp}
              value={searchValue}
              onChange={(val) => {
                setSearchValue(val.currentTarget.value);
              }}
              resetValue={() => {
                clearSearchValue();
              }}
              placeholder="Search for a product, order or buyer"
              rounded
            />
          </SearchContainer>
          {/* <DateRangeContainer>
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
        </DateRangeContainer> */}
        </SearchFilterRow>
      </div>
      {content}
    </Container>
  );
};

export default SoldView;
