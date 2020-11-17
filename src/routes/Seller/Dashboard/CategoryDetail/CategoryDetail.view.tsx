import React from 'react';

import Spinner from 'components/base/Spinner/Spinner.view';
import { DropdownArrow, UpArrow } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import numberToShortenAmount from 'utils/String/numberToShortenAmount';
import { useTheme } from 'utils/Theme';

import { CategoryDetailGeneratedProps } from './CategoryDetail.props';
import {
  Container,
  SpinnerContainer,
  HeaderRow,
  CategoryContainer,
} from './CategoryDetail.style';

const hasIncreased = (percentage: string) =>
  percentage ? parseFloat(percentage) > 0 : false;

const CategoryDetailView = ({
  data,
  ...props
}: CategoryDetailGeneratedProps) => {
  const theme = useTheme();

  return (
    <Container>
      <HeaderRow align="center" justify="between">
        <InnerRouteHeader title={props.title} fullRow={false} />
        <Typography variant="overline" color="shade6">
          {props.dateRange}
        </Typography>
      </HeaderRow>

      {props.isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          {data.map((d, i) => (
            <CategoryContainer key={i}>
              <img src={d.image} alt="" />

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
                      hasIncreased(d.percentageChange) ? 'success' : 'error'
                    }
                  >
                    {hasIncreased(d.percentageChange) ? '+' : '-'}
                    {d.percentageChange}%
                  </Typography>
                </div>
              </div>
            </CategoryContainer>
          ))}
        </>
      )}
    </Container>
  );
};

export default CategoryDetailView;
