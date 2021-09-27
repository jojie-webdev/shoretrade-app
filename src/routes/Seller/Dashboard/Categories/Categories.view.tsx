import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import { UpArrow, DropdownArrow } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import CategoryImage from 'components/module/CategoryImage/CategoryImage.view';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import numberToShortenAmount from 'utils/String/numberToShortenAmount';
import { useTheme } from 'utils/Theme';

import { includeTopCategoriesPercentChange } from '../Landing/Landing.transforms';
import { CategoriesGeneratedProps } from './Categories.props';
import { Container, HeaderRow, CategoryContainer } from './Categories.style';

const hasIncreased = (percentage: string) =>
  percentage ? parseFloat(percentage) > 0 : false;

const CategoriesView = ({
  topCategoriesData,
  ...props
}: CategoriesGeneratedProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const topCategoriesPercentage = includeTopCategoriesPercentChange(
    topCategoriesData
  );

  const total = topCategoriesPercentage.reduce((accum: number, current) => {
    return accum + current.total;
  }, 0);

  return (
    <Container>
      <HeaderRow align="center" justify="between">
        {isSmallScreen ? (
          <>
            <InnerRouteHeader title="Categories" fullRow={false} />
            <Typography variant="overline" color="shade6" className="text">
              {props.dateRange}
            </Typography>
          </>
        ) : (
          <div className="padding-bread">
            <Breadcrumbs sections={props.breadCrumbSections} />
          </div>
        )}
      </HeaderRow>

      {props.isLoading ? (
        <Loading />
      ) : (
        <Row>
          {topCategoriesPercentage.map((d, i) => (
            <Col md={12} key={i}>
              <Link to={props.toCategoryDetails(d.id, d.name)}>
                <CategoryContainer progress={(d.total / total) * 100}>
                  <div className="top">
                    <div className="text-container">
                      <Typography
                        variant="overline"
                        color="shade6"
                        className="overline"
                      >
                        {d.name}
                      </Typography>
                      <div className="price-container">
                        <Typography variant="title5" color="noshade">
                          {numberToShortenAmount(d.total)}
                        </Typography>

                        <div className="svg-container">
                          {hasIncreased(d.percentageChange) ? (
                            <UpArrow height={8} width={8} />
                          ) : (
                            <DropdownArrow
                              height={8}
                              width={8}
                              fill={theme.brand.error}
                            />
                          )}
                        </div>

                        <Typography
                          variant="caption"
                          color={
                            hasIncreased(d.percentageChange)
                              ? 'success'
                              : 'error'
                          }
                        >
                          {hasIncreased(d.percentageChange) ? '+' : '-'}
                          {d.percentageChange}%
                        </Typography>
                      </div>
                    </div>

                    <div className="image">
                      <CategoryImage id={d.id} maxHeight={40} />
                    </div>
                  </div>

                  <div className="bottom">
                    <div className="progress-bar" />
                  </div>
                </CategoryContainer>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoriesView;
