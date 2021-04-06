export interface AddFileProps {
  file: File | string | null;
  onSelectFile: (file: File | null) => void;
  onRemoveFile: () => void;
}
