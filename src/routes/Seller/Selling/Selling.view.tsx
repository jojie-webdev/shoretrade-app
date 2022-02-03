import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import Select from 'components/base/Select';
import {
  TexturedSwordFish,
  ArrowRight,
  ChevronRight,
} from 'components/base/SVG';
import Tabs from 'components/base/Tabs';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import LoadingView from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Pagination from 'components/module/Pagination';
import Search from 'components/module/Search';
import { SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { SALES_CHANNELS } from 'consts/salesChannels';
import debounce from 'lodash.debounce';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { AnimatedSwordfish } from 'res/images/animated/swordfish';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import { ellipsisOnOverflow } from 'utils/String/ellipsisOnOverflow';
import theme, { useTheme } from 'utils/Theme';

import { SellingGeneratedProps, ItemProp, CounterProps } from './Selling.props';
import {
  ItemImage,
  ItemCard,
  Tag,
  Container,
  StyledTouchable,
  NoSellingContainer,
  SVGContainer,
  TabItem,
  ProductPreviewContainer,
} from './Selling.style';
import { listingToItem } from './Selling.transform';
import Alert from 'components/base/Alert';

const flatMap = (array: [], fn: any) => {
  let result: any[] = [];
  array.forEach((element) => {
    const mapping = fn(element);
    result = result.concat(mapping);
  });
  return result;
};

const renderSize = (size: any, color: string) => {
  size = flatMap(size.split('-'), function (part: any) {
    return [part, <ArrowRight key={part} fill={color} />];
  });
  size.pop();
  return size;
};

const formattedRemaining = (remaining?: string, unit?: string) => {
  if (remaining && unit) {
    return ellipsisOnOverflow(
      `${Number(remaining).toFixed(0)} ${unit?.toLowerCase()}`,
      15
    );
  }
  return '';
};

const Item = (props: ItemProp) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const { goToListingDetails } = props;

  return (
    <ItemCard
      onClick={() => goToListingDetails && goToListingDetails(props.id)}
    >
      <Row nogutter>
        <Col xs="content" sm="content">
          <ItemImage src={parseImageUrl(props.uri)} alt="" />
        </Col>

        <Col>
          <Row nogutter>
            <Col sm={4} style={{ padding: '0 12px' }}>
              <Typography
                className="item-title"
                variant="label"
                color="noshade"
                weight="400"
              >
                {props.title}
              </Typography>

              <Row nogutter>
                {props.tags &&
                  props.tags.length !== 0 &&
                  props.tags.map((tag) => (
                    <Col
                      key={tag.label}
                      xs="content"
                      style={{ margin: '4px 4px 0 0' }}
                    >
                      <Tag
                        key={tag.label}
                        background={
                          tag.type === 'blue' ? theme.brand.info : undefined
                        }
                      >
                        <Typography variant="overlineSmall" color="noshade">
                          {tag.label}
                        </Typography>
                      </Tag>
                    </Col>
                  ))}
              </Row>

              <Typography
                variant="caption"
                color="noshade"
                weight="400"
                style={{ marginTop: '8px' }}
              >
                {props.size?.includes('-') ? (
                  <>{renderSize(props.size, theme.grey.shade7)}</>
                ) : (
                  props.size
                )}
              </Typography>
            </Col>

            <Col
              sm={8}
              style={{ padding: '0 12px', marginTop: isMobile ? '16px' : 0 }}
            >
              <Row nogutter>
                <Col>
                  <Row nogutter>
                    <Col xs={6}>
                      <Typography variant="caption" color="shade7">
                        Remaining Stock
                      </Typography>
                      <Typography variant="label" color="noshade" weight="400">
                        {formattedRemaining(props.remaining, props.unit)}
                      </Typography>
                    </Col>

                    <Col xs={6}>
                      <Typography variant="caption" color="shade7">
                        Sales
                      </Typography>
                      <Typography variant="label" color="noshade" weight="400">
                        {props.sales}
                      </Typography>
                    </Col>

                    <Col xs={6} style={{ marginTop: '8px' }}>
                      <Typography variant="caption" color="shade7">
                        Price
                      </Typography>
                      <Typography variant="label" color="noshade" weight="400">
                        $ {props.price} / {formatUnitToPricePerUnit(props.unit)}
                      </Typography>
                    </Col>

                    <Col xs={6} style={{ marginTop: '8px' }}>
                      <Typography variant="caption" color="shade7">
                        {props.timeLeft && 'Time Left'}
                      </Typography>
                      <Typography variant="label" color="noshade" weight="400">
                        {props.timeLeft} {props.timeLeft && 'left'}
                      </Typography>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs="content" sm="content">
          <StyledTouchable
            onPress={() => goToListingDetails && goToListingDetails(props.id)}
            dark
          >
            <ChevronRight height={12} width={12} />
          </StyledTouchable>
        </Col>
      </Row>
    </ItemCard>
  );
};

const NoSelling = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isTablet = useMediaQuery({ query: BREAKPOINTS['md'] });
  const isSmallScreen = isMobile || isTablet;

  return (
    <NoSellingContainer>
      {isMobile && (
        <SVGContainer circleColor="none">
          <TexturedSwordFish height={200} width={200} />
        </SVGContainer>
      )}
      <div className="parent-details">
        <Typography
          className="title-text"
          variant="title4"
          color="noshade"
          style={{
            fontFamily: 'Media Sans',
            fontSize: isSmallScreen ? '20px' : '32px',
          }}
        >
          You have no selling products
        </Typography>
        <div className="details-container">
          <div className="circle" />
          <div className="text-container">
            <Typography variant="copy" weight="400" color="noshade">
              Customise your products and list them
            </Typography>
            <Typography variant="label" weight="regular" color="shade7">
              Follow the steps and sell your products to the thousands of Buyers
              on ShoreTrade.
            </Typography>
          </div>
        </div>
        <div className="details-container">
          <div className="circle" />
          <div className="text-container">
            <Typography variant="copy" weight="400" color="noshade">
              Make changes in real time
            </Typography>
            <Typography variant="label" weight="regular" color="shade7">
              Edit your listings easily, with changes instantly reflected to
              Buyers.
            </Typography>
          </div>
        </div>
        <div className="details-container">
          <div className="circle" />
          <div className="text-container">
            <Typography variant="copy" weight="400" color="noshade">
              Get notified for new sales
            </Typography>
            <Typography variant="label" weight="regular" color="shade7">
              Ensure your notifications for new orders are enabled to pack the
              products sooner.
            </Typography>
          </div>
        </div>
        <Button
          className="add-product-btn"
          text="Add Product"
          textVariant="overline"
          onClick={() => history.push(SELLER_ROUTES.ADD_PRODUCT)}
        />
      </div>
      {!isMobile && (
        <SVGContainer circleColor="none">
          <TexturedSwordFish height={320} width={320} />
        </SVGContainer>
      )}
    </NoSellingContainer>
  );
};

const SearchComponent = (props: {
  defaultValue: string;
  onChange: (value: string) => void;
  activeTab: string;
}) => {
  const [searchValue, setSearchValue] = useState('');
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  useEffect(() => {
    setSearchValue(props.defaultValue);
    // eslint-disable-next-line
  }, [props.activeTab]);

  return (
    <Search
      value={searchValue}
      resetValue={() => {
        setSearchValue('');
        props.onChange('');
      }}
      onChange={(e) => {
        setSearchValue(e.target.value);
        props.onChange(e.target.value);
      }}
      placeholder="Search..."
      style={{
        marginBottom: '0',
        marginTop: isMobile ? '8px' : '0',
      }}
      darkMode={true}
    />
  );
};

const SellingView = (props: SellingGeneratedProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isTablet = useMediaQuery({ query: BREAKPOINTS['md'] });
  const isSmallScreen = isMobile || isTablet;
  const {
    listings,
    counter,
    pending,
    goToListingDetails,
    search,
    onChangeSearch,
    page,
    onChangePage,
    activeTab,
    onChangeTab,
    showAlertSuccess,
    listingDetailPreview,
  } = props;

  const totalPages = Math.ceil(counter[activeTab as keyof CounterProps] / 10);
  const debouncedSearch = debounce(function (value: string) {
    onChangeSearch(value);
  }, 400);

  return (
    <>
      <Container>
        {isSmallScreen && <MobileHeader>Selling</MobileHeader>}

        {(counter.allListing > 0 || search) && (
          <Row className="search-row">
            <Col sm={9}>
              {isMobile ? (
                <Select
                  dark={true}
                  borderRadius="12px"
                  marginTop="0"
                  height="40px"
                  padding="10px 12px"
                  options={[...SALES_CHANNELS].map((channel) => ({
                    value: channel.value,
                    label: `Show ${channel.label}`,
                  }))}
                  value={activeTab}
                  onChange={(o) => onChangeTab(o.value)}
                  arrowIcon={
                    <ChevronRight
                      fill={theme.brand.primary}
                      style={{ transform: 'rotate(90deg)' }}
                    />
                  }
                />
              ) : (
                <Tabs
                  tabStyle={{ padding: '9px 12px' }}
                  fitTabWidthToContent={true}
                  selectedTab={activeTab}
                  onClickTab={(tab) => onChangeTab(tab)}
                  justify="start"
                  tabValues={SALES_CHANNELS.map((channel) => channel.value)}
                  tabElements={SALES_CHANNELS.map((channel) => (
                    <TabItem key={channel.value}>
                      <div className="tab-label">{channel.label}</div>
                      <Tag background={theme.grey.shade9}>
                        <Typography
                          variant="overlineSmall"
                          color="noshade"
                          style={{ fontSize: '9px' }}
                        >
                          {counter &&
                            counter[channel.value as keyof CounterProps]}
                        </Typography>
                      </Tag>
                    </TabItem>
                  ))}
                />
              )}
            </Col>

            <Col sm={3}>
              <SearchComponent
                defaultValue={search}
                onChange={debouncedSearch}
                activeTab={activeTab}
              />
            </Col>
            {isMobile && !pending && (
              <Col sm={3}>
                <div style={{ width: '100%', marginTop: '8px' }}>
                  <Typography variant="label" color="shade6">
                    <span style={{ color: '#fff' }}>{counter.allListing}</span>{' '}
                    Results
                  </Typography>
                </div>
              </Col>
            )}
          </Row>
        )}
        {showAlertSuccess && (
          <ProductPreviewContainer>
            <Alert
              header={'Product Listed'}
              content={'You have successfully added your listing.'}
              variant="success"
              fullWidth
              style={{
                marginTop: 16,
                marginBottom: 16,
              }}
            />
            {!!(listingDetailPreview || {}).type_id && (
              <Item
                {...listingToItem(listingDetailPreview)}
                key={listingDetailPreview.listing_id}
                goToListingDetails={goToListingDetails}
              />
            )}
          </ProductPreviewContainer>
        )}
        <Row className="row" justify="center">
          <Col>
            {pending ? (
              <LoadingView />
            ) : counter[activeTab as keyof CounterProps] > 0 ? (
              listings.map((listing) => (
                <Item
                  {...listingToItem(listing)}
                  key={listing.listing_id}
                  goToListingDetails={goToListingDetails}
                />
              ))
            ) : search ? (
              <div style={{ marginTop: isTablet ? '0' : '30px' }}>
                <EmptyState
                  AnimatedSvg={AnimatedSwordfish}
                  title="No search result"
                />
              </div>
            ) : counter.allListing > 0 ? (
              <div style={{ marginTop: isTablet ? '0' : '30px' }}>
                <EmptyState
                  AnimatedSvg={AnimatedSwordfish}
                  title="No active listing"
                />
              </div>
            ) : (
              <NoSelling />
            )}
          </Col>
        </Row>
        {totalPages > 1 && (
          <Row justify="center">
            <Pagination
              numPages={totalPages}
              currentValue={page}
              onClickButton={(value) => onChangePage(value)}
              variant="number"
            />
          </Row>
        )}
      </Container>
    </>
  );
};

export default SellingView;
