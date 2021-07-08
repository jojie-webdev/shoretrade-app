import React, { useState } from 'react';

import Button from 'components/base/Button';
import TableComponent from 'components/module/ListingTable';
import Pagination from 'components/module/Pagination';
import SearchComponent from 'components/module/Search';
import debounce from 'lodash.debounce';

import {
  AUCTION_PRODUCT,
  DIRECT_SALE,
  AUCTION_PRODUCT_COLUMNS,
  DIRECT_SALE_COLUMNS,
  columnTemplate,
} from './Listings.constants';
import { ListingViewProps } from './Listings.props';
import {
  ActionContainer,
  Tab,
  Header,
  FlexContainer,
  SearchContainer,
  TabContainer,
  PaginationContainer,
} from './Listings.styles';

const Search = (props: { onChange: (value: string) => void }) => {
  const [value, setValue] = useState('');
  return (
    <SearchComponent
      style={{ marginBottom: 0 }}
      onChange={(event) => {
        setValue(event.target.value);
        props?.onChange?.(event.target.value);
      }}
      value={value}
      placeholder="Search for a listing"
      rounded
      resetValue={() => {
        setValue('');
        props?.onChange?.('');
      }}
    />
  );
};

export default function ListingView(props: ListingViewProps) {
  const {
    activeTab,
    handleSelectTab,
    setSortField,
    sortField,
    listings,
    setSearchTerm,
    isLoading,
    searchTerm,
    handleDownloadCSV,
    isDownloadingCsv,
    page,
    setPage,
    maxPage,
    isMobile,
    setSortOrder,
  } = props;

  let columns = DIRECT_SALE_COLUMNS;
  if (activeTab === AUCTION_PRODUCT) columns = AUCTION_PRODUCT_COLUMNS;

  const debouncedSearch = debounce(function (v: string) {
    setSearchTerm(v);
  }, 400);

  return (
    <div>
      <Header>
        <TabContainer>
          <Tab
            className={activeTab === DIRECT_SALE ? 'active' : ''}
            onClick={() => handleSelectTab(DIRECT_SALE)}
          >
            Direct Sale
          </Tab>
          {/* <Tab
            className={activeTab === AUCTION_PRODUCT ? 'active' : ''}
            onClick={() => handleSelectTab(AUCTION_PRODUCT)}
          >
            Auction Product
          </Tab> */}
        </TabContainer>
        <FlexContainer>
          <ActionContainer>
            <Button
              disabled={Boolean(isLoading) || isDownloadingCsv}
              onClick={handleDownloadCSV}
              text="Download"
              loading={Boolean(isLoading) || isDownloadingCsv}
              takeFullWidth={isMobile}
            />
          </ActionContainer>
          <SearchContainer>
            <Search onChange={debouncedSearch} />
          </SearchContainer>
        </FlexContainer>
      </Header>
      <TableComponent
        setSortField={setSortField}
        sortField={sortField}
        columnTemplate={columnTemplate}
        columns={columns}
        data={listings}
        isLoading={Boolean(isLoading)}
        searchTerm={searchTerm}
        setSortOrder={setSortOrder}
      />

      {maxPage > 1 && (
        <PaginationContainer>
          <Pagination
            numPages={maxPage}
            currentValue={page}
            variant="number"
            onClickButton={(page: number) => setPage(page)}
          />
        </PaginationContainer>
      )}
    </div>
  );
}
