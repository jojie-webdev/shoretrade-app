import { ReactNode } from 'react';

export interface MobileHeaderPublicProps {
  children: ReactNode;
  onBackOverride?: () => void;
  titleOverride?: string;
}

export interface MobileHeaderGeneratedProps extends MobileHeaderPublicProps {
  onBack: () => void;
  showBack: () => boolean;
  getTitle: () => string;
}
