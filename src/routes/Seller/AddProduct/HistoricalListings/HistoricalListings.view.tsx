import React, { useState, useEffect, useRef } from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select';
import {
  AddListing,
  ChevronRight,
  PlaceholderProfile,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import Search from 'components/module/Search';
import SearchV2 from 'components/module/SearchV2';
import { placeholderImage } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import pathOr from 'ramda/es/pathOr';
import { useMediaQuery } from 'react-responsive';
import { HistoricalListingItem } from 'types/store/GetHistoricalListingsState';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String';
import { useTheme } from 'utils/Theme';

import { HistoricalListingsProps } from './HistoricalListings.props';
import {
  Container,
  GetStartedCard,
  HistoricalListingsCard,
  Title,
  Description,
  ListingCard,
} from './HistoricalListings.style';

const formatDescription = (item: HistoricalListingItem) => {
  const specs = item.states.map((a) => a.name).join(', ');
  const price = toPrice(item.price_per_unit);
  const unit = formatUnitToPricePerUnit(item.measurement_unit);
  const location = `${item.origin.state} ${item.origin.suburb}`;
  return `${specs} - ${price}/${unit} - ${location}`;
};

const HistoricalListings = (props: HistoricalListingsProps) => {
  const {
    searchHistoricalListings,
    historicalListings,
    navBack,
    onSkipHistoricalListings,
    onUseHistoricalListing,
  } = props;
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      searchHistoricalListings(searchTerm);
    }, 200);

    setTimer(timerId);
  }, [searchTerm]);

  return (
    <Container>
      <GetStartedCard>
        <Title>Create New Listing</Title>
        <Description>
          Choose Product Type, Size, Specs, upload Photos and create a New
          Listing from scratch.
        </Description>
        <div className="iconContainer">
          <AddListing fill={theme.grey.shade8} />
        </div>
        <div className="actionContainer">
          <Button variant="outline" text="Back" onClick={() => navBack()} />
          <Button
            text="Get Started"
            onClick={() => onSkipHistoricalListings()}
          />
        </div>
      </GetStartedCard>
      <HistoricalListingsCard>
        <Title>Historical Listing</Title>
        <Description>
          Start from a Listing you created in the last 60 Days
        </Description>
        <div className="searchFieldContainer">
          <SearchV2
            value={searchTerm}
            resetValue={() => setSearchTerm('')}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a recent listing"
          />
        </div>
        {historicalListings.map((item) => {
          return (
            <ListingCard
              key={item.id}
              onClick={() => {
                onUseHistoricalListing(item.id, item.type_id);
              }}
            >
              <img
                className="previewImage"
                src={item.image_preview || placeholderImage}
              />
              <div className="textDetailsContainer">
                <Typography color="noshade">{item.type}</Typography>
                <Typography variant="caption" color="shade6">
                  {formatDescription(item)}
                </Typography>
              </div>
              <ChevronRight width={11} height={11} />
            </ListingCard>
          );
        })}
      </HistoricalListingsCard>
    </Container>
  );
};

export default HistoricalListings;
