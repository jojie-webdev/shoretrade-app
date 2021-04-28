import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'react-router-dom';
import { GetListingTypesByCategoryTypeItem } from 'types/store/GetListingTypesByCategoryState';
import {
  formatMeasurementUnit,
  formatUnitToPricePerUnit,
} from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { CategoriesSearchGeneratedProps } from './Search.props';
import {
  SearchContainer,
  LoadingContainer,
  Image,
  ResultContainer,
} from './Search.style';

const InteractionsChildren = (
  result: GetListingTypesByCategoryTypeItem & { isPendingAccount: boolean }
) => {
  const { isPendingAccount } = result;

  return (
    <>
      <Image src={result.thumbnail} />
      <div>
        <Typography weight="bold">{result.name}</Typography>
        <ResultContainer>
          {!isPendingAccount && (
            <>
              <Typography variant="caption" color="shade6" weight="400">
                Price per
              </Typography>
              <Typography
                className="measure"
                variant="caption"
                color="shade6"
                weight="400"
              >
                {formatUnitToPricePerUnit(
                  formatMeasurementUnit(result.measurementUnit)
                )}
              </Typography>
              {result.price.from != result.price.to ? (
                <Typography variant="caption" weight="500" color="shade8">
                  {toPrice(result.price.from)} - {toPrice(result.price.to)}
                </Typography>
              ) : (
                <Typography variant="caption" weight="500" color="shade8">
                  {toPrice(result.price.from)}
                </Typography>
              )}
            </>
          )}
          <Typography
            className="per"
            variant="caption"
            color="shade6"
            weight="400"
          >
            Units
          </Typography>
          <Typography variant="caption" color="shade8" weight="400">
            {result.count}
          </Typography>
        </ResultContainer>
      </div>
    </>
  );
};

const CategoriesSearchView = (props: CategoriesSearchGeneratedProps) => {
  const {
    results,
    loading,
    isPendingAccount,
    search,
    onChangeSearchValue,
  } = props;
  const location = useLocation();
  const locationState: {
    title?: string;
  } = location.state || {};
  const title = locationState?.title || 'Category';
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <BoxContainer>
      <SearchContainer>
        <div className="header">
          {!isSmallScreen ? (
            <Breadcrumbs
              sections={[
                { label: 'Categories', link: BUYER_ROUTES.CATEGORIES },
                { label: title },
              ]}
            />
          ) : (
            <Typography variant="title4" weight="500" className="header-title">
              {title}
            </Typography>
          )}

          <Search
            className="search"
            placeholder={`Search for a ${title}`}
            value={search}
            onChange={onChangeSearchValue}
            rounded
          />
        </div>

        {loading ? (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        ) : (
          <Row>
            <Col xs={12}>
              {results.map((result) => (
                <Link
                  to={{
                    pathname: BUYER_ROUTES.PRODUCT_PREVIEW(result.id),
                    state: {
                      title: result.name,
                    },
                  }}
                  className="market-item"
                  key={result.id}
                >
                  <Interactions>
                    <InteractionsChildren
                      {...result}
                      isPendingAccount={isPendingAccount}
                    />
                  </Interactions>
                </Link>
              ))}
            </Col>
          </Row>
        )}
      </SearchContainer>
    </BoxContainer>
  );
};

export default CategoriesSearchView;
