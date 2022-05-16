import React, { Fragment } from 'react';

import { documentToReactComponents as convert } from '@contentful/rich-text-react-renderer';
import { v4 as uuid } from 'uuid';

const documentToReactComponents = (document: any) => {
  if (!document) {
    return null;
  }

  const nodes = convert(document);

  if (nodes && Array.isArray(nodes)) {
    return nodes.map((component, index) => {
      if (index + 1 === nodes.length) {
        return component;
      }

      return <Fragment key={uuid()}>{component}</Fragment>;
    });
  }

  return nodes;
};

export default documentToReactComponents;
