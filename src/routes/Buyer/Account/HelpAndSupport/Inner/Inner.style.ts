import { EnvelopeAlt, Chat } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Link } from 'react-router-dom';
import styled from 'utils/styled';

export const Container = styled.div`
  .inner_paragraph {
    span {
      b {
        color: ${({ theme }) => theme.grey.shade9};
      }
    }
  }

  .breadcrumbs__label {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }

  .inner__contact {
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

  .inner_page__breadcrumb {
    @media (max-width: 576px) {
      display: none;
    }
  }

  .inner_page__account {
    @media (max-width: 576px) {
      padding-bottom: 0px;
    }

    @media ${BREAKPOINTS.homeDesktop} {
      display: none;
    }
  }

  .inner_page__title {
    @media ${BREAKPOINTS.homeDesktop} {
      margin: 16px 0 0;
    }

    @media ${BREAKPOINTS.nonDesktop} {
      margin: 16px 0 0;
    }

    @media ${BREAKPOINTS.nonDesktop} {
      margin: 16px 0;
    }
  }
`;

export const Account = styled(Typography)`
  padding: 0 0 24px;
  font-family: 'Media Sans';
`;

export const Contents = styled.div`
  color: ${({ theme }) => theme.grey.shade7};
  .entry-link {
    color: ${({ theme }) => theme.brand.primary};
    text-decoration: underline;
    font-weight: 500;
  }

  .media-container {
    display: flex;
    justify-content: center;
    padding: 24px;
    width: 100%;
  }

  .video-iframe {
    width: 100%;
    max-width: 671px;
    height: 425px;
  }

  b {
    color: ${({ theme }) => theme.grey.noshade};
  }
  @media ${BREAKPOINTS.homeDesktop} {
    padding: 32px 0;
  }

  @media ${BREAKPOINTS.nonDesktop} {
    padding: 24px 0;
    .media-container {
      padding: 0;
    }
  }

  @media ${BREAKPOINTS.nonDesktop} {
    padding: 16px 0;
  }
`;

export const Text1 = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 48px;

  @media ${BREAKPOINTS.sm} {
    margin-top: 0;
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
