import React, { Dispatch, SetStateAction, useState } from 'react';

import Button from 'components/base/Button';
import SegmentedControls from 'components/base/SegmentedControls';
import { Crab, TrashCan, ChevronRight } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyStateView from 'components/module/EmptyState';
import LoadingView from 'components/module/Loading';
import OfferTag from 'components/module/OfferTag';
import TermsAndCondition from 'components/module/TermsAndCondition';
import { BUYER_MARKET_REQUEST_ROUTES } from 'consts/routes';
import {
  Row,
  Col,
  Visible,
  Hidden,
  ScreenClassRender,
} from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { NegotiationWithExpiry } from 'routes/Seller/MarketBoard/Landing/Landing.props';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';
import useLocalStorage from 'utils/Hooks/useLocalStorage';
import { sizeToString } from 'utils/Listing';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import {
  numberOffersTransform,
  transformMarketRequestStatusText,
} from 'utils/MarketRequest/marketRequestTag';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { sortNegotiationByStatus } from '../../../Seller/MarketBoard/Landing/Landing.transform';
import {
  MarketRequestsLandingGeneratedProps,
  Result as MarketRequest,
  TABS,
} from './Landing.props';
import {
  MarketRequestsContainer,
  Badges,
  SearchWrapper,
} from './Landing.style';
import { excludeLostNegotiation } from './Landing.transform';
import NegotiationMobileContainer from './NegotiationMobile';
import NegotiationNonMobile from './NegotiationNonMobile';
import RequestsMobile from './RequestsMobile';
import RequestsNonMobile from './RequestsNonMobile';

const MarketRequestsLandingView = (
  props: MarketRequestsLandingGeneratedProps
) => {
  const history = useHistory();
  const {
    marketRequests,
    negotiations,
    onClickItem,
    onClickNegoItem,
    onDelete,
    itemToDelete,
    setItemToDelete,
    pendingDeleteMarketRequest,
    loading,
    activeOffersData,
    reverseMarketPlace,
    canNegotiate,
    handleTabSelect,
    selectedTab,
    handleSearchChange,
    searchKeyword,
    negotiationCredit,
  } = props;

  const theme = useTheme();

  const [isAcceptClicked, setIsAcceptClicked] = useLocalStorage(
    'isTermsAndConAccepted',
    false
  );

  const [isAcceptNegoClicked, setIsAcceptNegoClicked] = useLocalStorage(
    'isNegoTermsAndConAccepted',
    false
  );

  if (pendingDeleteMarketRequest || loading) {
    return <LoadingView />;
  }

  const renderMobile = () => {
    const viewMarketRequestOrEmpty = (requests: MarketRequest[]) => {
      if (requests.length === 0) {
        return <EmptyStateView Svg={Crab} height={240} width={249} fluid />;
      }

      return requests.map((mr) => (
        <RequestsMobile
          key={mr.id}
          item={mr}
          onClickItem={onClickItem}
          activeOffersData={activeOffersData}
          setItemToDelete={setItemToDelete}
        />
      ));
    };

    const viewNegotiationsOrEmpty = (
      negotiationCollection: NegotiationWithExpiry[] | undefined
    ) => {
      if (!negotiationCollection || negotiationCollection.length === 0) {
        return <EmptyStateView Svg={Crab} height={240} width={249} fluid />;
      }

      return (
        <NegotiationMobileContainer
          negotiations={negotiationCollection}
          redirectToNegotiation={onClickNegoItem}
        />
      );
    };

    return (
      <Visible xs>
        {selectedTab === TABS.MARKET_REQUEST
          ? viewMarketRequestOrEmpty(marketRequests)
          : viewNegotiationsOrEmpty(negotiations)}
      </Visible>
    );
  };

  const renderNonMobile = () => (
    <Hidden xs>
      {selectedTab === TABS.MARKET_REQUEST ? (
        reverseMarketPlace && !isAcceptClicked ? (
          <TermsAndCondition
            appType="buyer"
            textWeb1="Can’t find your product?"
            textWeb2="Create a new Market Request"
            textMobile1="Market Request"
            textMobile2="Can’t find your product?"
            textMobile3="Create a new Market Request"
            cardText1={
              'Search for the product you want to request  and detail the specifications, size, and quantity you require. Your Market Request will be displayed to all of the Sellers on ShoreTrade, who can then make you a direct offer.'
            }
            cardText2={
              'Negotiate and Accept Offers from Sellers for up to 7 days or until the maximum quantity requested has been reached.'
            }
            cardText3={
              'Process the payment for accepted offers and get real time delivery updates.'
            }
            isAcceptClicked={isAcceptClicked}
            setIsAcceptClicked={setIsAcceptClicked}
          />
        ) : marketRequests?.length > 0 ? (
          marketRequests?.map((mr) => (
            <RequestsNonMobile
              item={mr}
              onClickItem={onClickItem}
              activeOffersData={activeOffersData}
              setItemToDelete={setItemToDelete}
            />
          ))
        ) : (
          <EmptyStateView Svg={Crab} height={240} width={249} fluid />
        )
      ) : negotiations ? (
        reverseMarketPlace && !isAcceptNegoClicked ? (
          <TermsAndCondition
            appType="buyer"
            textWeb2="Manage your Negotiations"
            textMobile1="Negotiations"
            textMobile3="Manage your Negotiations"
            cardText1={
              'Look for the orange Negotiate Price tag on listings and send a counter-offer to the seller.'
            }
            cardText2={
              'Use your Negotiation Credits to negotiate back and forth with the Seller until you agree on a price.'
            }
            cardText3={
              'Process the payment for accepted offers within the required timeframe and secure the stock!'
            }
            isAcceptClicked={isAcceptNegoClicked}
            setIsAcceptClicked={setIsAcceptNegoClicked}
            isNegotiations={true}
          />
        ) : (
          sortNegotiationByStatus(negotiations)
            ?.filter(excludeLostNegotiation)
            .map((nego) => (
              <NegotiationNonMobile
                key={nego.listing_id}
                item={nego}
                onClickItem={() => onClickNegoItem(nego)}
                activeOffersData={activeOffersData}
                setItemToDelete={setItemToDelete}
              />
            ))
        )
      ) : (
        <EmptyStateView Svg={Crab} height={240} width={249} fluid />
      )}
    </Hidden>
  );

  return (
    <MarketRequestsContainer>
      {/* <ConfirmationModal
    isOpen={showRequestSentModal}
    onClickClose={() => onConfirmSentRequest()}
    title="Market Request Sent"
    action={() => onConfirmSentRequest()}
    actionText="View Requests"
    hideCancel={true}
    description={<SentRequestDescription />}
  /> */}
      <ConfirmationModal
        isOpen={itemToDelete.value !== null}
        title="Delete Market Request"
        description="Are you sure you want to delete this market request?"
        action={() => {
          onDelete && itemToDelete.value && onDelete(itemToDelete.value);
        }}
        actionText="DELETE"
        onClickClose={() => setItemToDelete({ value: null })}
      />

      <SegmentedControls
        options={[TABS.NEGOTIATIONS, TABS.MARKET_REQUEST]}
        controlButtonColor={theme.brand.secondary}
        inactiveBackgroundColor={theme.grey.shade3}
        selectedOption={selectedTab}
        onClickControl={(value) => {
          handleTabSelect(
            value === TABS.NEGOTIATIONS
              ? TABS.NEGOTIATIONS
              : TABS.MARKET_REQUEST
          );
        }}
      />

      <div style={{ marginTop: 20 }}>
        <Row nogutter justify="around" align="center" className="header">
          {selectedTab === TABS.MARKET_REQUEST
            ? reverseMarketPlace &&
              isAcceptClicked && (
                <>
                  <Col>
                    <Hidden xs sm>
                      <Typography
                        variant="title5"
                        weight="700"
                        color="shade9"
                        altFont
                      >
                        My Market Requests
                      </Typography>
                    </Hidden>
                    {/* <Visible xs sm>
                  <Typography
                    variant="title5"
                    weight="700"
                    color="shade9"
                    altFont
                  >
                    Market Requests
                  </Typography>
                </Visible> */}
                  </Col>
                  <Col xs="content">
                    <Visible sm md lg xl xxl>
                      <Button
                        onClick={() =>
                          history.push(
                            BUYER_MARKET_REQUEST_ROUTES.CREATE_MARKET_REQUEST
                          )
                        }
                        text="CREATE REQUEST"
                        variant={
                          props.isPendingAccount ? 'disabled' : 'primary'
                        }
                        size="md"
                        disabled={props.isPendingAccount}
                      />
                    </Visible>
                  </Col>
                </>
              )
            : canNegotiate &&
              isAcceptNegoClicked && (
                <>
                  <Col>
                    <SearchWrapper
                      className="search_wrapper"
                      value={searchKeyword}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Product Name"
                      resetValue={() => handleSearchChange('')}
                    />
                  </Col>
                  <Col xs="content">
                    <Visible sm md lg xl xxl>
                      <Typography color="shade6">
                        Remaining Negotiation Credits:{' '}
                        {negotiationCredit?.is_unlimited
                          ? 'Unlimited'
                          : negotiationCredit?.credit}
                      </Typography>
                    </Visible>
                  </Col>
                </>
              )}
        </Row>
        {renderMobile()}
        {renderNonMobile()}
        <MobileFooter>
          <Button
            onClick={() =>
              history.push(BUYER_MARKET_REQUEST_ROUTES.CREATE_MARKET_REQUEST)
            }
            text="CREATE REQUEST"
            variant={props.isPendingAccount ? 'disabled' : 'primary'}
            takeFullWidth
            disabled={props.isPendingAccount}
            icon={
              <ChevronRight
                width={15}
                height={12}
                fill="white"
                style={{ paddingBottom: '2px' }}
              />
            }
          />
        </MobileFooter>
      </div>
    </MarketRequestsContainer>
  );
};

export function buildSize(
  metric: string,
  sizeFrom: string | undefined,
  sizeTo: string | undefined,
  options: any
) {
  let buildSize = sizeToString(
    metric,
    sizeFrom?.toString(),
    sizeTo?.toString()
  );

  const getCorrectedSize = () => {
    if (options && Array.isArray(options) && options.length > 1) {
      return 'Various';
    }

    return buildSize;
  };

  if (!sizeFrom) {
    if (options && Array.isArray(options)) {
      buildSize = options.join(',');
    }

    buildSize = getCorrectedSize();
  } else {
    buildSize = buildSize.replace('-', 'to');
    buildSize = getCorrectedSize();
  }

  return buildSize;
}

export default MarketRequestsLandingView;
