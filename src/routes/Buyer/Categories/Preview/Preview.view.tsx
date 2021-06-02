import React, { useEffect } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import PreviewCard from 'components/module/CategoryCards/Preview';
import { PreviewDetail } from 'components/module/CategoryCards/Preview/Preview.view';
import FilterArea from 'components/module/FilterArea';
import FilterModal from 'components/module/FilterModal/FilterModal.view';
import Search from 'components/module/Search/Search.view';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'react-router-dom';
import anchorImg from 'res/images/anchor.svg';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import { CategoriesPreviewGeneratedProps } from './Preview.props';
import {
  PreviewContainer,
  LoadingContainer,
  FilterButton,
  EmptyResults,
  StyledInteraction,
} from './Preview.style';

const CategoriesPreviewView = (props: CategoriesPreviewGeneratedProps) => {
  const {
    results,
    searchValue,
    onChangeSearchValue,
    onResetSearchValue,
    onLoad,
    typeId,
    selectAddress,
    modalFilterProps,
    isLoadingResults,
    isPendingAccount,

    //filterData
    //onChangeFilter,
  } = props;

  const location = useLocation();
  const locationState: {
    title?: string;
  } = location.state || {};
  const isSearch = location.pathname.includes(BUYER_ROUTES.SEARCH);
  const title = locationState?.title || 'Category';
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  useEffect(() => {
    selectAddress(typeId);
    onLoad(typeId);
  }, []);

  return (
    <BoxContainer>
      <PreviewContainer>
        <div className="header">
          {!isSmallScreen ? (
            <Breadcrumbs
              sections={
                isSearch
                  ? [
                      { label: 'Search', link: BUYER_ROUTES.SEARCH },
                      { label: title },
                    ]
                  : [
                      { label: 'Categories', link: BUYER_ROUTES.CATEGORIES },
                      { label: title },
                    ]
              }
            />
          ) : (
            <div className="left-header">
              <Typography variant="title4" weight="500">
                {title}
              </Typography>
              <FilterButton onClick={modalFilterProps.onClickClose}>
                <Typography variant="overline" className="btn-text">
                  Filters
                </Typography>
                <Filter />
              </FilterButton>
            </div>
          )}

          <div className="right-header">
            {!isSmallScreen && (
              <FilterButton onClick={modalFilterProps.onClickClose}>
                <Typography variant="overline" className="btn-text">
                  Filters
                </Typography>
                <Filter />
              </FilterButton>
            )}

            <Search
              className="search"
              placeholder={`Search for vendor`}
              value={searchValue}
              onChange={onChangeSearchValue}
              resetValue={onResetSearchValue}
              rounded
            />
          </div>
        </div>

        {isLoadingResults && (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        )}

        {!isLoadingResults && results && results.length === 0 && (
          <EmptyResults>
            <div>
              <Typography variant="title5" weight="700">
                No search results for &quot;{searchValue}&quot;
              </Typography>
              <Typography variant="label" weight="400" color="shade7">
                It seems we can’t find any results based on your search.
              </Typography>
            </div>

            <img src={anchorImg} />
          </EmptyResults>
        )}

        {!isLoadingResults && results && results.length > 0 && (
          <Row>
            {results.map((product) => {
              return (
                <Col
                  key={product.id}
                  xxl={3}
                  xl={4}
                  lg={6}
                  md={12}
                  sm={6}
                  xs={12}
                  className="preview-col"
                >
                  <Link to={BUYER_ROUTES.PRODUCT_DETAIL(product.id)}>
                    <StyledInteraction>
                      <PreviewDetail
                        alternate
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
                    </StyledInteraction>
                  </Link>
                </Col>
              );
            })}
          </Row>
        )}

        <FilterModal {...modalFilterProps} />
      </PreviewContainer>
    </BoxContainer>
  );
};

export default CategoriesPreviewView;
