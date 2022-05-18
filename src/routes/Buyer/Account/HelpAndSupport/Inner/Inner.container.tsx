import React, { useEffect, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import { getEntryById } from 'services/contentful';
import documentToReactComponents from 'utils/Contentful/converter';

import InnerView from './Inner.view';

const Inner = (): JSX.Element => {
  const { slug, topicSlug } = useParams<{
    slug: string;
    topicSlug: string;
  }>();
  const location = useLocation();
  const [topic, setTopic] = useState<any>({});
  const [category, setCategory] = useState({});
  const rawElements = topic?.fields?.referenceTopicId?.fields?.html;
  const convertedElements = rawElements
    ? documentToReactComponents(rawElements)
    : undefined;

  const locationState: {
    categoryId?: string;
    topicId?: string;
  } = location.state || {};

  useEffect(() => {
    const locationState: {
      categoryId?: string;
      topicId?: string;
    } = location.state || {};
    const fetchData = async () => {
      const categoryEntry = await getEntryById(locationState.categoryId || '');
      setCategory(categoryEntry);
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
