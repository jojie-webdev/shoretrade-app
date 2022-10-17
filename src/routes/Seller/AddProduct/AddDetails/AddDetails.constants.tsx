import React from 'react';

import Typography from 'components/base/Typography';

export const TOOLTIP_MESSAGES = {
  catchDate: {
    directSale: (
      <Typography color="noshade" variant="caption">
        Select the date this product was caught, harvested or processed.
      </Typography>
    ),
    aquafuture: (
      <Typography color="noshade" variant="caption">
        Select the estimated future catch or harvest date for this product.
      </Typography>
    ),
    preAuction: (
      <Typography color="noshade" variant="caption">
        Select the date this product was caught, harvested or processed.
      </Typography>
    ),
  },
  listValidUntilDate: {
    directSale: (
      <Typography color="noshade" variant="caption">
        Select a listing expiry date that is{' '}
        <span style={{ fontWeight: 900 }}>after or on</span> the Catchment Date.
      </Typography>
    ),
    aquafuture: (
      <Typography color="noshade" variant="caption">
        Select a listing expiry date that is{' '}
        <span style={{ fontWeight: 900 }}>on or before</span> the Catchment
        Date.
      </Typography>
    ),
  },
  listValidUntilTime: {
    directSale: (
      <Typography color="noshade" variant="caption">
        Select the expiry time for the valid until date.
      </Typography>
    ),
    aquafuture: (
      <Typography color="noshade" variant="caption">
        Select the expiry time for the valid until date.
      </Typography>
    ),
  },
  auctionDate: {
    preAuction: (
      <Typography color="noshade" variant="caption">
        Select the date this product will arrive at the Sydney Fish Markets for
        Auction.
      </Typography>
    ),
  },
};
