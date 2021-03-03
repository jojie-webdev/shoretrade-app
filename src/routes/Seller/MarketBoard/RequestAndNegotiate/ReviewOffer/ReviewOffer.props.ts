import { OfferProps, StepProps } from '../RequestAndNegotiate.props';

export interface ReviewOfferProps extends StepProps, OfferProps {}

export interface ReviewOfferGeneratedProps extends ReviewOfferProps {
  onDelete: (id: string) => void;
}
