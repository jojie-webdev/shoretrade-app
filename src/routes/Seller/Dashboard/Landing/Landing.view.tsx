import React, { useState } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Spinner from 'components/base/Spinner';
import { ArrowRight, DropdownArrow, Filter } from 'components/base/SVG';
import UpArrow from 'components/base/SVG/UpArrow';
import Typography from 'components/base/Typography';
import CategoryImage from 'components/module/CategoryImage';
import DatePickerModal from 'components/module/DatePickerModal';
import EmptyDashboard from 'components/module/EmptyDashboard';
import LinePath from 'components/module/LinePath';
import { SELLER_DASHBOARD_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { FocusedInputShape } from 'react-dates';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
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
  NotificationsContainer,
  SalesRow,
  MobileFilterButton,
  MobileFilterRow,
  MobileFilterContainer,
  TotalSalesCard,
} from './Landing.style';

const MarketNotification = (props: { type: string; onPress: () => void }) => {
  const { type, onPress } = props;
  const theme = useTheme();
  if (type === 'NEW_MARKET_REQUEST') {
    return (
      <Alert
        fullWidth
        content="There’s a new market request that matches the types of product that you are selling"
        variant="alert"
        onClick={() => onPress()}
        iconRight={
          <ArrowRight height={12} width={12} fill={theme.brand.alert} />
        }
      />
    );
  }
  if (type === 'MARKET_OFFER_NEGOTIATED') {
    return (
      <Alert
        fullWidth
        content="A buyer is negotiating on one of your offers"
        variant="error"
        onClick={() => onPress()}
        iconRight={
          <ArrowRight height={12} width={12} fill={theme.brand.error} />
        }
      />
    );
  }
  if (type === 'MARKET_OFFER_ACCEPTED') {
    return (
      <Alert
        fullWidth
        content="Some of your market offers have been accepted and moved to your orders"
        variant="success"
        onClick={() => onPress()}
        iconRight={
          <ArrowRight height={12} width={12} fill={theme.brand.success} />
        }
      />
    );
  }

  return null;
};

const hasIncreased = (percentage: string) =>
  percentage ? parseFloat(percentage) > 0 : false;

const FilterHeader = ({ dateRange, setDateRange, ...props }: any) => {
  const theme = useTheme();
  const getYearText = (year: number) => {
    return `FY${String(year).substr(2, 4)}/${String(year + 1).substr(2, 4)}`;
  };

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <FilterRow>
      <Col className="filter-col">
        {isSmallScreen && (
          <Typography variant="title5" color="noshade">
            Dashboard
          </Typography>
        )}
        <Button
          text={isSmallScreen ? 'Filter' : 'Custom'}
          size="sm"
          variant={dateRange.start.id === 'custom' ? 'primary' : 'unselected'}
          className={`${isSmallScreen ? 'btn-abso' : 'btn'}`}
          onClick={props.toggleModal}
          textColor={'shade6'}
          icon={
            isSmallScreen ? (
              <Filter fill={theme.brand.primary} />
            ) : (
              <DropdownArrow
                fill={
                  dateRange.start.id === 'custom'
                    ? theme.grey.noshade
                    : theme.grey.shade6
                }
              />
            )
          }
          iconPosition="after"
        />
        {!isSmallScreen && (
          <>
            <Button
              text={getYearText(getFiscalYear())}
              variant={
                getValidDateRangeByFinancialYear().start.id ===
                dateRange.start.id
                  ? 'primary'
                  : 'unselected'
              }
              size="sm"
              className="btn"
              textColor={
                getValidDateRangeByFinancialYear().start.id ===
                dateRange.start.id
                  ? 'noshade'
                  : 'shade6'
              }
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
                textColor={
                  getFiscalQuarter(v).start.id === dateRange.start.id
                    ? 'noshade'
                    : 'shade6'
                }
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
                textColor={
                  getValidDateRangeByFinancialYear(v).start.id ===
                  dateRange.start.id
                    ? 'noshade'
                    : 'shade6'
                }
                className="btn"
                onClick={() =>
                  setDateRange(getValidDateRangeByFinancialYear(v))
                }
              />
            ))}
          </>
        )}
      </Col>
    </FilterRow>
  );
};

const MobileFilterHeader = ({
  dateRange,
  setDateRange,
  toggleModal,
  ...props
}: any) => {
  const theme = useTheme();
  const getYearText = (year: number) => {
    return `FY${String(year).substr(2, 4)}/${String(year + 1).substr(2, 4)}`;
  };

  return (
    <MobileFilterRow nowrap style={{ marginLeft: 0, marginRight: 0 }}>
      <MobileFilterButton
        text={getYearText(getFiscalYear())}
        variant={
          getValidDateRangeByFinancialYear().start.id === dateRange.start.id
            ? 'primary'
            : 'unselected'
        }
        size="sm"
        className="btn"
        onClick={() => {
          setDateRange(getValidDateRangeByFinancialYear());
          toggleModal();
        }}
      />
      {[4, 3, 2, 1].map((v) => (
        <MobileFilterButton
          key={v}
          text={`Q${v}`}
          variant={
            getFiscalQuarter(v).start.id === dateRange.start.id
              ? 'primary'
              : 'unselected'
          }
          size="sm"
          onClick={() => {
            setDateRange(getFiscalQuarter(v));
            toggleModal();
          }}
          className="btn"
        />
      ))}
      {[getFiscalYear() - 1, getFiscalYear() - 2].map((v) => (
        <MobileFilterButton
          key={v}
          text={getYearText(v)}
          variant={
            getValidDateRangeByFinancialYear(v).start.id === dateRange.start.id
              ? 'primary'
              : 'unselected'
          }
          size="sm"
          className="btn"
          onClick={() => {
            setDateRange(getValidDateRangeByFinancialYear(v));
            toggleModal();
          }}
        />
      ))}
    </MobileFilterRow>
  );
};

const TotalSales = (props: any) => {
  const PaidCard = (ownProps: any) => {
    return (
      <TotalSalesCard className="figma-width">
        <Typography variant="overline" color="shade6" className="overline">
          Paid
        </Typography>
        <Typography variant="title4" color="noshade">
          {numberToShortenAmount(ownProps.data.paid ? ownProps.data.paid : 0)}
        </Typography>
      </TotalSalesCard>
    );
  };

  return (
    <TotalSalesRow justify="between">
      <Col md={12} className="title-col">
        <Link to={SELLER_DASHBOARD_ROUTES.CASH_FLOW('FY')}>
          <Typography variant="label" color="shade6" component="span">
            Total Sales
          </Typography>
        </Link>
      </Col>
      <SalesRow nowrap gutterWidth={24}>
        {props.data.paid ? (
          <Link
            to={props.toPaid}
            className="figma-width"
            style={{ marginRight: 16 }}
          >
            <PaidCard {...props} />
          </Link>
        ) : (
          <PaidCard {...props} />
        )}
        <TotalSalesCard className="pending156" >
          <div>
            <Typography variant="overline" color="shade6" className="overline">
              Pending
            </Typography>
            <Typography variant="title4" color="noshade">
              {numberToShortenAmount(
                props.data.pending ? props.data.pending : 0
              )}
            </Typography>
          </div>
        </TotalSalesCard>
      </SalesRow>
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
      <MonthlyRow nowrap gutterWidth={24} style={{ paddingLeft: 8 }}>
        {props.data.months.map((m: any, i: any) => (
          <Link
            key={i}
            to={SELLER_DASHBOARD_ROUTES.CASH_FLOW(
              `${moment(m.startDate).format('MM-DD-YYYY')}`,
              hasIncreased(m.percentage).toString()
            )}
          >
            <SalesCard className="many-cards">
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
                  {hasIncreased(m.percentage) ? '+' : ''}
                  {m.percentage}%
                </Typography>

                <LinePath
                  width={60}
                  height={25}
                  data={getGraphData(m, m.startDate)}
                  cHeight={25}
                  cWidth={60}
                  cStyle={{ alignSelf: 'center' }}
                  isEarning={hasIncreased(m.percentage)}
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
      <MonthlyRow nowrap gutterWidth={24} style={{ paddingLeft: 8 }}>
        {props.data.categories.map((c: any, i: any) => (
          <Link key={i} to={props.toDetails(c.id, c.name)}>
            <SalesCard className="many-cards">
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

const DashboardView = (props: DashboardLandingGeneratedProps) => {
  const {
    data,
    isLoading,
    isCalendarModalOpen,
    toggleModal,
    toPaidGraph,
    toCategories,
    toCategoryDetails,
    currentNotificationType,
    onClickMarketNotification,
    userPending,
  } = props;

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add('day', 7));
  const [focus, setFocus] = useState<FocusedInputShape>('startDate');
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const onDateChange = (newDates: any) => {
    setStartDate(newDates.startDate);
    setEndDate(newDates.endDate);
  };

  const onFocusChange = (arg: any) => {
    setFocus(!arg ? 'startDate' : arg);
  };

  const onReset = () => {
    setStartDate(moment());
    setEndDate(moment().add('day', 7));
  };

  return (
    <Container>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          {userPending && (
            <Alert
              variant="alert"
              content={`Your account needs approval.`}
              fullWidth
              alignText="center"
              style={{ marginBottom: 16 }}
            />
          )}
          {currentNotificationType.length > 0 && (
            <NotificationsContainer>
              <MarketNotification
                onPress={onClickMarketNotification}
                type={currentNotificationType}
              />
            </NotificationsContainer>
          )}
          <FilterHeader {...props} />

          {data.months.length > 0 ? (
            <>
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
            </>
          ) : (
            <EmptyDashboard />
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
              onClickCloseMobile={toggleModal}
              onReset={onReset}
            >
              {isSmallScreen && (
                <MobileFilterContainer>
                  <MobileFilterHeader {...props} />
                </MobileFilterContainer>
              )}
            </DatePickerModal>
          )}
        </>
      )}
    </Container>
  );
};

export default DashboardView;
