import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Search from 'components/module/Search';
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
          <Typography variant="caption" weight="bold">
            {toPrice(result.price.to)}
          </Typography>
          <Typography
            variant="caption"
            color="shade6"
            style={{ marginLeft: 1 }}
          >
            per
          </Typography>
          <Typography
            variant="caption"
            color="shade6"
            style={{ marginLeft: 4 }}
          >
            {formatMeasurementUnit(result.measurementUnit)}
          </Typography>
          <Typography weight="bold" variant="caption" style={{ marginLeft: 1 }}>
            {result.count}
          </Typography>
          <Typography
            variant="caption"
            color="shade6"
            style={{ marginLeft: 1 }}
          >
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
          <Search
            value={searchValue}
            onChange={onChangeSearchValue}
            resetValue={resetSearchValue}
            placeholder="Search for a Whole Fish"
          />
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
                    style={{ marginLeft: 10 }}
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
                        children={children(result)}
                        // value={r.name}
                        onClick={() => {}}
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
