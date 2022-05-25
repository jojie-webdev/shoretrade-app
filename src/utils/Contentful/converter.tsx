import React, { Fragment } from 'react';

import { documentToReactComponents as convert } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Link } from 'react-router-dom';
import { getEntryById } from 'services/contentful';
import { v4 as uuid } from 'uuid';
import { FlexContainer } from 'routes/Buyer/Listings/Listings.styles';

const documentToReactComponents = (
  document: any,
  data?: {
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
        return (
          <>
            <Link
              to={{
                pathname: SELLER_ACCOUNT_ROUTES.HELP_AND_SUPPORT_CATEGORY_TOPIC(
                  data?.slug,
                  data?.topicSlug
                ),
                state: { categoryId: data?.categoryId, topicId: data?.topicId },
              }}
            >
              {data?.topicSlug}
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
          console.log(node?.data?.target?.fields?.image);
          if (node?.data?.target?.fields?.videoLink) {
            return (
              <>
                <iframe
                  width="560"
                  height="315"
                  src={node?.data?.target?.fields?.videoLink}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </>
            );
          }

          if (node?.data?.target?.fields?.image?.fields?.file?.url) {
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 24,
                  width: '100%',
                }}
              >
                <img
                  style={{ width: '100%', maxWidth: '671px' }}
                  src={node?.data?.target?.fields?.image?.fields?.file?.url}
                ></img>
              </div>
            );
          }
        }
        return <>{convert(node?.data?.target?.fields?.description, options)}</>;
      },
      // eslint-disable-next-line react/display-name
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <p>
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
