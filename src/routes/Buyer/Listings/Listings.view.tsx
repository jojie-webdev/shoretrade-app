import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Select from 'components/base/Select';
import { Cog, ChevronRight, Exit, Crab } from 'components/base/SVG';
import Tabs from 'components/base/Tabs';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import ListingCard from 'components/module/ListingCard';
import TableComponent from 'components/module/ListingTable';
import Loading from 'components/module/Loading';
import Pagination from 'components/module/Pagination';
import SearchComponent from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import { SALES_CHANNELS_BUYER } from 'consts/salesChannels';
import debounce from 'lodash.debounce';
import { useMediaQuery } from 'react-responsive';
import { useComponentShouldUpdate } from 'utils/Hooks/useComponentShouldUpdate';
import theme from 'utils/Theme';

import {
  // AUCTION_PRODUCT,
  // AUCTION_PRODUCT_COLUMNS,
  DIRECT_SALE_COLUMNS,
  columnTemplate,
  COLUMN_GROUPS,
} from './Listings.constants';
import { ListingViewProps, CounterProps } from './Listings.props';
import {
  ActionContainer,
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
  TabItem,
  Tag,
} from './Listings.styles';

const Search = (props: {
  onChange: (value: string) => void;
  defaultValue: string;
  activeTab: string;
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.defaultValue);
    // eslint-disable-next-line
  }, [props.activeTab]);

  return (
    <SearchComponent
      style={{ marginBottom: 0, padding: '5px 10px' }}
      onChange={(event) => {
        setValue(event.target.value);
        props?.onChange?.(event.target.value);
      }}
      value={value}
      placeholder="Search..."
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
    listings,
    handleDownloadCSV,
    isDownloadingCsv,
    isMobile,
    showModal,
    setShowModal,
    selectedIds,
    setSelectedIds,
    isAllSelected,
    setIsAllSelected,
    isTablet,
    tableSettings,
    setTableSettings,
    showTableSettings,
    setShowTableSettings,
    prevListingData,
    unselectedIds,
    handleSelectRow,
    isPending,
    counter,
    totalCount,
    totalPage,
    search,
    onChangeSearch,
    activeTab,
    onChangeTab,
    page,
    onChangePage,
    sorting,
    onChangeSortField,
    onChangeSortOrder,
    goToProductDetails,
  } = props;

  const [settings, setSettings] = useState(tableSettings);

  const isEmpty = !isPending && !listings.length;

  const columns = DIRECT_SALE_COLUMNS;

  const downloadListingCount = isAllSelected
    ? totalCount - unselectedIds.length
    : selectedIds.length;

  const isSmallDesktop = useMediaQuery({ query: BREAKPOINTS['xl'] });

  // sync tableSettingProps
  useComponentShouldUpdate(() => {
    setSettings(tableSettings);
  }, [tableSettings]);

  // focus on preloading screen
  useComponentShouldUpdate(() => {
    if (isPending && prevListingData && isMobile && !search) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [isPending, prevListingData, isMobile, search]);

  // cleanup
  useEffect(() => {
    columns.forEach((column) => {
      localStorage.removeItem(`col:${column?.selector}`);
    });
    // eslint-disable-next-line
  }, []);

  // if (activeTab === AUCTION_PRODUCT) columns = AUCTION_PRODUCT_COLUMNS;

  const debouncedSearch = debounce(function (value: string) {
    onChangeSearch(value);
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

  const TabComponent = (
    <TabContainer>
      <Tabs
        tabStyle={{ padding: '9px 12px' }}
        textColor={theme.grey.shade6}
        activeTextColor={theme.grey.shade9}
        underlineColor={theme.grey.shade3}
        fitTabWidthToContent={true}
        selectedTab={activeTab}
        onClickTab={(tab) => onChangeTab(tab)}
        justify="start"
        tabValues={SALES_CHANNELS_BUYER.map((channel) => channel.value)}
        tabElements={SALES_CHANNELS_BUYER.map((channel) => (
          <TabItem key={channel.value}>
            <div className="tab-label">{channel.label}</div>
            <Tag background={theme.grey.shade9}>
              <Typography
                variant="overlineSmall"
                color="shade9"
                style={{ fontSize: '9px' }}
              >
                {counter[channel.value as keyof CounterProps]}
              </Typography>
            </Tag>
          </TabItem>
        ))}
      />
    </TabContainer>
  );

  const DesktopHeader = (
    <Header>
      {TabComponent}
      <FlexContainer
        style={{
          width: isSmallDesktop || isTablet ? '100%' : '35%',
          marginTop: isSmallDesktop || isTablet ? '16px' : '0',
        }}
      >
        {(isSmallDesktop || isTablet) && (
          <SearchContainer>
            <Search
              defaultValue={search}
              onChange={debouncedSearch}
              activeTab={activeTab}
            />
          </SearchContainer>
        )}
        <ActionContainer>
          <Button
            disabled={Boolean(isPending) || isDownloadingCsv}
            onClick={() => setShowModal(true)}
            text="Download"
            takeFullWidth={isMobile}
            borderRadius="8px"
            padding="10px 12px"
          />
        </ActionContainer>
        {!(isSmallDesktop || isTablet) && (
          <SearchContainer>
            <Search
              defaultValue={search}
              onChange={debouncedSearch}
              activeTab={activeTab}
            />
          </SearchContainer>
        )}
      </FlexContainer>
    </Header>
  );

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

  const mobileListing = search ? listings : [...prevListingData, ...listings];

  if (isMobile) {
    return (
      <div>
        {DownloadConfirmationModal}
        {TableSettingsModal}
        <MobileSearchContainer>
          <Search
            defaultValue={search}
            onChange={debouncedSearch}
            activeTab={activeTab}
          />
          <MobileDownloadButton
            disabled={Boolean(isPending) || isDownloadingCsv}
            onClick={() => setShowModal(true)}
          >
            <div>
              <Exit width={13.33} height={13.33} fill="#E35D32" />
            </div>
          </MobileDownloadButton>
        </MobileSearchContainer>
        <Select
          grey={true}
          borderRadius="12px"
          border="none"
          marginTop="0"
          height="40px"
          padding="10px 12px"
          options={[...SALES_CHANNELS_BUYER].map((channel) => ({
            value: channel.value,
            label: `${channel.label} Listings`,
          }))}
          value={activeTab}
          onChange={(o) => onChangeTab(o.value)}
          arrowIcon={
            <ChevronRight
              fill={theme.brand.primary}
              style={{ transform: 'rotate(90deg)' }}
            />
          }
        />
        <TableSettingsContainer onClick={() => setShowTableSettings(true)}>
          <div>
            <Cog /> <span>Table Settings</span>
          </div>
          <ChevronRight width={12} height={16} />
        </TableSettingsContainer>
        <MobileResults>
          <div>
            <span className="total-count">{totalCount || 0}</span> Results
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
                handleOnClick={() => goToProductDetails(listing.id)}
              />
            ))}
            {isPending && (
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
              Unable to find result {search ? `for keyword: '${search}'` : ''}
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
        setSortField={onChangeSortField}
        sortField={sorting.field}
        sortOrder={sorting.order}
        columnTemplate={columnTemplate}
        columns={columns}
        data={listings}
        isLoading={Boolean(isPending)}
        searchTerm={search}
        setSortOrder={onChangeSortOrder}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        isAllSelected={isAllSelected}
        setIsAllSelected={setIsAllSelected}
        onSelect={handleSelectRow}
        unselectedIds={unselectedIds}
        onRowItemClick={goToProductDetails}
      />
      {totalPage > 1 && (
        <PaginationContainer>
          <Pagination
            numPages={totalPage}
            currentValue={page}
            onClickButton={(value) => onChangePage(value)}
            variant="number"
            color="shade10"
            iconColor={theme.grey.shade10}
          />
        </PaginationContainer>
      )}
    </div>
  );
}
