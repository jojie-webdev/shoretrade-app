import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const CheckboxContainer = styled.div`
  margin-bottom: 24px;

  .checkbox-row {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .toolip-container {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .tooltip-container {
    margin: 0;
  }
`;

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .textfield-row {
    margin-bottom: 16px;

    .text-area {
      > div {
        width: 50%;
        padding-right: 16px;
        @media ${BREAKPOINTS['sm']} {
          width: 100%;
          padding-right: 0px;
        }
        @media ${BREAKPOINTS['iPad']} {
          width: 100%;
          padding-right: 0px;
        }
      }
    }
  }

  .back-btn {
    margin-right: 16px;
    max-width: 67px;
  }

  .next-btn {
    max-width: 67px;
  }
`;

export const CustomCol = styled(Col)`
  padding: 0 !important;

  .interactions {
    justify-content: flex-start;
    height: 100%;
  }

  @media ${BREAKPOINTS['sm']} {
    margin-top: 16px;
  }

  &:not(:last-of-type) {
    margin-right: 8px;
  }

  .top-content {
    justify-content: space-between;
    align-items: flex-start !important;
  }
`;

export const DatePickerTop = styled.div`
  background: ${({ theme }) => theme.grey.shade2};
  border-radius: 8px;
  margin: 16px 16px 0;
  padding: 12px;

  p {
    color: ${({ theme }) => theme.grey.shade9} !important;
  }

  .box-group {
    margin: auto;
  }
`;

export const SfmContainer = styled(Col)(({ theme }) => ({
  '&.errors': {
    '.interactions': {
      outline: `.999px solid ${theme.brand.error}`,
    },
  },
  '.sfm-error': {
    marginTop: 8,
  },
}));

export const GstBadge = styled.div`
 margin-bottom: 5px;
 margin-right: 8px;
 p {
   font-family: initial;
 }
`
