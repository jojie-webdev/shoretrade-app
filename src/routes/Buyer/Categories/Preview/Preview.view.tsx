import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';

import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import Typography from 'components/base/Typography';
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
    isPendingAccount,
  } = props;

  useEffect(() => {
    selectAddress(typeId);
    onLoad(typeId);
  }, []);

  return (
    <PreviewContainer>
      <Row className="search-row">
        <Col md={12}>
          <SearchAddressView />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="subheader">
            <div className="result-count-container">
              <Typography variant="title5" weight="regular">
                Results
              </Typography>
              <Typography
                style={{ marginLeft: 10 }}
                variant="title5"
                weight="bold"
              >
                {results.length}
              </Typography>
            </div>
            <Visible xs sm>
              <FilterButton
                onClick={modalFilterProps.onClickClose}
                text="Filters"
                icon={<Filter />}
                textVariant="caption"
                textWeight="500"
              />
            </Visible>
          </div>
        </Col>
      </Row>

      <Row style={{ paddingLeft: 8 }}>
        <Hidden xs sm>
          <Col md={4} lg={4} xl={3}>
            <FilterArea
              filterData={filterData}
              onChangeFilter={onChangeFilter}
            />
          </Col>
        </Hidden>
        <Col xs={12} sm={12} md={8} lg={8} xl={9}>
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
                        hiddenVendor={isPendingAccount}
                        hiddenPrice={isPendingAccount}
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
