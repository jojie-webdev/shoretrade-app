import React from 'react';

import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography/Typography.view';
import Card from 'components/module/CategoryCards/Landing';
import CategoryImageView from 'components/module/CategoryImage/CategoryImage.view';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search/Search.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { CategoriesLandingGeneratedProps } from './Landing.props';
import { CategoriesContainer, Image } from './Landing.style';

const CategoriesLandingView = (props: CategoriesLandingGeneratedProps) => {
  const history = useHistory();
  const {
    categories,
    currentPath,
    search,
    onChangeSearchValue,
    onResetSearchValue,
  } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <CategoriesContainer>
      {isSmallScreen && (
        <>
          <MobileHeader>Buyer - Categories</MobileHeader>
          <Row nogutter>
            <Col xs={12}>
              <Search
                placeholder="Search for a category"
                value={search}
                onChange={onChangeSearchValue}
                resetValue={onResetSearchValue}
                rounded
              />
            </Col>
          </Row>
        </>
      )}
      {categories.length <= 0 ? (
        <>{!isSmallScreen && <Loading />}</>
      ) : (
        <>
          {!isSmallScreen ? (
            <>
              <Row nogutter>
                <Col />
                <Col xs="content">
                  <Search
                    placeholder="Search for a category"
                    value={search}
                    onChange={onChangeSearchValue}
                    resetValue={onResetSearchValue}
                    rounded
                    className="search"
                  />
                </Col>
              </Row>
              <div className="cards">
                {categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <Link
                        key={category.id}
                        to={{
                          pathname: `${currentPath}/${category.id}`,
                          state: { title: category.name },
                        }}
                      >
                        <Card
                          sortIndex={category.sortIndex}
                          id={category.id}
                          image={category.thumbnail}
                          label={category.name}
                        />
                      </Link>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <Interactions
                      key={category.id}
                      padding="8px 16px 8px 8px"
                      onClick={() => {
                        history.push(`${currentPath}/${category.id}`, {
                          title: category.name,
                        });
                      }}
                      leftComponent={
                        <>
                          <Image>
                            <CategoryImageView
                              id={category.id}
                              maxHeight={56}
                              containerHeight={72}
                              cBorderRadius={'8px'}
                              customSVGSize={1}
                              circled
                              circleSize={64}
                            />
                          </Image>
                          <Typography variant="label" color="shade9">
                            {category.name}
                          </Typography>
                        </>
                      }
                    />
                  );
                })}
            </>
          )}
        </>
      )}
    </CategoriesContainer>
  );
};

export default CategoriesLandingView;
