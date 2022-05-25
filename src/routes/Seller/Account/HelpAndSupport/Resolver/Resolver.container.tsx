import React, { useState, useEffect } from 'react';

import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getEntriesByContentType } from 'services/contentful';

const Resolver = (): JSX.Element => {
  const location = useLocation();
  const params = useParams<any>();
  const history = useHistory();

  useEffect(() => {
    const fetchEntries = async () => {
      // getTopic
      const topics = await getEntriesByContentType('topic', {
        'fields.referenceTopicId.sys.id': params.topicId,
      });

      const topic = topics?.items.length > 0 ? topics?.items[0] : null;
      console.log(topic);
      if (topic) {
        history.push(
          SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_CATEGORY_TOPIC(
            topic?.fields?.referenceCategory?.fields?.slug,
            topic?.fields?.slug
          ),
          {
            topicId: topic?.sys.id,
            categoryId: topic?.fields?.referenceCategory?.sys.id,
          }
        );
      }
    };

    if (params && params.topicId) {
      console.log(params.topicId);
      fetchEntries();
    } else if (params && !params.topicId) {
      // redirect
      // history.push(SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT);
    }
  }, [params]);

  return <></>;
};

export default Resolver;
