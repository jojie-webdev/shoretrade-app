import React, { useState, useEffect } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
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
  const [searching, setSearching] = useState(false);

  const history = useHistory();
  const theme = useTheme();

  const fetchSearchTopicsByKeyword = async () => {
    const newTopicEntries = await searchTopicsByKeyword(
      searchKeyword,
      theme.appType
    );

    setTopicEntries(newTopicEntries);
    setSearching(false);
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

  useEffect(() => {
    if (searchKeyword) {
      setSearching(true);
    }
  }, [searchKeyword]);

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
    history.push(BUYER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_CATEGORY(slug), {
      categoryId,
    });
  };

  const handleTopicClick = (topicId: string, topicSlug: string) => {
    history.push(BUYER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_TOPIC(topicSlug), {
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
    searching,
  };

  return <HelpAndSupportView {...generatedProps} />;
};

export default HelpAndSupport;
