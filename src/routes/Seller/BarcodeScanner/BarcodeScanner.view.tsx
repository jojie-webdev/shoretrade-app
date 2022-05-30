import React from 'react';

import { ScreenClassRender } from 'react-grid-system';
import SFMSellerBarcodeImageDesktop from 'res/images/sfm-seller-barcode-desktop.png';
import SFMSellerBarcodeImageMobile from 'res/images/sfm-seller-barcode-mobile.png';
import STSellerBarcodeImageDesktop from 'res/images/st-seller-barcode-desktop.png';
import STSellerBarcodeImageMobile from 'res/images/st-seller-barcode-mobile.png';
import { useTheme } from 'utils/Theme';

// import { useTheme } from 'utils/Theme';
import { BarcodeScannerGeneratedProps } from './BarcodeScanner.props';
import {
  Container,
  TextContainer,
  ImgContainer,
  LinkContainer,
  LinkButton,
} from './BarcodeScanner.style';

const BarcodeScannerView = (props: BarcodeScannerGeneratedProps) => {
  const theme = useTheme();

  if (theme.isSFM) {
    return (
      <ScreenClassRender
        render={(screenClass: string) =>
          ['xs', 'sm', 'md'].includes(screenClass) ? (
            <img src={SFMSellerBarcodeImageMobile} width="100%" />
          ) : (
            <img src={SFMSellerBarcodeImageDesktop} width="100%" />
          )
        }
      />
    );
  }

  return (
    <ScreenClassRender
      render={(screenClass: string) =>
        ['xs', 'sm', 'md'].includes(screenClass) ? (
          <img src={STSellerBarcodeImageMobile} width="100%" />
        ) : (
          <img src={STSellerBarcodeImageDesktop} width="100%" />
        )
      }
    />
  );
};

export default BarcodeScannerView;
