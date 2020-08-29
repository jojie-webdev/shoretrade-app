export interface CategoriesGeneratedProps {
  dateRange: string;
  data: any[];
  isLoading: boolean;
  toCategoryDetails: (id: string, title: string) => Record<string, unknown>;
}
