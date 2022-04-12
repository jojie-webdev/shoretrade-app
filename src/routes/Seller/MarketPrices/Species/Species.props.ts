import { GetSpecieResponseItem } from 'types/store/GetSpeciesState';

export type SpecieSelectionItem = GetSpecieResponseItem & {
  selected?: boolean;
};

export interface SpeciesGeneratedProps {
  productsImSelling: GetSpecieResponseItem[];
  selectedSpecies: SpecieSelectionItem[];
  handleItemOnClick: (item: GetSpecieResponseItem) => void;
}
