import React, { useState, useEffect } from 'react';

import { BUYER_ACCOUNT_ROUTES, SELLER_ACCOUNT_ROUTES } from 'consts';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getEntryById } from 'services/contentful';

import { PAGE_SIZE } from './Category.contants';
import CategoryView from './Category.view';

const Category = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const history = useHistory();
  const location = useLocation();

  const [category, setCategory] = useState<any>({});
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  let totalPages = 0;

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };

  const handleTopicClick = (topicId: string, topicSlug: string) => {
    const locationState: {
      categoryId?: string;
    } = location.state || {};
    history.push(
      SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_CATEGORY_TOPIC(slug, topicSlug),
      {
        topicId,
        categoryId: locationState.categoryId,
      }
    );
  };

  const handleSearchChange = (e: any) => {
    const searchKeywordInputted = e.currentTarget.value;
    setSearchKeyword(searchKeywordInputted);

    if (topics.length > 0) {
      const filteredTopics = topics.filter((topic: any) =>
        topic?.fields?.title
          ?.toLowerCase()
          .includes(searchKeywordInputted.toLowerCase())
      );
      setFilteredTopics(filteredTopics);
      totalPages = Math.ceil(filteredTopics.length / PAGE_SIZE);
    }
  };

  const totalTopics =
    parseInt(category?.fields?.topics?.length?.toString(), 10) || 0;
  totalPages = Math.ceil(totalTopics / PAGE_SIZE);

  useEffect(() => {
    const locationState: {
      categoryId?: string;
    } = location.state || {};
    const fetchData = async () => {
      const entry = await getEntryById(locationState.categoryId || '');
      setTopics(entry?.fields?.topics);
      setCategory(entry);
    };

    if (slug && locationState.categoryId) {
      fetchData();
    }
  }, [slug, location]);

  const generatedProps = {
    category,
    filteredTopics: filteredTopics.length > 0 ? filteredTopics : topics,
    page,
    handlePageChange,
    totalPages,
    handleTopicClick,
    searchKeyword,
    handleSearchChange,
  };

  return <CategoryView {...generatedProps} />;
};

export default Category;
