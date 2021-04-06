import { OfferProps, StepProps } from '../RequestAndNegotiate.props';

export interface ReviewOfferProps extends StepProps, OfferProps {}

export interface ReviewOfferGeneratedProps extends ReviewOfferProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}
