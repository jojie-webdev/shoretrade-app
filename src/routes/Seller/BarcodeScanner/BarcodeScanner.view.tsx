import React from 'react';

import { Apple, GooglePlay } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import BarcodeImage1 from 'res/images/barcode-1.png';
import BarcodeImage2 from 'res/images/barcode-2.png';
import BarcodeImage3 from 'res/images/barcode-3.png';
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
          An App to scan your Barcodes
        </Typography>
        <Typography color="shade6">
          Download the Barcode Scanner App from the App Store to easily add,
          scan and manage your Barcodes.
        </Typography>
        <LinkContainer>
          <LinkButton>
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
          <LinkButton>
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
        <img src={BarcodeImage1} />
        <img src={BarcodeImage2} />
        <img src={BarcodeImage3} />
      </ImgContainer>
    </Container>
  );
};

export default BarcodeScannerView;
