import React from 'react';

import { Apple, GooglePlay } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import BarcodeImage from 'res/images/barcode.png';
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
  const isSeller = theme.appType === 'seller';
  return (
    <Container>
      <TextContainer>
        <Typography
          variant="title3"
          color={isSeller ? 'noshade' : 'shade9'}
          style={{ fontFamily: 'Media Sans', marginBottom: 16 }}
        >
          Barcode Scanner available on App
        </Typography>
        <Typography color="shade6">
          {isSeller
            ? 'Download the ShoreTrade Seller app to scan the shipping labels of your Orders'
            : 'Download the ShoreTrade Buyer app to complete your Orders'}
        </Typography>
        <LinkContainer>
          <LinkButton
            onClick={() =>
              window.open(
                isSeller
                  ? 'https://testflight.apple.com/join/2zIfrfEY'
                  : 'https://testflight.apple.com/join/yp5Uz4ik',
                '_blank'
              )
            }
          >
            <Apple />
            <span>
              <Typography variant="overlineSmall" color="shade6">
                Download on the
              </Typography>
              <Typography variant="title6" color="noshade">
                App Store
              </Typography>
            </span>
          </LinkButton>
          <LinkButton
            onClick={() =>
              window.open(
                isSeller
                  ? 'https://play.google.com/store/apps/details?id=com.shoretradeapp.seller&hl=en&gl=US'
                  : 'https://play.google.com/store/apps/details?id=com.shoretradeapp.buyer&hl=en&gl=US',
                '_blank'
              )
            }
          >
            <GooglePlay />
            <span>
              <Typography variant="overlineSmall" color="shade6">
                Download on the
              </Typography>
              <Typography variant="title6" color="noshade">
                Google Play
              </Typography>
            </span>
          </LinkButton>
        </LinkContainer>
      </TextContainer>
      <ImgContainer>
        <img src={BarcodeImage} />
      </ImgContainer>
    </Container>
  );
};

export default BarcodeScannerView;
