export interface CategoryGeneratedProps {
  category: any;
  filteredTopics: any;
  page: number;
  handlePageChange: (currentPage: number) => void;
  totalPages: number;
  handleTopicClick: (topicId: string, topicSlug: string) => void;
  searchKeyword: string;
  handleSearchChange: (e: any) => void;
}
