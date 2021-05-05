import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Search from 'components/module/Search';
import SearchAddressView from 'components/module/SearchAddress';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { GetListingTypesByCategoryTypeItem } from 'types/store/GetListingTypesByCategoryState';
import {
  formatMeasurementUnit,
  formatUnitToPricePerUnit,
} from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import { toPrice } from 'utils/String/toPrice';

import { CategoriesSearchGeneratedProps } from './Search.props';
import {
  SearchContainer,
  LoadingContainer,
  Image,
  DetailsContainer,
  ResultContainer,
} from './Search.style';

const CategoriesSearchView = (props: CategoriesSearchGeneratedProps) => {
  const { results, loading, isSuccess, isPendingAccount } = props;

  const InteractionsChildren = (result: GetListingTypesByCategoryTypeItem) => (
    <>
      <Image src={parseImageUrl(result.thumbnail)} />
      <DetailsContainer>
        <Typography className="title">{result.name}</Typography>
        <ResultContainer>
          {!isPendingAccount && (
            <>
              {result.price.from != result.price.to ? (
                <Typography variant="caption" weight="bold">
                  {toPrice(result.price.from)} - {toPrice(result.price.to)}
                </Typography>
              ) : (
                <Typography variant="caption" weight="bold">
                  {toPrice(result.price.from)}
                </Typography>
              )}
              <Typography variant="caption" color="shade6" className="per">
                per
              </Typography>
              <Typography variant="caption" color="shade6" className="measure">
                {formatUnitToPricePerUnit(
                  formatMeasurementUnit(result.measurementUnit)
                )}
              </Typography>
            </>
          )}
          <Typography weight="bold" variant="caption" className="result-count">
            {result.count}
          </Typography>
          <Typography variant="caption" color="shade6" className="per">
            item
          </Typography>
        </ResultContainer>
      </DetailsContainer>
    </>
  );

  return (
    <SearchContainer>
      <Row className="search-row">
        <Col xs={12}>
          <SearchAddressView />
        </Col>
      </Row>
      {loading && (
        <LoadingContainer>
          <Spinner width={24} height={24} />
        </LoadingContainer>
      )}
      {isSuccess && (
        <>
          <ResultContainer style={{ paddingLeft: 15 }}>
            <Row>
              <Typography variant="title5" weight="regular">
                Results
              </Typography>
              <Typography
                className="result-length"
                variant="title5"
                weight="bold"
              >
                {results.length}
              </Typography>
            </Row>
          </ResultContainer>
          <Row className="items-row">
            <Col xs={12}>
              {results.map((result) => (
                <Link
                  to={{
                    pathname: `/buyer/categories/products/${result.id}`,
                    state: {
                      title: result.name,
                    },
                  }}
                  className="market-item"
                  key={result.id}
                >
                  <Interactions>
                    <InteractionsChildren {...result} />
                  </Interactions>
                </Link>
              ))}
            </Col>
          </Row>
        </>
      )}
    </SearchContainer>
  );
};

export default CategoriesSearchView;
