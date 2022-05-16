import React, { useState, useEffect } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';
import { getEntryById } from 'services/contentful';

import { MAIN_PAGE_ID } from './HelpAndSupport.contants';
import HelpAndSupportView from './HelpAndSupport.view';

const HelpAndSupport = (): JSX.Element => {
  const [mainPage, setMainPage] = useState({});

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const entry = await getEntryById(MAIN_PAGE_ID);
      setMainPage(entry);
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    history.push(BUYER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_CATEGORY(categoryId));
  };

  const generatedProps = {
    mainPage,
    handleCategoryClick,
  };

  return <HelpAndSupportView {...generatedProps} />;
};

export default HelpAndSupport;
