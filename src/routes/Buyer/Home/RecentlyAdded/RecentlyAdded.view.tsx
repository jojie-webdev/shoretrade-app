import React from 'react';

import PreviewCard from 'components/module/CategoryCards/Preview';
import { BUYER_ROUTES } from 'consts';
import { Row } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { RecentlyAddedGeneratedProps } from './RecentlyAdded.props';
import { PreviewContainer } from './RecentlyAdded.style';

const RecentlyAddedView = (props: RecentlyAddedGeneratedProps) => {
  const { results, isPendingAccount } = props;

  return (
    <PreviewContainer>
      {results.length > 0 ? (
        <>
          <Row nogutter className="cards" style={{ marginTop: 20 }}>
            {results.map((rec) => {
              return (
                <Link
                  key={rec.id}
                  to={BUYER_ROUTES.PRODUCT_DETAIL(rec.id)}
                  className="market-item"
                >
                  <PreviewCard
                    id={rec.id}
                    images={rec.images}
                    type={rec.type}
                    price={toPrice(rec.price)}
                    remaining={rec.remaining.toFixed(2)}
                    coop={rec.coop}
                    minimumOrder={rec.minimumOrder}
                    origin={rec.origin}
                    weight={sizeToString(
                      rec.size.unit,
                      rec.size.from,
                      rec.size.to
                    )}
                    isAquafuture={rec.isAquafuture}
                    unit={rec.measurementUnit}
                    state={rec.state}
                    hiddenPrice={isPendingAccount}
                    hiddenVendor={isPendingAccount}
                  />
                </Link>
              );
            })}
          </Row>
        </>
      ) : null}
    </PreviewContainer>
  );
};

export default RecentlyAddedView;
