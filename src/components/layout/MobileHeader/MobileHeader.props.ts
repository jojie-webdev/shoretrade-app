import { ReactNode } from 'react';

export interface MobileHeaderPublicProps {
  children: ReactNode;
  onBackOverride?: () => void;
}

export interface MobileHeaderGeneratedProps extends MobileHeaderPublicProps {
  onBack: () => void;
  showBack: () => boolean;
  getTitle: () => string;
}
