import React from 'react';

import Interactions from 'components/base/Interactions';
import { DropdownArrow, Filter, UpArrow } from 'components/base/SVG/';
import Typography from 'components/base/Typography';
import FilterModal from 'components/module/FilterModal';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LineChart from 'components/module/LineChart';
import LinePath from 'components/module/LinePath';
import Loading from 'components/module/Loading';
import { BREAKPOINTS } from 'consts/breakpoints';
import numeral from 'numeral';
import { Row, Col, Hidden } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { MarketPriceDetailGeneratedProps } from './MarketPriceDetail.props';
import {
  Container,
  FilterButton,
  StockContainer,
  StockSummaryRow,
  HeaderRow,
} from './MarketPriceDetail.style';

const MarketPriceDetailView = (props: MarketPriceDetailGeneratedProps) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const { openFilterModal, name, data, graphData, ...filterModalProps } = props;

  const hasIncreased = data ? parseFloat(data.percentage) > 0 : false;
  const price =
    data && data.minPrice && data.maxPrice
      ? `$${data.minPrice} - $${data.maxPrice}`
      : '';

  return (
    <Container>
      {!data ? (
        <HeaderRow justify="center" align="center">
          <Loading />
        </HeaderRow>
      ) : (
        <>
          <HeaderRow nogutter justify="between" align="center">
            <InnerRouteHeader title={name} fullRow={false} />

            <FilterButton onClick={openFilterModal}>
              <Typography
                variant="label"
                color="noshade"
                weight="500"
                className="btn-text"
              >
                Filters
              </Typography>

              <Filter />
            </FilterButton>
          </HeaderRow>

          <StockSummaryRow>
            <Col>
              <Interactions
                label="Paid"
                leftComponent={
                  <Typography
                    variant={isSmallScreen ? 'title5' : 'title4'}
                    color="noshade"
                  >
                    {price}
                  </Typography>
                }
                rightComponent={
                  <StockContainer>
                    {data.percentage !== '' && (
                      <>
                        {hasIncreased ? (
                          <UpArrow />
                        ) : (
                          <DropdownArrow fill={theme.brand.error} />
                        )}
                        <Typography
                          variant="caption"
                          color={hasIncreased ? 'success' : 'error'}
                          className="text"
                        >
                          {hasIncreased ? '+' : '-'}
                          {data.percentage}%
                        </Typography>
                      </>
                    )}
                    <Hidden xs>
                      <LinePath
                        width={60}
                        height={15}
                        data={graphData}
                        cHeight={15}
                        cWidth={60}
                        cStyle={{ alignSelf: 'center' }}
                      />
                    </Hidden>
                  </StockContainer>
                }
              />
            </Col>
          </StockSummaryRow>

          <Row>
            <Col>
              <LineChart
                title="Paid"
                data={graphData}
                yAxisLabelFormat={(v) =>
                  `${v === 0 ? '' : `$${numeral(v).format('0.0a')}`}`
                }
                cHeight={263}
              />
            </Col>
          </Row>
        </>
      )}

      <FilterModal {...filterModalProps} />
    </Container>
  );
};

export default MarketPriceDetailView;
