import { Filters } from 'components/module/FilterModal/FilterModal.props';
import { GetMarketRequestBuyerFiltersResponseItem } from 'types/store/GetMarketRequestBuyerFiltersState';

export const getLocation = (
  values: string[],
  data: GetMarketRequestBuyerFiltersResponseItem
) => {
  const dataValues = data.location.filter(
    (v) => typeof v.key === 'string' && v.key.length > 0
  );
  return dataValues.find((val) => values.includes(val.text))?.key;
};

export const getRating = (
  values: string[],
  data: GetMarketRequestBuyerFiltersResponseItem
) => {
  const dataValues = data.rating.filter(
    (v) => typeof v.key === 'string' && v.key.length > 0
  );
  return dataValues.find((val) => values.includes(val.text))?.key;
};

export const getFavouriteSellers = (
  values: string[],
  data: GetMarketRequestBuyerFiltersResponseItem
) => {
  const dataValues = data.favouriteSellers.filter(
    (v) => typeof v.key === 'string' && v.key.length > 0
  );
  return dataValues.find((val) => values.includes(val.text))?.key;
};

export const requestToModalFilter = (
  data?: GetMarketRequestBuyerFiltersResponseItem
): { filters: Filters[] } => {
  if (!data) {
    return { filters: [] };
  }

  const locationValues = data.location.map((val) => val.text);
  const ratingValues = data.rating.map((val) => val.text);
  const favouriteSellersValues = data.favouriteSellers.map((val) => val.text);

  const filters: Filters[] = [
    { label: 'Location', values: locationValues, type: 'choice' },
    {
      label: 'Rating',
      values: ratingValues,
      type: 'choice',
    },
    {
      label: 'Seller',
      values: favouriteSellersValues,
      type: 'choice',
    },
  ];

  // const checkboxFilters: CheckboxFilter[] = data..map((val) => ({
  //   label: val.categoryName,
  //   value: val.categoryName,
  // }));

  return { filters };
};
