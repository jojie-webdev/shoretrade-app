import React from 'react';

import { ScreenClassRender } from 'react-grid-system';
import SFMBuyerBarcodeImageDesktop from 'res/images/sfm-buyer-barcode-desktop.png';
import SFMBuyerBarcodeImageMobile from 'res/images/sfm-buyer-barcode-mobile.png';
import STBuyerBarcodeImageDesktop from 'res/images/st-buyer-barcode-desktop.png';
import STBuyerBarcodeImageMobile from 'res/images/st-buyer-barcode-mobile.png';
import { useTheme } from 'utils/Theme';

import { BarcodeScannerGeneratedProps } from './BarcodeScanner.props';

const BarcodeScannerView = (props: BarcodeScannerGeneratedProps) => {
  const theme = useTheme();

  if (theme.isSFM) {
    return (
      <ScreenClassRender
        render={(screenClass: string) =>
          ['xs', 'sm', 'md'].includes(screenClass) ? (
            <img src={SFMBuyerBarcodeImageMobile} width="100%" />
          ) : (
            <img src={SFMBuyerBarcodeImageDesktop} width="100%" />
          )
        }
      />
    );
  }

  return (
    <ScreenClassRender
      render={(screenClass: string) =>
        ['xs', 'sm', 'md'].includes(screenClass) ? (
          <img src={STBuyerBarcodeImageMobile} width="100%" />
        ) : (
          <img src={STBuyerBarcodeImageDesktop} width="100%" />
        )
      }
    />
  );
};

export default BarcodeScannerView;
