import React, { useState } from 'react';

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
import { FocusedInputShape } from 'react-dates';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { getGraphData } from 'routes/Seller/Dashboard/Landing/Landing.transforms';
import getFiscalQuarter from 'utils/Date/getFiscalQuarter';
import getFiscalYear from 'utils/Date/getFiscalYear';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';
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

const FilterHeader = ({ dateRange, setDateRange, ...props }: any) => {
  const theme = useTheme();

  const getYearText = (year: number) => {
    return `FY${String(year).substr(2, 4)}/${String(year + 1).substr(2, 4)}`;
  };

  return (
    <FilterRow>
      <Col className="filter-col">
        <Button
          text="Custom"
          size="sm"
          variant={dateRange.start.id === 'custom' ? 'primary' : 'unselected'}
          className="btn"
          onClick={props.toggleModal}
          icon={
            <DropdownArrow
              fill={
                dateRange.start.id === 'custom'
                  ? theme.grey.noshade
                  : theme.grey.shade6
              }
            />
          }
          iconPosition="after"
        />
        <Button
          text={getYearText(getFiscalYear())}
          variant={
            getValidDateRangeByFinancialYear().start.id === dateRange.start.id
              ? 'primary'
              : 'unselected'
          }
          size="sm"
          className="btn"
          onClick={() => setDateRange(getValidDateRangeByFinancialYear())}
        />
        {[4, 3, 2, 1].map((v) => (
          <Button
            key={v}
            text={`Q${v}`}
            variant={
              getFiscalQuarter(v).start.id === dateRange.start.id
                ? 'primary'
                : 'unselected'
            }
            size="sm"
            onClick={() => setDateRange(getFiscalQuarter(v))}
            className="btn"
          />
        ))}
        {[getFiscalYear() - 1, getFiscalYear() - 2].map((v) => (
          <Button
            key={v}
            text={getYearText(v)}
            variant={
              getValidDateRangeByFinancialYear(v).start.id ===
              dateRange.start.id
                ? 'primary'
                : 'unselected'
            }
            size="sm"
            className="btn"
            onClick={() => setDateRange(getValidDateRangeByFinancialYear(v))}
          />
        ))}
      </Col>
    </FilterRow>
  );
};

const TotalSales = (props: any) => {
  const PaidCard = (ownProps: any) => {
    return (
      <SalesCard>
        <Typography variant="overline" color="shade6" className="overline">
          Total Paid
        </Typography>
        <Typography variant="title4" color="noshade">
          {numberToShortenAmount(ownProps.data.paid ? ownProps.data.paid : 0)}
        </Typography>
      </SalesCard>
    );
  };

  return (
    <TotalSalesRow gutterWidth={24} justify="between">
      <Col md={12} className="title-col">
        <Link to={SELLER_DASHBOARD_ROUTES.CASH_FLOW('FY')}>
          <Typography variant="label" color="shade6" component="span">
            Payment
          </Typography>
        </Link>
      </Col>
      <Col md={6} className="paid-col">
        {props.data.paid ? (
          <Link to={props.toPaid}>
            <PaidCard {...props} />
          </Link>
        ) : (
          <PaidCard {...props} />
        )}
      </Col>
      <Col md={6}>
        <SalesCard>
          <Typography variant="overline" color="shade6" className="overline">
            Pending Payment
          </Typography>
          <Typography variant="title4" color="noshade">
            {numberToShortenAmount(props.data.pending ? props.data.pending : 0)}
          </Typography>
        </SalesCard>
      </Col>
    </TotalSalesRow>
  );
};

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
          <Link
            key={i}
            to={SELLER_DASHBOARD_ROUTES.CASH_FLOW(
              `${moment(m.startDate).format('MM-DD-YYYY')}`
            )}
          >
            <SalesCard>
              <Typography
                variant="overline"
                color="shade6"
                className="overline"
              >
                {moment(m.startDate).format('MMMM')}
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
          <Link to={props.to}>
            <Typography variant="label" color="shade6" component="span">
              Top Categories
            </Typography>
          </Link>
        </Col>
      </Row>
      <MonthlyRow nowrap gutterWidth={24}>
        {props.data.categories.map((c: any, i: any) => (
          <Link key={i} to={props.toDetails(c.id, c.name)}>
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
                  <CategoryImage id={c.id} maxHeight={40} customSVGSize={1} />
                </CategoryImageContainer>
              </IllustrationContainer>
            </SalesCard>
          </Link>
        ))}
      </MonthlyRow>
    </TopCategoriesContainer>
  );
};

const DashboardView = ({
  data,
  isLoading,
  isCalendarModalOpen,
  toggleModal,
  toPaidGraph,
  toCategories,
  toCategoryDetails,
  ...props
}: DashboardLandingGeneratedProps) => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add('day', 7));
  const [focus, setFocus] = useState<FocusedInputShape>('startDate');

  const onDateChange = (newDates: any) => {
    setStartDate(newDates.startDate);
    setEndDate(newDates.endDate);
  };

  const onFocusChange = (arg: any) => {
    setFocus(!arg ? 'startDate' : arg);
  };

  return (
    <Container>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <FilterHeader toggleModal={toggleModal} {...props} />
          <TotalSales data={data} toPaid={toPaidGraph} />

          {(data.paid || data.pending) && (
            <>
              <MonthlySales data={data} />
              <TopCategories
                data={data}
                to={toCategories}
                toDetails={toCategoryDetails}
              />
            </>
          )}

          {isCalendarModalOpen && (
            <DatePickerModal
              startDate={startDate}
              endDate={endDate}
              focusedInput={focus}
              isOpen={true}
              onFocusChange={onFocusChange}
              onDateChange={onDateChange}
              onClickApply={() =>
                props.onApplyCustom({ start: startDate, end: endDate })
              }
              onClickClose={toggleModal}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default DashboardView;
