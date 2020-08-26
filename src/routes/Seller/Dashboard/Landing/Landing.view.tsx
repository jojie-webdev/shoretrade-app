import React from 'react';

import Button from 'components/base/Button';
import Spinner from 'components/base/Spinner';
import { DropdownArrow } from 'components/base/SVG';
import UpArrow from 'components/base/SVG/UpArrow';
import Typography from 'components/base/Typography';
import CategoryImage from 'components/module/CategoryImage';
import DatePickerModal from 'components/module/DatePickerModal';
import LinePath from 'components/module/LinePath';
import { SELLER_DASHBOARD_ROUTES } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { getGraphData } from 'routes/Seller/Dashboard/Landing/Landing.transforms';
import numberToShortenAmount from 'utils/String/numberToShortenAmount';
import { useTheme } from 'utils/Theme';

import { DashboardLandingGeneratedProps } from './Landing.props';
import {
  Container,
  FilterRow,
  SalesCard,
  TotalSalesRow,
  MonthlyRow,
  ChartContentContainer,
  MonthlyContainer,
  TopCategoriesContainer,
  IllustrationContainer,
  CategoryImageContainer,
  SpinnerContainer,
} from './Landing.style';

const hasIncreased = (percentage: string) =>
  percentage ? parseFloat(percentage) > 0 : false;

const FilterHeader = ({ toggleModal }: { toggleModal: () => void }) => (
  <FilterRow>
    <Col className="filter-col">
      <Button
        text="Custom"
        size="sm"
        variant="unselected"
        className="btn"
        onClick={toggleModal}
      />
      <Button text="FY19/20" size="sm" variant="unselected" className="btn" />
      <Button text="Q4" size="sm" variant="unselected" className="btn" />
      <Button text="Q3" size="sm" variant="unselected" className="btn" />
      <Button text="Q2" size="sm" variant="unselected" className="btn" />
      <Button text="Q1" size="sm" variant="unselected" className="btn" />
      <Button text="FY18/19" size="sm" variant="unselected" className="btn" />
      <Button text="FY17/18" size="sm" variant="unselected" className="btn" />
    </Col>
  </FilterRow>
);

const TotalSales = (props: any) => (
  <TotalSalesRow gutterWidth={24}>
    <Col md={12} className="title-col">
      <Typography variant="label" color="shade6">
        Total Sales
      </Typography>
    </Col>
    <Col md={5}>
      <Link to={SELLER_DASHBOARD_ROUTES.CASH_FLOW('2020-10-10')}>
        <SalesCard>
          <Typography variant="overline" color="shade6" className="overline">
            Paid
          </Typography>
          <Typography variant="title4" color="noshade">
            {numberToShortenAmount(props.data.paid)}
          </Typography>
        </SalesCard>
      </Link>
    </Col>
    <Col md={5}>
      <Link to={SELLER_DASHBOARD_ROUTES.CASH_FLOW('2020-10-10')}>
        <SalesCard>
          <Typography variant="overline" color="shade6" className="overline">
            Pending
          </Typography>
          <Typography variant="title4" color="noshade">
            {numberToShortenAmount(props.data.pending)}
          </Typography>
        </SalesCard>
      </Link>
    </Col>
  </TotalSalesRow>
);

const MonthlySales = (props: any) => {
  const theme = useTheme();

  return (
    <MonthlyContainer>
      <Row>
        <Col md={12} className="title-col">
          <Typography variant="label" color="shade6">
            Monthly Sales
          </Typography>
        </Col>
      </Row>
      <MonthlyRow nowrap gutterWidth={24}>
        {props.data.months.map((m: any, i: any) => (
          <Col md={3} key={i}>
            <Link
              to={SELLER_DASHBOARD_ROUTES.CASH_FLOW('2020-10-20-to-2020-10-10')}
            >
              <SalesCard>
                <Typography
                  variant="overline"
                  color="shade6"
                  className="overline"
                >
                  May
                </Typography>
                <Typography variant="title4" color="noshade" className="price">
                  {numberToShortenAmount(m.total)}
                </Typography>

                <ChartContentContainer>
                  <div>
                    {hasIncreased(m.percentage) ? (
                      <UpArrow />
                    ) : (
                      <DropdownArrow fill={theme.brand.error} />
                    )}
                  </div>

                  <Typography
                    variant="caption"
                    color={hasIncreased(m.percentage) ? 'success' : 'error'}
                    className="text"
                  >
                    {hasIncreased(m.percentage) ? '+' : '-'}
                    {m.percentage}%
                  </Typography>

                  <LinePath
                    width={60}
                    height={25}
                    data={getGraphData(m, m.startDate)}
                    cHeight={25}
                    cWidth={60}
                    cStyle={{ alignSelf: 'center' }}
                  />
                </ChartContentContainer>
              </SalesCard>
            </Link>
          </Col>
        ))}
      </MonthlyRow>
    </MonthlyContainer>
  );
};

const TopCategories = (props: any) => {
  const theme = useTheme();

  return (
    <TopCategoriesContainer>
      <Row>
        <Col md={12} className="title-col">
          <Link to={SELLER_DASHBOARD_ROUTES.CATEGORIES}>
            <Typography variant="label" color="shade6">
              Top Categories
            </Typography>
          </Link>
        </Col>
      </Row>
      <MonthlyRow nowrap gutterWidth={24}>
        {props.data.categories.map((c: any, i: any) => (
          <Col md={3} key={i}>
            <SalesCard>
              <Typography
                variant="overline"
                color="shade6"
                className="overline"
              >
                {c.name}
              </Typography>
              <Typography variant="title4" color="noshade" className="price">
                {numberToShortenAmount(c.total)}
              </Typography>

              <IllustrationContainer>
                <div className="left-content">
                  <div>
                    {hasIncreased(c.percentageChange) ? (
                      <UpArrow />
                    ) : (
                      <DropdownArrow fill={theme.brand.error} />
                    )}
                  </div>

                  <Typography
                    variant="caption"
                    color={
                      hasIncreased(c.percentageChange) ? 'success' : 'error'
                    }
                    className="text"
                  >
                    {hasIncreased(c.percentageChange) ? '+' : '-'}
                    {c.percentageChange}%
                  </Typography>
                </div>

                <CategoryImageContainer>
                  <CategoryImage id={c.id} maxHeight={40} />
                </CategoryImageContainer>
              </IllustrationContainer>
            </SalesCard>
          </Col>
        ))}
      </MonthlyRow>
    </TopCategoriesContainer>
  );
};

const DashboardView = (props: DashboardLandingGeneratedProps) => {
  const { isCalendarModalOpen, toggleModal } = props;

  return (
    <Container>
      {props.isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <FilterHeader toggleModal={toggleModal} />
          <TotalSales data={props.data} />
          <MonthlySales data={props.data} />
          <TopCategories data={props.data} />
          {isCalendarModalOpen && (
            <DatePickerModal
              startDate={moment()}
              endDate={moment().add('day', 7)}
              focusedInput="startDate"
              isOpen={true}
              onFocusChange={() => {}}
              onDateChange={() => {}}
              onClickApply={() => {}}
              onClickClose={toggleModal}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default DashboardView;
