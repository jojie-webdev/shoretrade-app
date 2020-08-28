import React from 'react';

import Spinner from 'components/base/Spinner/Spinner.view';
import { UpArrow, DropdownArrow } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import CategoryImage from 'components/module/CategoryImage/CategoryImage.view';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import numberToShortenAmount from 'utils/String/numberToShortenAmount';
import { useTheme } from 'utils/Theme';

import { CategoriesGeneratedProps } from './Categories.props';
import {
  Container,
  HeaderRow,
  SpinnerContainer,
  CategoryContainer,
} from './Categories.style';

const hasIncreased = (percentage: string) =>
  percentage ? parseFloat(percentage) > 0 : false;

const CategoriesView = ({ data, ...props }: CategoriesGeneratedProps) => {
  const theme = useTheme();

  return (
    <Container>
      <HeaderRow align="center" justify="between">
        <InnerRouteHeader title="Categories" fullRow={false} />
        <Typography variant="overline" color="shade6">
          {props.dateRange}
        </Typography>
      </HeaderRow>

      {props.isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <Row>
          {data.map((d, i) => (
            <Col md={12} key={i}>
              <Link to={props.toCategoryDetails(d.id, d.name)}>
                <CategoryContainer progress={d.percentageTotal}>
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
