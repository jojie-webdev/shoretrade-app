import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import TypographyView from 'components/base/Typography/Typography.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 140px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .submit-btns {
    display: flex;
  }

  .submit-btn {
    margin-top: 1rem;
    margin-right: 8px;
    max-width: 148px;
  }

  .modal_container__exit_btn {
    background-color: ${({ theme }) => theme.grey.shade10};
    border: 1px solid ${({ theme }) => theme.grey.shade8};

    svg > path {
      fill: ${({ theme }) => theme.grey.noshade};
    }
  }
`;

export const StyledAcceptButton = styled(Button)`
  border-radius: 12px;
  padding: 15px 28px;
  width: 100%;
  height: 100%;
`;

export const CTAContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 56px;
`;

export const DetailsContainer = styled.div`
  background-color: ${({ theme }) => theme.grey.shade10};
  border-radius: 12px;
  padding: 48px;
  margin-top: 24px;
`;

export const DetailsValueContainer = styled.div`
  margin-top: 12px;
  padding: 4px 6px;
  background-color: #e5e8f5;
  border-radius: 8px;
  width: fit-content;
`;

export const StyledTypography = styled(Typography)`
  font-family: 'Basis Grotesque Pro';
  clear: both;
  color: ${({ theme }) => theme.grey.shade9};
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.shade6};
  margin: 24px 0;
`;

export const NewNegoTypeWrapper = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-align: left;
  margin: 0;
  font-family: 'Graphik';
  color: ${({ theme }) => theme.brand.primary};
`;
