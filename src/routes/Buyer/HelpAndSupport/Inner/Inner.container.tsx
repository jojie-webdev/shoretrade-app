import React, { useEffect, useMemo, useState } from 'react';

import { BUYER_ACCOUNT_ROUTES, BUYER_ROUTES } from 'consts';
import { useLocation, useParams } from 'react-router-dom';
import { getEntryById } from 'services/contentful';
import documentToReactComponents from 'utils/Contentful/converter';

import { SHORETRADE_EMAIL } from '../HelpAndSupport.constants';
import InnerView from './Inner.view';

const Inner = (): JSX.Element => {
  const { slug, topicSlug } = useParams<{
    slug: string;
    topicSlug: string;
  }>();
  const location = useLocation();
  const [topic, setTopic] = useState<any>({});
  const [category, setCategory] = useState<any>({});
  const [content, setContent] = useState<any>({});

  const userRoute = BUYER_ROUTES.HELP_AND_SUPPORT_CATEGORY_TOPIC_RESOLVER;

  const locationState: {
    categoryId?: string;
    topicId?: string;
  } = location.state || {};

  const convertedElements = useMemo(() => {
    if (content?.fields) {
      const rawElements = content?.fields?.html;
      return rawElements
        ? documentToReactComponents(rawElements, {
            userRoute,
            slug,
            topicSlug,
            topicId: locationState.topicId,
            categoryId: locationState.categoryId,
          })
        : undefined;
    }
    return null;
  }, [content]);

  useEffect(() => {
    const locationState: {
      categoryId?: string;
      topicId?: string;
    } = location.state || {};
    const fetchData = async () => {
      const categoryEntry = await getEntryById(locationState.categoryId || '');
      if (categoryEntry) {
        setCategory(categoryEntry);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug, location]);

  useEffect(() => {
    const locationState: {
      categoryId?: string;
      topicId?: string;
    } = location.state || {};
    const fetchData = async () => {
      const topicEntry = await getEntryById(locationState.topicId || '');
      setTopic(topicEntry);
    };
    if (topicSlug && locationState.topicId) {
      fetchData();
    }
  }, [topicSlug, location]);

  useEffect(() => {
    const fetchData = async () => {
      const contentEntry = await getEntryById(
        topic?.fields?.referenceTopicId?.sys?.id || ''
      );
      setContent(contentEntry);
    };
    if (topic.fields) {
      fetchData();
    }
  }, [topic]);

  useEffect(() => {
    const fetchData = async () => {
      const contentEntry = await getEntryById(
        topic?.fields?.referenceTopicId?.sys?.id || ''
      );
      setContent(contentEntry);
    };
    if (topic.fields) {
      fetchData();
    }
  }, [topic]);

  const handleEmailUsClick = () => {
    window.open(`mailto:${SHORETRADE_EMAIL}`);
  };

  const buildBreadCrumbsPath = () => {
    const path = [
      {
        label: 'Account',
        link: BUYER_ROUTES.ACCOUNT,
      },
      {
        label: 'Help & Support',
        link: BUYER_ROUTES.HELP_AND_SUPPORT,
      },
      {
        label: category?.fields?.title,
        link: BUYER_ROUTES.HELP_AND_SUPPORT_CATEGORY(slug),
        state: { categoryId: category?.sys?.id },
      },
      {
        label: topic?.fields?.title,
      },
    ];

    if (!slug) {
      path.splice(2, 1);
    }

    return path;
  };

  const generatedProps = {
    topic,
    category,
    convertedElements,
    categoryId: locationState.categoryId || '',
    categorySlug: slug,
    breadCrumbsPath: buildBreadCrumbsPath(),
    handleEmailUsClick,
  };

  return <InnerView {...generatedProps} />;
};

export default Inner;
