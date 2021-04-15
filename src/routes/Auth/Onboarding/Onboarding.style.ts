import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 50px;
  }
`;

export const SvgContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 48px;

  @media ${BREAKPOINTS['sm']} {
    margin-top: 24px;
    min-height: unset;
  }

  @media ${BREAKPOINTS['md']} {
    margin-top: 32px;
    min-height: unset;
  }

  @media ${'(min-width: 768px) and (max-width: 800px)'} {
    margin-top: 32px;
    min-height: unset;
  }

  @media ${BREAKPOINTS['xl']} {
    margin-top: 24px;
    min-height: unset;
  }
`;

export const Description = styled(Typography)`
  margin-top: 4px;
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PrevButton = styled(Button)`
  margin-right: 16px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 40px;
`;
