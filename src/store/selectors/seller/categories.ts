import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

const getCustomFormData = (state: Store) => state.getCustomFormData.data?.data;

export const GetCategoryData = (categoryId: string) => {
  const { stateRules, categories } = useSelector(getCustomFormData) || {
    categories: [],
    stateRules: {},
  };
  const categoryData = categories.find((data) => data.id === categoryId);

  return categoryData
    ? {
        ...categoryData,
        stateRules,
      }
    : undefined;
};
