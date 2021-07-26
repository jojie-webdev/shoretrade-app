import React, { useState } from 'react';

import Button from 'components/base/Button';
import Select from 'components/base/Select';
import { Cog, ChevronRight, Exit } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import ListingCard from 'components/module/ListingCard';
import TableComponent from 'components/module/ListingTable';
import PaginationBar from 'components/module/PaginationBar';
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
  ModalContentContainer,
  ModalTitle,
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
    showModal,
    setShowModal,
    selectedIds,
    setSelectedIds,
    isAllSelected,
    setIsAllSelected,
    totalCount,
    limit,
    setLimit,
    isTablet,
  } = props;

  let columns = DIRECT_SALE_COLUMNS;
  if (activeTab === AUCTION_PRODUCT) columns = AUCTION_PRODUCT_COLUMNS;

  const options = columns
    .filter((column) => column?.sortable)
    .map((column) => ({
      value: column.selector,
      label: column.name,
    }));

  const debouncedSearch = debounce(function (v: string) {
    setSearchTerm(v);
  }, 400);

  const DesktopHeader = (
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
  );

  const TabletHeader = (
    <Header style={{ gap: 8 }}>
      <div>
        <SearchContainer>
          <Search onChange={debouncedSearch} />
        </SearchContainer>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 8 }}>{totalCount} Results</div>
        <div style={{ width: 150 }}>
          <Select
            label=""
            options={options}
            size="small"
            placeholder="Sort By"
            grey
            onChange={(e) => setSortField(e?.value)}
          />
        </div>
      </div>
    </Header>
  );

  if (isMobile) {
    return (
      <div>
        <TabContainer>
          <Tab
            className={activeTab === DIRECT_SALE ? 'active' : ''}
            onClick={() => handleSelectTab(DIRECT_SALE)}
          >
            Direct Sale
          </Tab>
        </TabContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 12,
          }}
        >
          <Search onChange={debouncedSearch} />
          <button
            disabled={Boolean(isLoading) || isDownloadingCsv}
            onClick={handleDownloadCSV}
            style={{
              padding: '6px 12px',
              borderRadius: 12,
              border: '1.5px solid #E35D32',
              background: 'transparent',
            }}
          >
            <div
              style={{
                transform: 'rotate(90deg)',
              }}
            >
              <Exit width={13.33} height={13.33} fill="#E35D32" />
            </div>
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            background: '#fff',
            marginBottom: 16,
            borderRadius: 12,
            boxShadow: '0px 4px 12px 0px #292B320A',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            <Cog /> <span>Table Settings</span>
          </div>
          <ChevronRight width={12} height={16} />
        </div>
        <div
          style={{
            borderRadius: 12,
            background: 'white',
            border: '1px solid #E5E8F5',
          }}
        >
          {listings.map((listing: any) => (
            <ListingCard
              data={listing}
              columns={columns}
              key={`listing-card-${listing?.id}`}
              tableSettings={columns.map((column) => column?.selector)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Modal isOpen={showModal} onClickClose={() => setShowModal(false)}>
        <ModalContentContainer>
          <ModalTitle variant="title5" className="title">
            Confirm Download
          </ModalTitle>
          You are about to download {totalCount} listings. <br />
          If this is not correct, adjust your selections using the check box in
          the table.
          <div>Otherwise, press Proceed to continue.</div>
        </ModalContentContainer>
        <Button
          takeFullWidth={isMobile}
          disabled={isDownloadingCsv}
          loading={isDownloadingCsv}
          onClick={handleDownloadCSV}
          text="Proceed"
        />
      </Modal>
      {!isMobile && !isTablet && DesktopHeader}
      {isTablet && TabletHeader}
      <TableComponent
        setSortField={setSortField}
        sortField={sortField}
        columnTemplate={columnTemplate}
        columns={columns}
        data={listings}
        isLoading={Boolean(isLoading)}
        searchTerm={searchTerm}
        setSortOrder={setSortOrder}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        isAllSelected={isAllSelected}
        setIsAllSelected={setIsAllSelected}
      />

      <PaginationContainer>
        <PaginationBar
          page={page}
          limit={limit}
          totalCount={totalCount}
          setLimit={setLimit}
          setPage={setPage}
          maxPage={maxPage}
        />
      </PaginationContainer>
    </div>
  );
}
