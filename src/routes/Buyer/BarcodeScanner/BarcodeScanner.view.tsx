import React from 'react';

import { useTheme } from 'utils/Theme';

import BarcodeScannerDefaultView from './BarcodeScanner.default.view';
import { BarcodeScannerGeneratedProps } from './BarcodeScanner.props';
import BarcodeScannerSFMView from './BarcodeScanner.sfm.view';

const BarcodeScannerView = (props: BarcodeScannerGeneratedProps) => {
  const theme = useTheme();

  if (theme.isSFM) {
    return <BarcodeScannerSFMView />;
  }

  return <BarcodeScannerDefaultView />;
};

export default BarcodeScannerView;
