import React, { useState, useEffect } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import StarRating from 'components/base/StarRating';
import {
  PlaceholderProfile,
  Octopus,
  DropdownArrow,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyStateView from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import MarketRequestDetailPill from 'components/module/MarketRequestDetailPill';
import MarketRequestOfferFilterModalView from 'components/module/MarketRequestOfferFilterModal';
import MarketRequestSummaryView from 'components/module/MarketRequestSummary';
import OfferItem from 'components/module/OfferItem';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col, Visible, Hidden } from 'react-grid-system';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import { MarketRequestDetailProps } from 'routes/Buyer/MarketRequests/RequestDetails/RequestDetails.props';
import { getAllMarketRequestActions } from 'store/actions';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { createdAtToExpiry } from 'utils/MarketRequest';
import { parseImageUrl } from 'utils/parseImageURL';
import theme from 'utils/Theme';

import { Store } from './../../../../types/store/Store';
import {
  RequestDetailsContainer,
  HeaderContainer,
  OffersSellerAccordionContentContainer,
  CounterContainer,
  CounterCol,
  Sorter,
} from './RequestDetails.style';

export const OffersSellerAccordionContent = (props: {
  sellerId: string;
  sellerName: string;
  sellerLocation: string;
  sellerRating: number;
  image: string;
}) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const { sellerName, sellerLocation, sellerRating, image } = props;

  const displayForNonMobile = () => (
    <OffersSellerAccordionContentContainer>
      <div className="thumbnail-container">
        {image ? (
          <img src={parseImageUrl(image)} alt="" />
        ) : (
          <PlaceholderProfile />
        )}
      </div>
      <div className="info-container">
        <Typography variant="caption" color="shade8">
          {sellerName}
        </Typography>
        <div className="location-container">
          <Typography color={'shade5'} variant="overlineSmall">
            {sellerLocation}
          </Typography>
        </div>
        <div className="ratings-container">
          <div>
            <span className="value">{sellerRating}</span>
          </div>
          <div>
            {/* <StarRating
              rating={sellerRating || 0}
              spacing={3}
              starSize={16}
              unfilledColor={theme.brand.alert}
            /> */}
          </div>
        </div>
      </div>
    </OffersSellerAccordionContentContainer>
  );

  const displayForMobile = () => (
    <Typography variant="copy" color="shade8">
      {sellerName}
    </Typography>
  );

  return isMobile ? displayForMobile() : displayForNonMobile();
};

const MarketRequestDetailView = (props: MarketRequestDetailProps) => {
  const {
    data,
    onClickItem,
    breadCrumbSections,
    sellerOffers,
    showDelete,
    setShowDelete,
    onClickDelete,
    isLoading,
    onOfferDelete,
    filteredBuyerRequest,
  } = props;

  const location = useLocation();

  const splits = location.pathname.split('/');
  const offerId = splits[splits?.length - 1];

  const deleteMarketRequest = useSelector(
    (store: Store) => store.deleteMarketRequest
  );

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [sellerOffersCopy, setSellerOffersCopy] = useState<
    GetActiveOffersRequestResponseItem[]
  >([]);
  // eslint-disable-next-line
  const [itemToDelete, setItemToDelete] = useState<{ value: null | string }>({
    value: null,
  });
  // eslint-disable-next-line
  const [selectedItem, setSelectedItem] = useState<any>({});

  useEffect(() => {
    if (!searchTerm) {
      setSellerOffersCopy(sellerOffers);

      return;
    }

    const _sellerOffers = sellerOffers.filter((sellerOffer) =>
      sellerOffer.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSellerOffersCopy(_sellerOffers);
  }, [searchTerm, sellerOffers]);

  useEffect(() => {
    if (deleteMarketRequest.pending) {
      setItemToDelete({ value: null });
    } else {
      dispatch(getAllMarketRequestActions.request({}));
    }
    // eslint-disable-next-line
  }, [deleteMarketRequest]);

  useEffect(() => {
    sellerOffers.forEach((marketOffer) =>
      marketOffer.offers.forEach((offer) => {
        if (offer.id === offerId) {
          setSelectedItem(offer);
          return;
        }
      })
    );
  }, [offerId, sellerOffers]);
  const countAllOffers = () => {
    let offersCount = 0;
    sellerOffersCopy.forEach((sellerOffer) => {
      offersCount += sellerOffer.offers?.length;
    });

    return offersCount;
  };

  const isFiltered = () => {
    const _isFilterd =
      Array.isArray(props.filterModalProps.selectedFilters) &&
      props.filterModalProps.selectedFilters?.length > 0;

    return _isFilterd;
  };

  const renderCounter = () => (
    <CounterCol>
      <CounterContainer>
        <Typography
          color="shade6"
          variant="label"
          style={{ marginRight: '16px' }}
        >
          <span style={{ color: '#09131D' }}>{countAllOffers()}</span>
          <span> Results</span>
        </Typography>

        <Sorter onClick={() => props?.onClickFilterButton()}>
          <Typography
            color="shade9"
            variant="label"
            style={{ marginRight: '15px' }}
          >
            Sort by
          </Typography>
          <DropdownArrow fill={theme.grey.shade6} />
        </Sorter>
      </CounterContainer>
    </CounterCol>
  );

  const renderSearch = () => (
    <Col xl={6}>
      <div style={{ marginTop: '16px' }}>
        <Search
          className="search"
          rounded={true}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          resetValue={() => setSearchTerm('')}
          placeholder="Search"
        />
      </div>
    </Col>
  );

  const renderLeftComponent = () => (
    <Col sm={12} md={12} xl={8}>
      <Row
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {isFiltered() ? (
          <Hidden xs sm md lg>
            {renderSearch()}
          </Hidden>
        ) : (
          sellerOffers?.length > 0 &&
          !location.pathname.includes('/offer/') && (
            <Hidden xs sm md lg>
              {renderSearch()}
            </Hidden>
          )
        )}

        {isFiltered() ? (
          <Hidden xs sm md lg>
            {renderCounter()}
          </Hidden>
        ) : (
          sellerOffers?.length > 0 &&
          !location.pathname.includes('/offer/') && (
            <Hidden xs sm md lg>
              {renderCounter()}
            </Hidden>
          )
        )}
      </Row>

      {sellerOffersCopy?.length > 0 ? (
        sellerOffersCopy.map(
          (offer: GetActiveOffersRequestResponseItem, index: number) => (
            <OfferItem
              key={`offer-${index}`}
              sellerOffer={offer}
              onOfferDelete={onOfferDelete}
              onClickItem={(offer) => onClickItem(offer, offer.company_id)}
            />
          )
        )
      ) : (
        <>
          {isFiltered() ? null : (
            <>
              <EmptyStateView
                title=""
                Svg={Octopus}
                height={240}
                width={249}
                fluid
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexFlow: 'column',
                }}
              >
                <Typography
                  weight="700"
                  color="shade8"
                  variant="title6"
                  altFont
                >
                  There are no offers yet
                </Typography>
                <Typography
                  weight="400"
                  color="shade6"
                  variant="caption"
                  style={{
                    marginTop: '4px',
                    fontFamily: 'Basis Grotesque Pro',
                  }}
                >
                  Enable your push notifications
                </Typography>
              </div>
            </>
          )}
        </>
      )}
    </Col>
  );

  const countAcceptedWeight = () => {
    let acceptedWeights = 0;

    sellerOffers.forEach((sellerOffer) => {
      sellerOffer.offers.forEach((offer) => {
        if (offer.status === 'ACCEPTED') {
          acceptedWeights += offer.weight;
        }
      });
    });

    return acceptedWeights;
  };

  const renderRightComponent = () => (
    <Col sm={12} md={12} xl={4}>
      <MarketRequestDetailPill
        countAcceptedWeight={countAcceptedWeight()}
        imgUrl={filteredBuyerRequest?.image || ''}
        measurementUnit={filteredBuyerRequest?.measurementUnit || ''}
        onClickDelete={() => {
          setItemToDelete({
            value: sellerOffers[0]?.marketRequest.id || '',
          });
          setShowDelete(true);
        }}
        weight={filteredBuyerRequest?.weight}
        expiry={createdAtToExpiry(filteredBuyerRequest?.createdAt)}
      />

      <Hidden xs sm md lg>
        {
          <MarketRequestSummaryView
            measurementUnit={filteredBuyerRequest?.measurementUnit || ''}
            metric={filteredBuyerRequest?.metric || ''}
            sizeOptions={filteredBuyerRequest?.size.options || []}
            sizeUngraded={filteredBuyerRequest?.sizeUngraded || false}
            sizeFrom={filteredBuyerRequest?.size.from}
            sizeTo={filteredBuyerRequest?.size.to}
            specs={filteredBuyerRequest?.specs}
            weight={filteredBuyerRequest?.weight}
          />
        }
      </Hidden>
    </Col>
  );

  const renderItemName = () => (
    <Col>
      <Typography color="shade9" font-weight="700" altFont variant="title5">
        {data?.name}
      </Typography>
    </Col>
  );

  return (
    <RequestDetailsContainer>
      <MarketRequestOfferFilterModalView {...props.filterModalProps} />
      <ConfirmationModal
        isOpen={showDelete}
        title="Delete Market Request"
        description="Are you sure you want to delete this market request?"
        action={() => {
          onClickDelete && onClickDelete();
        }}
        actionText="DELETE"
        onClickClose={() => setShowDelete(false)}
      />
      <Hidden xs sm>
        <HeaderContainer>
          <div>
            <Breadcrumbs sections={breadCrumbSections} />
          </div>
        </HeaderContainer>
      </Hidden>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Row>{renderItemName()}</Row>

          <Row gutterWidth={30}>
            {!location.pathname.includes('/offer/') ? (
              <Visible xs sm md lg>
                {renderSearch()}
                {renderCounter()}
              </Visible>
            ) : null}
            <Hidden xs sm md lg>
              {renderLeftComponent()}
              {renderRightComponent()}
            </Hidden>
            <Visible xs sm md lg>
              {renderRightComponent()}
              {renderLeftComponent()}
            </Visible>
            <Visible lg>
              <Col>
                <MarketRequestSummaryView
                  measurementUnit={filteredBuyerRequest?.measurementUnit || ''}
                  metric={filteredBuyerRequest?.metric || ''}
                  sizeOptions={filteredBuyerRequest?.size.options || []}
                  sizeUngraded={filteredBuyerRequest?.sizeUngraded || false}
                  sizeFrom={filteredBuyerRequest?.size.from}
                  sizeTo={filteredBuyerRequest?.size.to}
                  specs={filteredBuyerRequest?.specs}
                  weight={filteredBuyerRequest?.weight}
                />
              </Col>
            </Visible>
          </Row>
        </>
      )}
    </RequestDetailsContainer>
  );
};

export default MarketRequestDetailView;
