import Typography from 'components/base/Typography/Typography.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .add-col {
    margin-bottom: 16px;

    .license-file-text {
      margin-bottom: 6px;
    }

    .add-container {
      height: 64px;
    }
  }

  .btn-save-row {
    margin: 24px 0;
  }

  .preview-col {
    margin-bottom: 24px;

    .license-details {
      display: flex;
      align-items: center;
      margin-top: 6px;
    }

    img {
      cursor: pointer;
      margin-right: 16px;
    }
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
`;

export const DeleteText = styled(Typography)`
  margin-left: 4px;
`;
