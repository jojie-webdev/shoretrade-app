import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import PreviewCard from 'components/module/CategoryCards/Preview';
import FilterModal from 'components/module/FilterModal/FilterModal.view';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { CategoriesPreviewGeneratedProps } from './Preview.props';
import {
  PreviewContainer,
  LoadingContainer,
  FilterButton,
} from './Preview.style';

const CategoriesPreviewView = (props: CategoriesPreviewGeneratedProps) => {
  // const theme = useTheme();
  const {
    results,
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    onLoad,
    typeId,
    addresses,
    selectedAddress,
    selectAddress,
    modalFilterProps,
  } = props;

  useEffect(() => {
    selectAddress(typeId);
    onLoad(typeId);
  }, []);

  // if (results.length <= 0) {
  //   return (
  //     <LoadingContainer>
  //       <Spinner width={24} height={24} />
  //     </LoadingContainer>
  //   );
  // }

  return (
    <PreviewContainer>
      <Row className="search-row">
        <Col xs={10.5}>
          <Search
            value={searchValue}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search for an Atlantic Salmon"
          />
        </Col>
        <Col xs={1.5}>
          <FilterButton onClick={modalFilterProps.onClickClose}>
            Filters <Filter></Filter>
          </FilterButton>
        </Col>
      </Row>
      {results.length > 0 ? (
        <>
          <Row className="cards" style={{ marginTop: 20 }}>
            {results.map((product) => {
              return (
                <Col sm={3} key={product.id}>
                  <Link
                    to={`/buyer/product/${product.id}`}
                    className="market-item"
                  >
                    <PreviewCard
                      id={product.id}
                      images={product.images}
                      type={product.type}
                      price={toPrice(product.price)}
                      remaining={product.remaining.toFixed(2)}
                      coop={product.coop}
                      minimumOrder={product.minimumOrder}
                      origin={product.origin}
                      weight={sizeToString(
                        product.size.unit,
                        product.size.from,
                        product.size.to
                      )}
                      isAquafuture={product.isAquafuture}
                      unit={product.measurementUnit}
                      state={product.state}
                    />
                  </Link>
                </Col>
              );
            })}
          </Row>
          <FilterModal {...modalFilterProps} />
        </>
      ) : (
        <LoadingContainer>
          <Spinner width={24} height={24} />
        </LoadingContainer>
      )}
    </PreviewContainer>
  );
};

export default CategoriesPreviewView;
