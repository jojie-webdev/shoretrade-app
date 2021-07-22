import React from 'react';

import moment from 'moment';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';

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
    sortable: true,
    component: function Specification(data: any, _state?: any) {
      return (
        <ChipsWrapper>
          {(data?.['specifications']?.split(',') || []).map((specs: string) => {
            return <Chips key={`direct-spec-${data?.id}`}>{specs}</Chips>;
          })}
        </ChipsWrapper>
      );
    },
  },
  {
    name: 'Size',
    selector: 'size',
    sortable: true,
    component: function Size(data: any, _state: any) {
      return <>{sizeToString(data?.metric, data?.size_from, data?.size_to)}</>;
    },
  },
  {
    name: 'Remaining',
    selector: 'remaining_weight',
    sortable: true,
    component: function RemainingWeight(data: any, _state: any) {
      return (
        <>
          {data?.remaining_weight} {formatMeasurementUnit(data?.unit)}
        </>
      );
    },
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
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
    selector: 'ends',
    sortable: true,
    component: function ValidUntil(data: any, _state: any) {
      return (
        <>{data?.catch_recurrence || moment(data?.end_date).format('ll')}</>
      );
    },
  },
  {
    name: 'Catchment Origin',
    selector: 'origin',
    sortable: true,
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
          {(data?.['specifications']?.split(',') || []).map((specs: string) => {
            return <Chips key={`auction-spec-${data?.id}`}>{specs}</Chips>;
          })}
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
          {data?.size_from}-{data?.size_to}
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
