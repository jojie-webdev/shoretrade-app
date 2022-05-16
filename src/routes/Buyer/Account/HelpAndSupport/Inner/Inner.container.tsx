import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { getEntryById } from 'services/contentful';
import documentToReactComponents from 'utils/Contentful/converter';

import InnerView from './Inner.view';

const Inner = (): JSX.Element => {
  const { categoryId, topicId } = useParams<{
    categoryId: string;
    topicId: string;
  }>();
  const [topic, setTopic] = useState<any>({});
  const [category, setCategory] = useState({});

  const rawElements = topic?.fields?.referenceTopicId?.fields?.html;
  const convertedElements = rawElements
    ? documentToReactComponents(rawElements)
    : undefined;

  useEffect(() => {
    const fetchData = async () => {
      const categoryEntry = await getEntryById(categoryId);
      setCategory(categoryEntry);
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      const topicEntry = await getEntryById(topicId);
      setTopic(topicEntry);
    };

    if (topicId) {
      fetchData();
    }
  }, [topicId]);

  const generatedProps = { topic, category, convertedElements, categoryId };

  return <InnerView {...generatedProps} />;
};

export default Inner;
