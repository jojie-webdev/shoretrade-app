import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .preview-row {
    margin-bottom: 16px;

    .add-col {
      margin-bottom: 48px;

      @media ${BREAKPOINTS['sm']} {
        margin-bottom: 16px;
      }

      .text {
        margin-bottom: 4px;
      }
    }

    .preview-col {
      display: flex;
      align-items: center;

      .img-preview {
        height: 96px;
        width: 96px;
        border: 1px solid red;
        margin-right: 8px;
        border-radius: 4px;
      }

      @media ${BREAKPOINTS['sm']} {
        margin-bottom: 16px;
      }
    }
  }
  .back-btn {
    margin-right: 16px;
    border-radius: 8px;
    max-width: 67px;
  }
  .next-btn {
    border-radius: 8px;
    max-width: 67px;
  }
`;

export const DeleteBadge = styled.button`
  padding: 4px 8px;
  background: ${(props) => props.theme.brand.error};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;

  :focus {
    outline: none;
  }

  .badge-text {
    margin-left: 4px;
  }
`;
