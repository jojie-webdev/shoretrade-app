import { EntryCollection } from 'contentful';

export interface HelpAndSupportGeneratedProps {
  mainPage: any;
  handleCategoryClick: (categoryId: string, slug: string) => void;
  searchKeyword: string;
  handleSearchChange: (e: any) => void;
  topicEntries: EntryCollection<any> | undefined;
  handleTopicClick: (topicId: string, topicSlug: string) => void;
  handleClearSearchResults: () => void;
  handleEmailUsClick: () => void;
}
