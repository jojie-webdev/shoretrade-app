import React, { Fragment } from 'react';

import { documentToReactComponents as convert } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { v4 as uuid } from 'uuid';

const documentToReactComponents = (document: any) => {
  if (!document) {
    return null;
  }
  const options = {
    renderNode: {
      // eslint-disable-next-line react/display-name
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) =>
        convert(node?.data?.target?.fields?.description, options),
      // [BLOCKS.DOCUMENT]: (node: any) => convert(node, options),
      // eslint-disable-next-line react/display-name
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <p>
            {node.content.map((i: any, idx: number) => (
              <span key={idx}>{convert(i)}</span>
            ))}
          </p>
        );
      },
    },
  };
  const nodes = convert(document, options);

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
