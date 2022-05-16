import { EnvelopeAlt, Chat } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  .help_and_support__account {
    @media (min-width: 835px) {
      display: none;
    }
  }

  .help_and_support__categories__category {
    cursor: pointer;

    @media (min-width: 1500px) {
      max-width: 20% !important;
      padding: 0px !important;
    }

    @media (min-width: 1300px) and (max-width: 1499px) {
      max-width: 25% !important;
      padding: 0px !important;
    }

    @media (min-width: 965px) and (max-width: 1299px) {
      max-width: 33.3% !important;
      padding: 0px !important;
    }

    @media (min-width: 835px) and (max-width: 964px) {
      max-width: 50% !important;
      padding: 0px !important;
    }

    @media (min-width: 705px) and (max-width: 834px) {
      max-width: 19% !important;
      padding: 0px !important;
    }

    @media (min-width: 664px) and (max-width: 704px) {
      max-width: 24% !important;
      padding: 0px !important;
    }

    @media (min-width: 581px) and (max-width: 663px) {
      max-width: 32.3% !important;
      padding: 0px !important;
    }

    @media (min-width: 576px) and (max-width: 580px) {
      max-width: 49% !important;
      padding: 0px !important;
    }

    @media (max-width: 575px) {
      padding: 0px !important;
    }
  }

  .help_and_support__categories__category_content {
    @media (min-width: 576px) {
      display: flex;
    }

    @media (max-width: 575px) {
      display: none;
    }
  }

  .help_and_support__categories__category_content_mobile {
    @media (max-width: 575px) {
      display: block;
    }

    @media (min-width: 576px) {
      display: none;
    }
  }

  .breadcrumb-container {
    margin-bottom: 48px;

    @media (max-width: 834px) {
      margin-bottom: 24px;
    }

    @media (max-width: 375px) {
      display: none;
    }
  }

  .help-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    margin: 0;
    margin-bottom: 24px;

    span {
      color: ${(props) => props.theme.brand.primary};
    }
  }

  .accordion-container {
    margin-bottom: 12px;

    .interactions {
      box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04) !important;
    }
  }

  .help_and_support__contact {
    display: flex;
    gap: 20px;
    margin-top: 24px;
    justify-content: center;

    @media (max-width: 576px) {
      display: grid;
      gap: 8px;
      margin-top: 8px;
      justify-content: normal;
    }
  }

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }
`;

export const ImageWrapper = styled.img`
  width: 100%;
  height: 224px;
  border-radius: 12px;
  object-fit: cover;

  @media (max-width: 375px) {
    height: 136px;
  }
`;

export const SearchFieldContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 394px;
  width: 100%;
  padding: 0 16px;
`;

export const SearchFieldWrapper = styled(TextField)`
  margin-top: 24px;

  @media (max-width: 375px) {
    margin-top: 16px;
  }

  .text_field__field_container {
    border-radius: 12px;
    height: 56px;

    @media (max-width: 375px) {
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

export const HelpAndSupport = styled(Typography)`
  font-family: 'Media Sans';
  text-align: center;
`;

export const Category = styled.div`
  max-width: 188px;
  width: 100%;
  border-radius: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.grey.noshade};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e5e8f5;
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  gap: 12px;
  margin-left: auto;
  margin-right: auto;

  @media ${BREAKPOINTS['nonDesktop']} {
    padding-bottom: 24px;
  }
`;

export const Title = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

export const Description = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

export const MobileDescription = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
`;

export const DescriptionContent = styled.div`
  width: 100%;
  height: 80px;
  word-wrap: break-word;
`;

export const Categories = styled(Row)`
  padding: 48px 0;

  @media ${BREAKPOINTS.homeDesktop} {
    padding: 48px 15px;
    grid-row-gap: 8px;
    grid-column-gap: 0;
  }

  @media ${BREAKPOINTS.nonDesktop} {
    padding: 24px 15px;
    gap: 8px;
  }
`;

export const Text1 = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

export const Content1 = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 32px 16px 18px;
  background: ${({ theme }) => theme.grey.noshade};
  box-shadow: 0px 4px 12px rgb(41 43 50 / 4%);
  border-radius: 12px;

  @media (min-width: 577px) {
    padding: 9px 24px 9px 16px;
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

export const Account = styled(Typography)`
  padding: 0 0 24px;
  font-family: 'Media Sans';
`;

export const Content2 = styled.div`
  position: relative;
`;
