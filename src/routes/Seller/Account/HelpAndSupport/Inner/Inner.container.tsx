import { SELLER_ACCOUNT_ROUTES } from 'consts';
import React, { useEffect, useMemo, useState } from 'react';

import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getEntryById } from 'services/contentful';
import documentToReactComponents from 'utils/Contentful/converter';

import InnerView from './Inner.view';

const Inner = (): JSX.Element => {
  const { slug, topicSlug } = useParams<{
    slug: string;
    topicSlug: string;
  }>();
  const location = useLocation();
  const history = useHistory();
  const [topic, setTopic] = useState<any>({});
  const [category, setCategory] = useState({});
  const [content, setContent] = useState<any>({});

  const locationState: {
    categoryId?: string;
    topicId?: string;
  } = location.state || {};

  const convertedElements = useMemo(() => {
    if (content?.fields) {
      const rawElements = content?.fields?.html;
      return rawElements
        ? documentToReactComponents(rawElements, {
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
    const locationState: {
      categoryId?: string;
      topicId?: string;
    } = location.state || {};
    if (!locationState.categoryId || !locationState.topicId) {
      // go back to main categories page
      history.replace(SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT);
    }
  }, [location]);

  const generatedProps = {
    topic,
    category,
    convertedElements,
    categoryId: locationState.categoryId || '',
    categorySlug: slug,
  };

  return <InnerView {...generatedProps} />;
};

export default Inner;
