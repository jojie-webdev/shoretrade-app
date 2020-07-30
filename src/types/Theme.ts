export type Theme = {
  //  Define themes here
  appType: 'buyer' | 'seller';
  brand: {
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  };
  grey: {
    shade1: string;
    shade2: string;
    shade3: string;
    shade5: string;
    shade6: string;
    shade7: string;
    shade8: string;
    shade9: string;
    noshade: string;
  };
  fonts: {
    BasisGrotesquePro: {
      Light: string;
      Regular: string;
      Medium: string;
      Bold: string;
      Black: string;
      LightItalic: string;
      RegularItalic: string;
      BoldItalic: string;
      BlackItalic: string;
    };
  };
};
