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
];
export const DEFAULT_PAGE_LIMIT = 10;

export const DIRECT_SALE = 0;
export const AUCTION_PRODUCT = 1;
export const DEFAULT_CURRENCY = '$';
export const DAILY = 'DAILY';
export const DEFAULT_TABLE_SETTINGS = [
  'category',
  'name',
  'specifications',
  'endDate',
  'origin',
];

export const COLUMN_GROUPS = [
  ['price', 'size'],
  ['remainingWeight', 'endDate'],
];

export const DIRECT_SALE_COLUMNS = [
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
          {(data?.specifications || []).map(
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

export const AUCTION_PRODUCT_COLUMNS = [
  {
    name: 'Category',
    selector: 'category',
    sortable: true,
  },
  {
    name: 'Product Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Specs',
    selector: 'specifications',
    sortable: true,
    component: function Specs(data: any, _state?: any) {
      return (
        <ChipsWrapper>
          {(data?.specifications || []).map(
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
    component: function Size(data: any, _state: any) {
      return (
        <>
          {data?.sizeFrom}-{data?.sizeTo}
        </>
      );
    },
  },
  {
    name: 'Crates',
    selector: 'crates',
    sortable: true,
  },
  {
    name: 'Weight',
    selector: 'weight',
    sortable: true,
  },
  {
    name: 'Catchment Origin',
    selector: 'origin',
    sortable: true,
    component: function CatchmentOrigin(data: any, _state: any) {
      return (
        <>
          {data?.origin?.state}, {data?.origin?.suburb},{' '}
          {data?.origin?.countryCode}
        </>
      );
    },
  },
];
