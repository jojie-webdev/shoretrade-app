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
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { CategoriesSearchGeneratedProps } from './Search.props';
import {
  SearchContainer,
  LoadingContainer,
  Image,
  DetailsContainer,
  FilterButton,
  ResultContainer,
} from './Search.style';

const CategoriesSearchView = (props: CategoriesSearchGeneratedProps) => {
  const {
    results,
    searchValue,
    onChangeSearchValue,
    resetSearchValue,
    onLoad,
    categoryId,
    addresses,
    selectedAddress,
    selectAddress,
  } = props;

  useEffect(() => {
    selectAddress(categoryId);
    onLoad(categoryId);
  }, []);

  const children = (result: GetListingTypesByCategoryTypeItem) => (
    <>
      <Image src={result.thumbnail} />
      <DetailsContainer>
        <Typography className="title">{result.name}</Typography>
        <ResultContainer>
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
            {formatMeasurementUnit(result.measurementUnit)}
          </Typography>
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

  // if (results.length <= 0) {
  //   return (
  //     <LoadingContainer>
  //       <Spinner width={24} height={24} />
  //     </LoadingContainer>
  //   );
  // }
  return (
    <SearchContainer>
      <Row className="search-row">
        <Col xs={12}>
          <SearchAddressView />
        </Col>
      </Row>
      {results.length <= 0 ? (
        <LoadingContainer>
          <Spinner width={24} height={24} />
        </LoadingContainer>
      ) : (
        <>
          {results.length > 0 ? (
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
                {/* <Col xs={2}>
                  <FilterButton>
                    Filters <Filter></Filter>
                  </FilterButton>
                </Col> */}
              </ResultContainer>

              <Row className="items-row">
                <Col xs={12}>
                  {results.map((result) => (
                    <Link
                      to={`/buyer/categories/products/${result.id}`}
                      className="market-item"
                      key={result.id}
                    >
                      <Interactions
                        // eslint-disable-next-line react/no-children-prop
                        children={children(result)}
                        isHover
                        // value={r.name}
                      />
                    </Link>
                  ))}
                </Col>
              </Row>
            </>
          ) : null}
        </>
      )}
    </SearchContainer>
  );
};

export default CategoriesSearchView;
