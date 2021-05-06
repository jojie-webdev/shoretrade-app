import { ReactNode } from 'react';

export interface MobileNavPublicProps {
  children: ReactNode;
  onBackOverride?: () => void;
  titleOverride?: string;
}

export interface MobileNavGeneratedProps extends MobileNavPublicProps {
  onBack: () => void;
  showBack: () => boolean;
  getTitle: () => string;
}
