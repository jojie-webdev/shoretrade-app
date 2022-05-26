import React, { Fragment } from 'react';

import { documentToReactComponents as convert } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const documentToReactComponents = (
  document: any,
  data?: {
    userRoute?: (topicId?: string) => string;
    slug?: string;
    categoryId?: string;
    topicSlug?: string;
    topicId?: string;
  }
) => {
  if (!document) {
    return null;
  }

  const inlineOptions = {
    renderNode: {
      // eslint-disable-next-line react/display-name
      [INLINES.ENTRY_HYPERLINK]: (node: any) => {
        const value = node?.content[0]?.value;
        const entryId = node?.data?.target?.sys?.id;
        return (
          <>
            <Link
              className="entry-link"
              to={{
                pathname: data?.userRoute && data?.userRoute(entryId),
              }}
            >
              {value}
            </Link>
          </>
        );
      },
    },
  };

  const options = {
    renderNode: {
      // eslint-disable-next-line react/display-name
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        if (node?.data?.target?.fields?.image) {
          return (
            <div className="media-container">
              {node?.data?.target?.fields?.videoLink ? (
                <iframe
                  className="video-iframe"
                  src={node?.data?.target?.fields?.videoLink}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  style={{ width: '100%', maxWidth: '671px' }}
                  src={node?.data?.target?.fields?.image?.fields?.file?.url}
                ></img>
              )}
            </div>
          );
        }
        return <>{convert(node?.data?.target?.fields?.description, options)}</>;
      },
      // eslint-disable-next-line react/display-name
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <p className="inner_paragraph">
            {node.content.map((i: any, idx: number) => (
              <span key={idx}>{convert(i, inlineOptions)}</span>
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
