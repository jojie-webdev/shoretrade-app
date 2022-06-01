import { EnvelopeAlt, Chat } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .category__contact {
    display: flex;
    gap: 20px;
    margin-top: 24px;
    justify-content: center;

    @media ${BREAKPOINTS.sm} {
      gap: 8px;
      display: grid;
      margin-top: 8px;
      width: 100%;
      justify-content: normal;
    }
  }

  .pagination__btn {
    border-radius: 8px;
    margin-right: 6px;
    box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
    height: 32px;
    width: 32px;

    svg {
      width: 11px;
      height: 11px;
    }
  }

  .category__account {
    @media (max-width: 576px) {
      padding-bottom: 0px;
    }

    @media ${BREAKPOINTS.homeDesktop} {
      display: none;
    }
  }

  .category__breadcrumb {
    @media (max-width: 576px) {
      display: none;
    }
  }
`;

export const Account = styled(Typography)`
  padding: 0 0 24px;
  font-family: 'Media Sans';
`;

export const SearchFieldWrapper = styled(TextField)`
  max-width: 313px;
  width: 100%;

  .text_field__field_container {
    border-radius: 12px;
    height: 56px;

    @media ${BREAKPOINTS.nonDesktop} {
      height: 40px;
    }
  }

  .text_field__field_container__input--with-suffix {
    border-radius: 12px;
  }

  .text_field__field_container__input {
    border-radius: 12px;
    padding: 0px;

    ::placeholder {
      font-family: 'Basis Grotesque Pro';
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: left;
    }
  }

  .text_field__field_container__left_component {
    border-right: none;
    min-width: 0px;
    padding: 0px 9px;
  }
`;

export const SearchContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0;

  @media ${BREAKPOINTS.sm} {
    display: block;
    margin: 16px 0 8px;
  }
`;

export const SubCategory = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24px 30px 24px 24px;
  background: ${({ theme }) => theme.grey.noshade};
  box-shadow: 0px 4px 12px rgb(41 43 50 / 4%);
  border-radius: 12px;
  cursor: pointer;

  @media ${BREAKPOINTS.sm} {
    padding: 16px 24px 16px 16px;
  }
`;

export const SubCategories = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 8px;

  @media ${BREAKPOINTS.sm} {
    margin-bottom: 16px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 32px 16px 18px;
  background: ${({ theme }) => theme.grey.noshade};
  box-shadow: 0px 4px 12px rgb(41 43 50 / 4%);
  border-radius: 12px;
  cursor: pointer;

  @media (min-width: 577px) {
    max-width: 393px;
    width: 100%;
  }
`;

export const Content2 = styled.a`
  display: flex;
  align-items: center;
  padding: 16px 32px 16px 18px;
  background: ${({ theme }) => theme.grey.noshade};
  box-shadow: 0px 4px 12px rgb(41 43 50 / 4%);
  border-radius: 12px;
  cursor: pointer;

  @media (min-width: 577px) {
    max-width: 393px;
    width: 100%;
  }
`;

export const EnvelopeAltWrapper = styled(EnvelopeAlt)`
  width: 25px;
  height: 24px;
`;

export const ChatWrapper = styled(Chat)`
  width: 25px;
  height: 24px;
`;

export const Text1 = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 48px;

  @media ${BREAKPOINTS.sm} {
    margin-top: 0;
  }
`;
