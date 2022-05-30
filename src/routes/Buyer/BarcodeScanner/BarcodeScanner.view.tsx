import React from 'react';

import { ScreenClassRender } from 'react-grid-system';
import BuyerBarcodeImageDesktop from 'res/images/buyer-barcode-desktop.png';
import BuyerBarcodeImageMobile from 'res/images/buyer-barcode-mobile.png';

import { BarcodeScannerGeneratedProps } from './BarcodeScanner.props';

const BarcodeScannerView = (props: BarcodeScannerGeneratedProps) => {
  return (
    <ScreenClassRender
      render={(screenClass: string) =>
        ['xs', 'sm', 'md'].includes(screenClass) ? (
          <img src={BuyerBarcodeImageMobile} width="100%" />
        ) : (
          <img src={BuyerBarcodeImageDesktop} width="100%" />
        )
      }
    />
  );
};

export default BarcodeScannerView;
