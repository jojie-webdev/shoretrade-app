import React, { useState } from 'react';

import { BUYER_ROUTES } from 'consts';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { marketRequestAcceptOfferActions } from 'store/actions';
import marketRequestNegotiateOfferActions from 'store/actions/marketRequestNegotiation';
import { Offer } from 'types/store/GetActiveOffersState';
import { Store } from 'types/store/Store';

import { MarketRequestDetailProps } from './RequestDetails.prop';
import MarketRequestDetailView from './RequestDetails.view';

const MarketRequestDetail = (): JSX.Element => {
  const location = useLocation<{
    id: string;
    type: string;
    image: string;
    status: string;
    offers: number;
    expiry: string;
    measurementUnit: string;
    weight: {
      from: number;
      to: number;
    };
  }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const goTolist = () => {
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(id), {
      type,
      image,
      status,
      offers,
      expiry,
      id,
    });
  };

  const id = location.state ? location.state.id : '';
  const image = location.state ? location.state.image : '';
  const type = location.state ? location.state.type : '';
  const status = location.state ? location.state.status : '';
  const offers = location.state ? location.state.offers : 0;
  const expiry = location.state ? location.state.expiry : '';
  const measurementUnit = location.state ? location.state.measurementUnit : '';
  const weight = location.state ? location.state.weight : { from: 0, to: 0 };
  const activeOffers = useSelector((store: Store) => store.getActiveOffers);

  let breadCrumbSections = [];
  const offerListBreadCrumb = [
    { label: 'My Requests', link: BUYER_ROUTES.MARKET_REQUESTS },
    {
      label: 'Request Details',
    },
  ];

  const offerBreadCrumb = [
    { label: 'My Requests', link: BUYER_ROUTES.MARKET_REQUESTS },
    {
      label: 'Request Details',
      onClick: () => {
        goTolist();
      },
    },
    {
      label: 'Offer Details',
    },
  ];

  if (
    location.pathname.includes(
      BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(id)
    )
  ) {
    breadCrumbSections = offerListBreadCrumb;
  } else {
    breadCrumbSections = offerBreadCrumb;
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [negotiating, setNegotiating] = useState(false);
  const [price, setPrice] = useState('');
  const [currentOfferId, setCurrentOfferId] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedCompany, setSelectedCompany] = useState('');

  const onClickItem = (row: any, company: any) => {
    setCurrentOfferId(row.id);
    setSelectedOffer(row);
    setSelectedCompany(company);
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(row.id), {
      id,
      type,
      image,
      status,
      offers,
      expiry,
      weight,
      measurementUnit,
    });
  };

  const handleAcceptOffer = () => {
    dispatch(
      marketRequestAcceptOfferActions.request({
        marketOfferId: currentOfferId,
        marketRequestId: id,
        marketNegotiationId:
          selectedOffer?.negotiations?.reduce((a, b) =>
            a.updated_at > b.updated_at ? a : b
          ).id || undefined,
      })
    );
  };

  const submitNegotiation = (v: number) => {
    if (selectedOffer) {
      dispatch(
        marketRequestNegotiateOfferActions.request({
          marketRequestId: id,
          marketOfferId: selectedOffer.id,
          price: v,
        })
      );
    }
    setNegotiating(false);
  };

  let counterOffer = '';
  let newOffer = '';
  let deliveryTotal;
  let counterOfferLatest;
  let newOfferLatest;

  if (selectedOffer) {
    if (selectedOffer.negotiations !== null) {
      const counterOfferArr = selectedOffer.negotiations.filter(
        (i: any) => i.type === 'COUNTER_OFFER'
      );
      const newOfferArr = selectedOffer.negotiations.filter(
        (i: any) => i.type === 'NEW_OFFER'
      );

      if (counterOfferArr.length > 0 && counterOfferArr) {
        counterOfferLatest = counterOfferArr.reduce((a: any, b: any) =>
          a.updated_at > b.updated_at ? a : b
        );
      }

      if (newOfferArr.length > 0 && newOfferArr) {
        newOfferLatest = newOfferArr.reduce((a: any, b: any) =>
          a.updated_at > b.updated_at ? a : b
        );
      }
    }

    newOffer = newOfferLatest.price.toString();
    counterOffer = counterOfferLatest.price.toString();

    deliveryTotal =
      parseFloat(newOffer.length > 0 ? newOffer : `${selectedOffer.price}`) *
      selectedOffer.weight;
  }

  const generatedProps: MarketRequestDetailProps = {
    currentPath: location.pathname,
    currentOfferId,
    deliveryTotal,
    counterOffer,
    selectedOffer,
    price,
    setPrice,
    data: {
      id,
      type,
      image,
      status,
      offers,
      expiry,
      weight,
      measurementUnit,
    },
    sellerOffers: activeOffers.data?.data.marketOffers || [],
    searchTerm,
    negotiating,
    setNegotiating,
    setSearchTerm,
    onClickItem,
    selectedCompany,
    breadCrumbSections,
    handleAcceptOffer,
    submitNegotiation,
    hideNegotiate: newOfferLatest?.updated_at < counterOfferLatest?.updated_at,
  };

  return <MarketRequestDetailView {...generatedProps} />;
};

export default MarketRequestDetail;
