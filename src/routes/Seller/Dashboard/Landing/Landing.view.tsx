import React, { useState } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import { DropdownArrow, Filter } from 'components/base/SVG';
import UpArrow from 'components/base/SVG/UpArrow';
import Typography from 'components/base/Typography';
import CategoryImage from 'components/module/CategoryImage';
import DatePickerModal from 'components/module/DatePickerModal';
import EmptyDashboard from 'components/module/EmptyDashboard';
import FreeTrialCountdown from 'components/module/FreeTrialCountdown';
import LinePath from 'components/module/LinePath';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import SubscriptionAlert from 'components/module/SubscriptionAlert';
import { SELLER_DASHBOARD_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { COMPANY_RELATIONSHIPS } from 'consts/companyRelationships';
import moment from 'moment';
import { FocusedInputShape } from 'react-dates';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import {
  getGraphData,
  includeTopCategoriesPercentChange,
  salesDataToMonthlyGraph,
} from 'routes/Seller/Dashboard/Landing/Landing.transforms';
import getFiscalQuarter from 'utils/Date/getFiscalQuarter';
import getFiscalYear from 'utils/Date/getFiscalYear';
import getValidDateRangeByFinancialYear from 'utils/Date/getValidDateRangeByFinancialYear';
import numberToShortenAmount from 'utils/String/numberToShortenAmount';
import { useTheme } from 'utils/Theme';

import {
  DashboardLandingGeneratedProps,
  SalesData,
  TopCategoriesData,
} from './Landing.props';
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
  SalesRow,
  MobileFilterButton,
  MobileFilterRow,
  MobileFilterContainer,
  TotalSalesCard,
} from './Landing.style';

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
          <MobileHeader style={{ marginBottom: 0 }}>Dashboard</MobileHeader>
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

const TotalSales = (props: {
  paid: number;
  pending: number;
  linkToPaidGraph: any;
}) => {
  return (
    <TotalSalesRow>
      <Col md={12} className="title-col">
        <Link to={SELLER_DASHBOARD_ROUTES.CASH_FLOW('FY')}>
          <Typography variant="label" color="shade6" component="span">
            Total Sales
          </Typography>
        </Link>
      </Col>
      <SalesRow nowrap gutterWidth={24}>
        <Link
          to={props.linkToPaidGraph}
          className="figma-width"
          style={{ marginRight: 16 }}
        >
          <TotalSalesCard className="figma-width">
            <Typography variant="overline" color="shade6" className="overline">
              Paid
            </Typography>
            <Typography variant="title4" color="noshade">
              {numberToShortenAmount(props.paid)}
            </Typography>
          </TotalSalesCard>
        </Link>

        <TotalSalesCard>
          <div>
            <Typography variant="overline" color="shade6" className="overline">
              Pending
            </Typography>
            <Typography variant="title4" color="noshade">
              {numberToShortenAmount(props.pending)}
            </Typography>
          </div>
        </TotalSalesCard>
      </SalesRow>
    </TotalSalesRow>
  );
};

const MonthlySales = (props: { salesData: SalesData }) => {
  const monthlyGraphData = salesDataToMonthlyGraph(
    props.salesData.graph,
    props.salesData.previousMonthTotal
  );
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
        {monthlyGraphData.map((m, i: number) => (
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

const TopCategories = (props: {
  topCategoriesData: TopCategoriesData;
  linkToCategories: any;
  linkToCategoryDetails: any;
}) => {
  const theme = useTheme();

  const topCategoriesPercentage = includeTopCategoriesPercentChange(
    props.topCategoriesData
  );

  return (
    <TopCategoriesContainer>
      <Row>
        <Col md={12} className="title-col">
          <Link to={props.linkToCategories}>
            <Typography variant="label" color="shade6" component="span">
              Top Categories
            </Typography>
          </Link>
        </Col>
      </Row>
      <MonthlyRow nowrap gutterWidth={24}>
        {topCategoriesPercentage.map((c, i: number) => (
          <Link key={i} to={props.linkToCategoryDetails(c.id, c.name)}>
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
                    {hasIncreased(c.percentageChange) ? '+' : ''}
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
    // data,
    isLoading,
    isCalendarModalOpen,
    toggleModal,
    toPaidGraph,
    toCategories,
    toCategoryDetails,
    userPending,
    salesData,
    topCategoriesData,
    activePlan,
    companyRelationship,
  } = props;

  const [startDate, setStartDate] = useState(moment().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [focus, setFocus] = useState<FocusedInputShape>('startDate');
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const onDateChange = (newDates: any) => {
    setStartDate(newDates.startDate);
    setEndDate(newDates.endDate);
  };

  const onFocusChange = (arg: any) => {
    setFocus(!arg ? 'startDate' : arg);
  };

  // const onReset = () => {
  //   setStartDate(moment());
  //   setEndDate(moment().add(7, 'days'));
  // };

  const hasSalesData =
    salesData.graph.length > 0 &&
    (salesData.total.paid !== 0 || salesData.total.pending !== 0);

  return (
    <Container>
      <>
        {/* {activePlan?.is_free_trial && (
          <FreeTrialCountdown daysLeft={activePlan.countdown} />
        )}

        {!activePlan?.is_free_trial && (
          <SubscriptionAlert activePlan={activePlan} />
        )} */}

        {userPending && (
          <Alert
            variant="alert"
            content={`Your account needs approval.`}
            fullWidth
            alignText="center"
            style={{ marginBottom: 16 }}
          />
        )}
        <FilterHeader {...props} />

        {isLoading && <Loading />}

        {!isLoading &&
          !hasSalesData &&
          topCategoriesData.topCategories.length === 0 && <EmptyDashboard />}

        {hasSalesData && (
          <TotalSales
            paid={salesData.total.paid}
            pending={salesData.total.pending}
            linkToPaidGraph={toPaidGraph}
          />
        )}

        {hasSalesData && <MonthlySales salesData={salesData} />}

        {!userPending
          ? topCategoriesData.topCategories.length > 0 &&
            companyRelationship !== undefined && (
              <TopCategories
                topCategoriesData={topCategoriesData}
                linkToCategories={toCategories}
                linkToCategoryDetails={toCategoryDetails}
              />
            )
          : null}

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
            // onReset={onReset}
          >
            {isSmallScreen && (
              <MobileFilterContainer>
                <MobileFilterHeader {...props} />
              </MobileFilterContainer>
            )}
          </DatePickerModal>
        )}
      </>
    </Container>
  );
};

export default DashboardView;
