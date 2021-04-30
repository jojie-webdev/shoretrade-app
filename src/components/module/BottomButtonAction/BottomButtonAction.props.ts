import React from 'react';

// support two buttons
export interface BottomButtonActionProps {
  ActionButtonMain: React.ReactNode;
  ActionButtonSecondary?: React.ReactNode;
  layout?: BottomButtonLayout;
}

export type BottomButtonLayout = 'vertical' | 'horizontal';
