import React from 'react';

import PreviewCard from 'components/module/CategoryCards/Preview';
import { BUYER_ROUTES } from 'consts';
import { Row } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { FavouritesGeneratedProps } from './Favourites.props';
import { PreviewContainer } from './Favourites.style';

const FavouritesView = (props: FavouritesGeneratedProps) => {
  // const theme = useTheme();
  const {
    results,
    onChangeSearchValue,
    search,
    resetSearchValue,
    isPendingAccount,
  } = props;

  return (
    <PreviewContainer>
      {results.length > 0 ? (
        <>
          <Row nogutter className="cards" style={{ marginTop: 20 }}>
            {results.map((fav) => {
              return (
                <Link
                  key={fav.id}
                  to={BUYER_ROUTES.PRODUCT_DETAIL(fav.id)}
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

export default FavouritesView;
