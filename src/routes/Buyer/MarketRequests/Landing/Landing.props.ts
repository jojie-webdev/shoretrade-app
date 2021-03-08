import { Dispatch, ChangeEvent } from 'react';

export type Result = {
  id: string;
  type: string;
  offers: number;
  image: string;
  expiry: string;
};

// buyerId: "5c28babb-6113-4118-933a-5e4a3d48111b"
// createdAt: "2021-03-08T03:45:22.986Z"
// id: "2022fbcb-5ec2-465c-a00e-230cc6dd51b4"
// image: "https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/type-default/WholeTuna/Yellowfin-Tuna.jpg"
// measurementUnit: "KG"
// offers: 0
// status: "OPEN"
// type: "Yellowfin Tuna"
// weight: {from: 12, to: 45}
// from: 12
// to: 45

export interface MarketRequestsLandingGeneratedProps {
  marketRequests: Result[];
  currentPath: string;
  onClickItem: (row: any) => void;
}
