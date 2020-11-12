import Button from 'components/base/Button';
import styled, { css } from 'utils/styled';

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  display: table;
  clear: both;
  width: 100%;
  padding: 0 16px;

  .search-row {
    margin-bottom: 24px;
  }

  .filter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
  }

  .subheader {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
  }
  .result-count-container {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  height: 100%;
`;

export const FilterButton = styled(Button)`
  min-width: 64px !important;
  max-width: 64px !important;
  min-height: 24px !important;
  max-height: 24px !important;
  background: #111e2b;
  border-radius: 4px;
  color: white;
  align-content: 'center';
  justify-content: 'center';
`;
