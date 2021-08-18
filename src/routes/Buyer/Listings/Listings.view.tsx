import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
// import Select from 'components/base/Select';
import { Cog, ChevronRight, Exit, Crab } from 'components/base/SVG';
import Modal from 'components/layout/Modal';
import ListingCard from 'components/module/ListingCard';
import TableComponent from 'components/module/ListingTable';
import Loading from 'components/module/Loading';
import PaginationBar from 'components/module/PaginationBar';
import SearchComponent from 'components/module/Search';
import debounce from 'lodash.debounce';
import { useComponentShouldUpdate } from 'utils/Hooks/useComponentShouldUpdate';
import theme from 'utils/Theme';

import {
  // AUCTION_PRODUCT,
  DIRECT_SALE,
  // AUCTION_PRODUCT_COLUMNS,
  DIRECT_SALE_COLUMNS,
  columnTemplate,
  COLUMN_GROUPS,
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
  TableSettingsCheckbox,
  SettingsCheckboxContainer,
  MobileSearchContainer,
  MobileDownloadButton,
  TableSettingsContainer,
  MobileTable,
  Preloader,
  EmptyScreen,
  // TabletHeaderSortContainer,
  MobileResults,
} from './Listings.styles';

const Search = (props: {
  onChange: (value: string) => void;
  defaultValue?: string;
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (props.defaultValue) setValue(props.defaultValue);
  }, []);

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
    tableSettings,
    setTableSettings,
    showTableSettings,
    setShowTableSettings,
    prevListingData,
    unselectedIds,
    handleSelectRow,
  } = props;

  const [settings, setSettings] = useState(tableSettings);

  const isEmpty = !isLoading && !listings.length;

  const columns = DIRECT_SALE_COLUMNS;

  const downloadListingCount = isAllSelected
    ? totalCount - unselectedIds.length
    : selectedIds.length;

  // sync tableSettingProps
  useComponentShouldUpdate(() => {
    setSettings(tableSettings);
  }, [tableSettings]);

  // focus on preloading screen
  useComponentShouldUpdate(() => {
    if (isLoading && prevListingData && isMobile && !searchTerm) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [isLoading, prevListingData, isMobile, searchTerm]);

  // cleanup
  useEffect(() => {
    columns.forEach((column) => {
      localStorage.removeItem(`col:${column?.selector}`);
    });
  }, []);

  // if (activeTab === AUCTION_PRODUCT) columns = AUCTION_PRODUCT_COLUMNS;

  const options = columns
    .filter((column) => column?.sortable)
    .map((column) => ({
      value: column.selector,
      label: column.name,
    }));

  const debouncedSearch = debounce(function (v: string) {
    setSearchTerm(v);
  }, 400);

  const handleOnCloseTableSettingsModal = () => {
    setShowTableSettings(false);
    // reset the setting
    setSettings(tableSettings);
  };

  const handleSaveSettings = () => {
    setShowTableSettings(false);
    setTableSettings(settings);
  };

  const handleRemoveFromSelectedIds = (id: string) => {
    setSelectedIds((ids) => {
      return ids.filter((selectedId) => selectedId !== id);
    });
  };

  const TabComponent = (
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
  );

  const DesktopHeader = (
    <Header>
      {TabComponent}
      <FlexContainer>
        <ActionContainer>
          <Button
            disabled={Boolean(isLoading) || isDownloadingCsv}
            onClick={() => setShowModal(true)}
            text="Download"
            loading={Boolean(isLoading) || isDownloadingCsv}
            takeFullWidth={isMobile}
          />
        </ActionContainer>
        <SearchContainer>
          <Search defaultValue={searchTerm} onChange={debouncedSearch} />
        </SearchContainer>
      </FlexContainer>
    </Header>
  );

  // const TabletHeader = (
  //   <Header style={{ gap: 8 }}>
  //     <div>
  //       <SearchContainer>
  //         <Search onChange={debouncedSearch} />
  //       </SearchContainer>
  //     </div>

  //     <TabletHeaderSortContainer>
  //       <div className="results">{totalCount} Results</div>
  //       <div className="dropdown">
  //         <Select
  //           label=""
  //           options={options}
  //           size="small"
  //           placeholder="Sort By"
  //           grey
  //           onChange={(e) => setSortField(e?.value)}
  //         />
  //       </div>
  //     </TabletHeaderSortContainer>
  //   </Header>
  // );

  const DownloadConfirmationModal = (
    <Modal isOpen={showModal} onClickClose={() => setShowModal(false)}>
      <ModalContentContainer>
        <ModalTitle variant="title5" className="title">
          Confirm Download
        </ModalTitle>
        You are about to download <strong>{downloadListingCount}</strong>{' '}
        listings. <br />
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
  );

  const TableSettingsModal = (
    <Modal
      isOpen={showTableSettings}
      onClickClose={handleOnCloseTableSettingsModal}
    >
      <ModalContentContainer>
        <ModalTitle variant="title5">View Settings</ModalTitle>
        Hide data from the table by unchecking fields
      </ModalContentContainer>
      <TableSettingsCheckbox>
        {columns.map((column) => {
          const isSelected = settings.includes(column?.selector);
          return (
            <SettingsCheckboxContainer key={`settings-${column.selector}`}>
              <Checkbox
                checked={isSelected}
                size={20}
                borderColor={theme.grey.shade7}
                onClick={(e) => {
                  if (settings.length === 1 && isSelected) return; // prevents empty setting
                  isSelected
                    ? setSettings((settings) =>
                        settings.filter(
                          (setting) => setting !== column?.selector
                        )
                      ) // removes from the setting list
                    : setSettings((prev) => [...prev, column?.selector]); // append to the settings
                }}
              />
              {column?.name}
            </SettingsCheckboxContainer>
          );
        })}
      </TableSettingsCheckbox>
      <Button
        takeFullWidth
        // disabled={isDownloadingCsv}
        // loading={isDownloadingCsv}
        onClick={handleSaveSettings}
        text="Save Settings"
      />
    </Modal>
  );

  const mobileListing = !!searchTerm
    ? listings
    : [...prevListingData, ...listings];

  if (isMobile) {
    return (
      <div>
        {DownloadConfirmationModal}
        {TabComponent}
        {TableSettingsModal}
        <MobileSearchContainer>
          <Search defaultValue={searchTerm} onChange={debouncedSearch} />
          <MobileDownloadButton
            disabled={Boolean(isLoading) || isDownloadingCsv}
            onClick={() => setShowModal(true)}
          >
            <div>
              <Exit width={13.33} height={13.33} fill="#E35D32" />
            </div>
          </MobileDownloadButton>
        </MobileSearchContainer>
        <TableSettingsContainer onClick={() => setShowTableSettings(true)}>
          <div>
            <Cog /> <span>Table Settings</span>
          </div>
          <ChevronRight width={12} height={16} />
        </TableSettingsContainer>
        <MobileResults>
          <div>
            <span className="total-count">{totalCount}</span> Results
          </div>
          <div className="checkbox-container">
            <span>Select All</span>
            <Checkbox
              size={20}
              borderColor={theme.grey.shade7}
              checked={isAllSelected}
              onClick={() => setIsAllSelected(!isAllSelected)}
            />
          </div>
        </MobileResults>
        {!isEmpty && (
          <MobileTable>
            {mobileListing.map((listing: any, index) => (
              <ListingCard
                last={index === mobileListing.length - 1}
                key={`listing-card-${listing?.id}`}
                data={listing}
                columns={columns}
                groups={COLUMN_GROUPS}
                tableSettings={tableSettings}
                isSelected={
                  unselectedIds.includes(listing?.id)
                    ? false
                    : isAllSelected || selectedIds.includes(listing?.id)
                }
                onSelect={(selected) => handleSelectRow(listing?.id, !selected)}
              />
            ))}
            {isLoading && (
              <Preloader>
                <Loading />
              </Preloader>
            )}
          </MobileTable>
        )}
        {isEmpty && (
          <EmptyScreen>
            <Crab height={268} width={268} fill={theme.grey.shade7} />
            <div>
              Unable to find result{' '}
              {searchTerm ? `for keyword: '${searchTerm}'` : ''}
            </div>
          </EmptyScreen>
        )}
      </div>
    );
  }

  return (
    <div>
      {DownloadConfirmationModal}
      {!isMobile && DesktopHeader}
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
        onSelect={handleSelectRow}
        unselectedIds={unselectedIds}
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
