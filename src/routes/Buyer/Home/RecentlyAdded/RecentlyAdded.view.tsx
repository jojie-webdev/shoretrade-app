import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import PreviewCard from 'components/module/CategoryCards/Preview';
import EmptyState from 'components/module/EmptyState';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { RecentlyAddedGeneratedProps } from './RecentlyAdded.props';
import { PreviewContainer, LoadingContainer } from './RecentlyAdded.style';

const RecentlyAddedView = (props: RecentlyAddedGeneratedProps) => {
  // const theme = useTheme();
  const { results, isPendingAccount } = props;

  return (
    <PreviewContainer>
      <Row nogutter>
        <Col xs={12}>
          <SearchAddressView />
        </Col>
      </Row>
      {results.length > 0 ? (
        <>
          <Row nogutter className="cards" style={{ marginTop: 20 }}>
            {results.map((rec) => {
              return (
                <Link
                  key={rec.id}
                  to={`/buyer/product/${rec.id}`}
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
