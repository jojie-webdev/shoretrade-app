import React, { useState, useEffect } from 'react';

import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getEntryById } from 'services/contentful';

import { MAIN_PAGE_ID } from './HelpAndSupport.contants';
import HelpAndSupportView from './HelpAndSupport.view';

const HelpAndSupport = (): JSX.Element => {
  const [mainPage, setMainPage] = useState({});

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const entry = await getEntryById(MAIN_PAGE_ID);
      if (entry) {
        setMainPage(entry);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId: string, slug: string) => {
    history.replace(SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_CATEGORY(slug), {
      categoryId,
    });
  };

  const generatedProps = {
    mainPage,
    handleCategoryClick,
  };

  return <HelpAndSupportView {...generatedProps} />;
};

export default HelpAndSupport;
