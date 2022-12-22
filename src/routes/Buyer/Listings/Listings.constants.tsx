import React from 'react';

import moment from 'moment';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import theme from 'utils/Theme';

import { Chips, ChipsWrapper } from './Listings.styles';

export const columnTemplate = [
  '150px',
  '150px',
  '250px',
  '130px',
  '120px',
  '120px',
  '120px',
  '250px',
  '120px',
];
export const DEFAULT_PAGE_LIMIT = 10;

export const DIRECT_SALE = 0;
export const AUCTION_PRODUCT = 1;
export const DEFAULT_CURRENCY = '$';
export const DAILY = 'DAILY';

const DIRECT_SALE_DEFAULT_TABLE_SETTINGS = [
  'category',
  'name',
  'specifications',
  'size',
  'remainingWeight',
  'price',
  'endDate',
  'origin',
];

const AQUAFUTURE_DEFAULT_TABLE_SETTINGS = [
  'category',
  'name',
  'specifications',
  'size',
  'remainingWeight',
  'price',
  'catchDate',
  'endDate',
  'origin',
];

const PRE_AUCTION_DEFAULT_TABLE_SETTINGS = [
  'category',
  'name',
  'specifications',
  'size',
  'remainingWeight',
  'price',
  'auctionDate',
  'origin',
];

const AUCTION_DEFAULT_TABLE_SETTINGS = [
  'category',
  'name',
  'specifications',
  'size',
  'remainingWeight',
  'auctionDate',
  'origin',
];

export const DEFAULT_TABLE_SETTINGS = {
  allListing: DIRECT_SALE_DEFAULT_TABLE_SETTINGS,
  directSale: DIRECT_SALE_DEFAULT_TABLE_SETTINGS,
  aquafuture: AQUAFUTURE_DEFAULT_TABLE_SETTINGS,
  preAuction: PRE_AUCTION_DEFAULT_TABLE_SETTINGS,
  auction: AUCTION_DEFAULT_TABLE_SETTINGS,
};

export const COLUMN_GROUPS = [
  ['price', 'size'],
  ['remainingWeight', 'endDate'],
  ['catchDate', 'auctionDate'],
];

export const PRE_AUCTION_COLUMN_GROUPS = [
  ['price', 'size'],
  ['remainingWeight', 'auctionDate'],
];

const DIRECT_SALE_COLUMNS = [
  {
    name: 'Category',
    selector: 'category',
    sortable: true,
  },
  {
    name: 'Product Name',
    selector: 'name',
    sortable: true,
    // sticky: true,
  },
  {
    name: 'Specs',
    selector: 'specifications',
    sortable: false,
    // tooltip: (data: any) =>
    //   (data?.['specifications']?.split(',') || []).join(', '),
    component: function Specification(data: any, _state?: any) {
      return (
        <ChipsWrapper>
          {data?.specifications?.map(
            (specs: { value: string; type: string }) => {
              return (
                <Chips
                  key={`direct-spec-${data?.id}-${specs.value}`}
                  background={
                    specs.type === 'blue' ? theme.brand.info : theme.grey.shade3
                  }
                  color={
                    specs.type === 'blue'
                      ? theme.grey.noshade
                      : theme.grey.shade9
                  }
                >
                  {specs.value}
                </Chips>
              );
            }
          )}
        </ChipsWrapper>
      );
    },
  },
  {
    name: 'Size',
    selector: 'size',
    sortable: true,
    tooltip: (data: any) =>
      sizeToString(data?.metric, data?.sizeFrom, data?.sizeTo),
    component: function Size(data: any, _state: any) {
      return <>{sizeToString(data?.metric, data?.sizeFrom, data?.sizeTo)}</>;
    },
  },
  {
    name: 'Remaining',
    selector: 'remainingWeight',
    sortable: true,
    tooltip: (data: any) =>
      `${data?.remainingWeight} ${formatMeasurementUnit(data?.unit)}`,
    component: function RemainingWeight(data: any, _state: any) {
      const isAuction = data?.salesChannel === 'AUCTION';
      return (
        <>
          {!isAuction
            ? `${data?.remainingWeight} ${formatMeasurementUnit(data?.unit)}`
            : '-'}
        </>
      );
    },
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
    tooltip: (data: any) =>
      `${DEFAULT_CURRENCY}${data?.price || 0}${
        String(data?.price).split('.').length === 1 ? '.00' : ''
      }/${data?.unit?.toLowerCase()}`,
    component: function Price(data: any, _state: any) {
      const isAuction = data?.salesChannel === 'AUCTION';
      return (
        <>
          {!isAuction
            ? `${DEFAULT_CURRENCY}${data?.price || 0}${
                String(data?.price).split('.').length === 1 ? '.00' : ''
              }/${data?.unit?.toLowerCase()}`
            : '-'}
        </>
      );
    },
  },
  {
    name: 'Valid Until',
    selector: 'endDate',
    sortable: true,
    tooltip: (data: any) =>
      data?.endDate ? moment(data?.endDate).format('ll') : 'Always Available',
    component: function ValidUntil(data: any, _state: any) {
      const isSFM = process.env.REACT_APP_SFM;
      const currentDate = moment(new Date()).format('ll');
      const preAuctionDate = moment(data?.endDate)
        .subtract(1, 'days')
        .format('ll');

      const validUntil =
        isSFM && moment(data?.endDate).diff(currentDate, 'days') >= 0
          ? `${preAuctionDate} 10PM`
          : '-';

      const isAuctionOrPreauction =
        data?.salesChannel === 'AUCTION' ||
        data?.salesChannel === 'PRE_AUCTION';
      return (
        <>
          {!isAuctionOrPreauction
            ? data?.endDate
              ? moment(data?.endDate).format('ll')
              : 'Always Available'
            : validUntil}
        </>
      );
    },
  },
  {
    name: 'Company Name',
    selector: 'company',
    sortable: true,
    tooltip: (data: any) => {
      return `${data?.sellerName}`;
    },
    component: function CompanyName(data: any, _state: any) {
      return data?.sellerName;
    },
  },
  {
    name: 'Catchment Origin',
    selector: 'origin',
    sortable: true,
    tooltip: (data: any) => {
      return `${data?.origin?.suburb}, ${data?.origin?.state}, ${data?.origin?.countryCode}`;
    },
    component: function CatchmentOrigin(data: any, _state: any) {
      return (
        <>
          {data?.origin?.suburb}, {data?.origin?.state},{' '}
          {data?.origin?.countryCode}
        </>
      );
    },
  },
];

const AQUAFUTURE_COLUMNS = [
  {
    name: 'Category',
    selector: 'category',
    sortable: true,
  },
  {
    name: 'Product Name',
    selector: 'name',
    sortable: true,
    // sticky: true,
  },
  {
    name: 'Specs',
    selector: 'specifications',
    sortable: false,
    // tooltip: (data: any) =>
    //   (data?.['specifications']?.split(',') || []).join(', '),
    component: function Specification(data: any, _state?: any) {
      return (
        <ChipsWrapper>
          {data?.specifications.map(
            (specs: { value: string; type: string }) => {
              return (
                <Chips
                  key={`direct-spec-${data?.id}-${specs.value}`}
                  background={
                    specs.type === 'blue' ? theme.brand.info : theme.grey.shade3
                  }
                  color={
                    specs.type === 'blue'
                      ? theme.grey.noshade
                      : theme.grey.shade9
                  }
                >
                  {specs.value}
                </Chips>
              );
            }
          )}
        </ChipsWrapper>
      );
    },
  },
  {
    name: 'Size',
    selector: 'size',
    sortable: true,
    tooltip: (data: any) =>
      sizeToString(data?.metric, data?.sizeFrom, data?.sizeTo),
    component: function Size(data: any, _state: any) {
      return <>{sizeToString(data?.metric, data?.sizeFrom, data?.sizeTo)}</>;
    },
  },
  {
    name: 'Remaining',
    selector: 'remainingWeight',
    sortable: true,
    tooltip: (data: any) =>
      `${data?.remainingWeight} ${formatMeasurementUnit(data?.unit)}`,
    component: function RemainingWeight(data: any, _state: any) {
      return (
        <>
          {data?.remainingWeight} {formatMeasurementUnit(data?.unit)}
        </>
      );
    },
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
    tooltip: (data: any) =>
      `${DEFAULT_CURRENCY}${data?.price || 0}${
        String(data?.price).split('.').length === 1 ? '.00' : ''
      }/${data?.unit?.toLowerCase()}`,
    component: function Price(data: any, _state: any) {
      return (
        <>
          {`${DEFAULT_CURRENCY}${data?.price || 0}${
            String(data?.price).split('.').length === 1 ? '.00' : ''
          }`}
          /{data?.unit?.toLowerCase()}
        </>
      );
    },
  },
  {
    name: 'Estimated Catch Date',
    selector: 'catchDate',
    sortable: true,
    tooltip: (data: any) => moment(data?.catchDate).format('ll'),
    component: function EstimatedCatchDate(data: any, _state: any) {
      return <>{moment(data?.catchDate).format('ll')}</>;
    },
  },
  {
    name: 'Valid Until',
    selector: 'endDate',
    sortable: true,
    tooltip: (data: any) =>
      data?.endDate ? moment(data?.endDate).format('ll') : 'Always Available',
    component: function ValidUntil(data: any, _state: any) {
      return (
        <>
          {data?.endDate
            ? moment(data?.endDate).format('ll')
            : 'Always Available'}
        </>
      );
    },
  },
  {
    name: 'Company Name',
    selector: 'companyName',
    sortable: true,
    tooltip: (data: any) => {
      return `${data?.sellerName}`;
    },
    component: function CompanyName(data: any, _state: any) {
      return data?.sellerName;
    },
  },
  {
    name: 'Catchment Origin',
    selector: 'origin',
    sortable: true,
    tooltip: (data: any) => {
      return `${data?.origin?.suburb}, ${data?.origin?.state}, ${data?.origin?.countryCode}`;
    },
    component: function CatchmentOrigin(data: any, _state: any) {
      return (
        <>
          {data?.origin?.suburb}, {data?.origin?.state},{' '}
          {data?.origin?.countryCode}
        </>
      );
    },
  },
];

const PRE_AUCTION_COLUMNS = [
  {
    name: 'Category',
    selector: 'category',
    sortable: true,
  },
  {
    name: 'Product Name',
    selector: 'name',
    sortable: true,
    // sticky: true,
  },
  {
    name: 'Specs',
    selector: 'specifications',
    sortable: false,
    // tooltip: (data: any) =>
    //   (data?.['specifications']?.split(',') || []).join(', '),
    component: function Specification(data: any, _state?: any) {
      return (
        <ChipsWrapper>
          {data?.specifications.map(
            (specs: { value: string; type: string }) => {
              return (
                <Chips
                  key={`direct-spec-${data?.id}-${specs.value}`}
                  background={
                    specs.type === 'blue' ? theme.brand.info : theme.grey.shade3
                  }
                  color={
                    specs.type === 'blue'
                      ? theme.grey.noshade
                      : theme.grey.shade9
                  }
                >
                  {specs.value}
                </Chips>
              );
            }
          )}
        </ChipsWrapper>
      );
    },
  },
  {
    name: 'Size',
    selector: 'size',
    sortable: true,
    tooltip: (data: any) =>
      sizeToString(data?.metric, data?.sizeFrom, data?.sizeTo),
    component: function Size(data: any, _state: any) {
      return <>{sizeToString(data?.metric, data?.sizeFrom, data?.sizeTo)}</>;
    },
  },
  {
    name: 'Remaining',
    selector: 'remainingWeight',
    sortable: true,
    tooltip: (data: any) =>
      `${data?.remainingWeight} ${formatMeasurementUnit(data?.unit)}`,
    component: function RemainingWeight(data: any, _state: any) {
      return (
        <>
          {data?.remainingWeight} {formatMeasurementUnit(data?.unit)}
        </>
      );
    },
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
    tooltip: (data: any) =>
      `${DEFAULT_CURRENCY}${data?.price || 0}${
        String(data?.price).split('.').length === 1 ? '.00' : ''
      }/${data?.unit?.toLowerCase()}`,
    component: function Price(data: any, _state: any) {
      return (
        <>
          {`${DEFAULT_CURRENCY}${data?.price || 0}${
            String(data?.price).split('.').length === 1 ? '.00' : ''
          }`}
          /{data?.unit?.toLowerCase()}
        </>
      );
    },
  },
  {
    name: 'Auction Date',
    selector: 'auctionDate',
    sortable: true,
    tooltip: (data: any) =>
      data?.auctionDate ? moment(data?.auctionDate).format('ll') : '',
    component: function ValidUntil(data: any, _state: any) {
      return (
        <>{data?.auctionDate ? moment(data?.auctionDate).format('ll') : ''}</>
      );
    },
  },
  {
    name: 'Company Name',
    selector: 'companyName',
    sortable: true,
    tooltip: (data: any) => {
      return `${data?.sellerName}`;
    },
    component: function CompanyName(data: any, _state: any) {
      return data?.sellerName;
    },
  },
  {
    name: 'Catchment Origin',
    selector: 'origin',
    sortable: true,
    tooltip: (data: any) => {
      return `${data?.origin?.suburb}, ${data?.origin?.state}, ${data?.origin?.countryCode}`;
    },
    component: function CatchmentOrigin(data: any, _state: any) {
      return (
        <>
          {data?.origin?.suburb}, {data?.origin?.state},{' '}
          {data?.origin?.countryCode}
        </>
      );
    },
  },
];

const AUCTION_COLUMNS = [
  {
    name: 'Category',
    selector: 'category',
    sortable: true,
  },
  {
    name: 'Product Name',
    selector: 'name',
    sortable: true,
    // sticky: true,
  },
  {
    name: 'Specs',
    selector: 'specifications',
    sortable: false,
    // tooltip: (data: any) =>
    //   (data?.['specifications']?.split(',') || []).join(', '),
    component: function Specification(data: any, _state?: any) {
      return (
        <ChipsWrapper>
          {data?.specifications.map(
            (specs: { value: string; type: string }) => {
              return (
                <Chips
                  key={`direct-spec-${data?.id}-${specs.value}`}
                  background={
                    specs.type === 'blue' ? theme.brand.info : theme.grey.shade3
                  }
                  color={
                    specs.type === 'blue'
                      ? theme.grey.noshade
                      : theme.grey.shade9
                  }
                >
                  {specs.value}
                </Chips>
              );
            }
          )}
        </ChipsWrapper>
      );
    },
  },
  {
    name: 'Size',
    selector: 'size',
    sortable: true,
    tooltip: (data: any) =>
      sizeToString(data?.metric, data?.sizeFrom, data?.sizeTo),
    component: function Size(data: any, _state: any) {
      return <>{sizeToString(data?.metric, data?.sizeFrom, data?.sizeTo)}</>;
    },
  },
  {
    name: 'Quantity',
    selector: 'remainingWeight',
    sortable: true,
    tooltip: (data: any) =>
      `${data?.remainingWeight} ${formatMeasurementUnit(data?.unit)}`,
    component: function RemainingWeight(data: any, _state: any) {
      return (
        <>
          {data?.remainingWeight} {formatMeasurementUnit(data?.unit)}
        </>
      );
    },
  },
  {
    name: 'Auction Date',
    selector: 'auctionDate',
    sortable: true,
    tooltip: (data: any) =>
      data?.auctionDate ? moment(data?.auctionDate).format('ll') : '',
    component: function ValidUntil(data: any, _state: any) {
      return (
        <>{data?.auctionDate ? moment(data?.auctionDate).format('ll') : ''}</>
      );
    },
  },
  {
    name: 'Catchment Origin',
    selector: 'origin',
    sortable: true,
    tooltip: (data: any) => {
      return `${data?.origin?.suburb}, ${data?.origin?.state}, ${data?.origin?.countryCode}`;
    },
    component: function CatchmentOrigin(data: any, _state: any) {
      return (
        <>
          {data?.origin?.suburb}, {data?.origin?.state},{' '}
          {data?.origin?.countryCode}
        </>
      );
    },
  },
];

export const COLUMNS = {
  allListing: DIRECT_SALE_COLUMNS,
  directSale: DIRECT_SALE_COLUMNS,
  aquafuture: AQUAFUTURE_COLUMNS,
  preAuction: PRE_AUCTION_COLUMNS,
  auction: AUCTION_COLUMNS,
};
