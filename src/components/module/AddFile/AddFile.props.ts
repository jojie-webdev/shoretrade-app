export interface AddFileProps {
  file: File | string | null;
  onSelectFile: (image: File | null) => void;
  onRemoveFile: () => void;
}
