import { CSSProperties, ReactNode } from 'react';

export interface MobileNavPublicProps {
  children?: ReactNode;
  rightContent?: ReactNode;
  leftContent?: ReactNode;
  onBackOverride?: () => void;
  titleOverride?: string;
  showLogo?: boolean;
  position?: string;
}

export interface MobileNavGeneratedProps extends MobileNavPublicProps {
  onBack: () => void;
  showBack: () => boolean;
  getTitle: () => string;
}
