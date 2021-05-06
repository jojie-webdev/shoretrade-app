export interface AuthContainerProps {
  children: React.ReactNode;
  title?: string;
  onCloseAction?: () => void;
  onBackAction?: () => void;
  onSkipAction?: () => void;
  currentStep?: number;
  totalSteps?: number;
  containerBackground?: string;
  minHeight?: string;
  noLogo?: boolean;
  horizontalLogo?: boolean;
  logoContainerMarginBottomHeight?: number;
  isRegister?: boolean;
  isLogin?: boolean;
  mobileFooter?: React.ReactNode;
}
