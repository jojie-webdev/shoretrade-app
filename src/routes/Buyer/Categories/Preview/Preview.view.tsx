import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';

import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import { Typography } from 'components/module/CategoryCards/Landing/Card.style';
import PreviewCard from 'components/module/CategoryCards/Preview';
import FilterArea from 'components/module/FilterArea';
import FilterModal from 'components/module/FilterModal/FilterModal.view';
import SearchAddressView from 'components/module/SearchAddress';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col, Visible, Hidden } from 'react-grid-system';
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
    filterData,
    onChangeFilter,
    isLoadingResults,
  } = props;

  useEffect(() => {
    selectAddress(typeId);
    onLoad(typeId);
  }, []);

  return (
    <PreviewContainer>
      <Row className="search-row">
        <Col xs={10.5} sm={12}>
          <SearchAddressView />
        </Col>
        <Visible xs sm>
          <Col xs={1.5} className="filter-container">
            <FilterButton
              onClick={modalFilterProps.onClickClose}
              text="Filters"
              icon={<Filter />}
            />
          </Col>
        </Visible>
      </Row>

      <Row>
        <Hidden xs sm>
          <Col md={6} lg={6} xl={4}>
            <FilterArea
              filterData={filterData}
              onChangeFilter={onChangeFilter}
            />
          </Col>
        </Hidden>
        <Col xs={12} sm={12} md={6} lg={6} xl={8}>
          {!isLoadingResults && results && results.length > 0 && (
            <Row>
              {results.map((product) => {
                return (
                  <Col
                    xxl={4}
                    xl={6}
                    lg={12}
                    md={12}
                    sm={6}
                    xs={12}
                    key={product.id}
                    className="market-item"
                  >
                    <Link to={`/buyer/product/${product.id}`}>
                      <PreviewCard
                        key={product.id}
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
          )}
          {isLoadingResults && (
            <LoadingContainer>
              <Spinner width={24} height={24} />
            </LoadingContainer>
          )}
        </Col>
      </Row>

      <FilterModal {...modalFilterProps} />
    </PreviewContainer>
  );
};

export default CategoriesPreviewView;
