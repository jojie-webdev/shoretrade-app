import { TopCategoriesData } from '../Landing/Landing.props';

export interface CategoriesGeneratedProps {
  dateRange: string;
  isLoading: boolean;
  toCategoryDetails: (id: string, title: string) => Record<string, unknown>;
  breadCrumbSections: any[];
  topCategoriesData: TopCategoriesData;
}
