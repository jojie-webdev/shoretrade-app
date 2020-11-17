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

import { FavouritesGeneratedProps } from './Favourites.props';
import { PreviewContainer, LoadingContainer } from './Favourites.style';

const FavouritesView = (props: FavouritesGeneratedProps) => {
  // const theme = useTheme();
  const { results, onChangeSearchValue, search, resetSearchValue } = props;

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
            {results.map((fav) => {
              return (
                <Link
                  key={fav.id}
                  to={`/buyer/product/${fav.id}`}
                  className="market-item"
                >
                  <PreviewCard
                    id={fav.id}
                    images={fav.images}
                    type={fav.type}
                    price={toPrice(fav.price)}
                    remaining={fav.remaining.toFixed(2)}
                    coop={fav.coop}
                    minimumOrder={fav.minimumOrder}
                    origin={fav.origin}
                    weight={sizeToString(
                      fav.size.unit,
                      fav.size.from,
                      fav.size.to
                    )}
                    isAquafuture={fav.isAquafuture}
                    unit={fav.measurementUnit}
                    state={fav.state}
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

export default FavouritesView;
