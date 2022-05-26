import React, { useEffect } from 'react';

import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { useHistory, useParams } from 'react-router-dom';
import { getEntriesByContentType } from 'services/contentful';

const Resolver = (): JSX.Element => {
  const params = useParams<any>();
  const history = useHistory();

  useEffect(() => {
    const fetchEntries = async () => {
      const topics = await getEntriesByContentType('topic', {
        'fields.referenceTopicId.sys.id': params.topicId,
      });

      const topic = topics?.items.length > 0 ? topics?.items[0] : null;

      if (topic) {
        history.push(
          SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_TOPIC(topic?.fields?.slug),
          {
            topicId: topic?.sys.id,
          }
        );
      }
    };

    if (params && params.topicId) {
      fetchEntries();
    }
  }, [params]);

  return <></>;
};

export default Resolver;
