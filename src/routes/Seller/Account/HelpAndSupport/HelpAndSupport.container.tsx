import React, { useState, useEffect } from 'react';

import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { EntryCollection } from 'contentful';
import { useHistory } from 'react-router-dom';
import { getEntryById, searchTopicsByKeyword } from 'services/contentful';
import useDebounce from 'utils/Hooks/useDebounce';
import { useTheme } from 'utils/Theme';

import { MAIN_PAGE_ID, SHORETRADE_EMAIL } from './HelpAndSupport.constants';
import HelpAndSupportView from './HelpAndSupport.view';

const HelpAndSupport = (): JSX.Element => {
  const [mainPage, setMainPage] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');
  const [topicEntries, setTopicEntries] = useState<EntryCollection<any>>();

  const history = useHistory();
  const theme = useTheme();

  const fetchSearchTopicsByKeyword = async () => {
    const newTopicEntries = await searchTopicsByKeyword(
      searchKeyword,
      theme.appType
    );

    setTopicEntries(newTopicEntries);
  };

  useEffect(() => {
    const fetchData = async () => {
      const entry = await getEntryById(MAIN_PAGE_ID);
      if (entry) {
        setMainPage(entry);
      }
    };

    fetchData();
  }, []);

  useDebounce(
    () => {
      if (searchKeyword) {
        setTopicEntries(undefined);
        fetchSearchTopicsByKeyword();
      }
    },
    500,
    [searchKeyword]
  );

  const handleEmailUsClick = () => {
    window.open(`mailto:${SHORETRADE_EMAIL}`);
  };

  const handleClearSearchResults = () => {
    setSearchKeyword('');
    setTopicEntries(undefined);
  };

  const handleSearchChange = (e: any) => {
    setSearchKeyword(e?.currentTarget?.value || '');
  };

  const handleCategoryClick = (categoryId: string, slug: string) => {
    history.replace(SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_CATEGORY(slug), {
      categoryId,
    });
  };

  const handleTopicClick = (topicId: string, topicSlug: string) => {
    history.push(SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_TOPIC(topicSlug), {
      topicId,
    });
  };

  const generatedProps = {
    mainPage,
    handleCategoryClick,
    searchKeyword,
    handleSearchChange,
    topicEntries,
    handleTopicClick,
    handleClearSearchResults,
    handleEmailUsClick,
  };

  return <HelpAndSupportView {...generatedProps} />;
};

export default HelpAndSupport;
