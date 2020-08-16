import Typography from 'components/base/Typography';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div<{ label?: string; isError: boolean }>`
  background: #ffffff;
  border: 1px solid
    ${(props) =>
      props.isError ? props.theme.brand.error : props.theme.grey.shade5};
  border-radius: 4px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 21px;
  cursor: pointer;
  position: relative;
  margin-top: ${({ label }) => (label ? '20px' : 0)};
`;

export const LeftIconContainer = styled.div`
  width: 47px;
  border-right: 1px solid ${({ theme }) => theme.grey.shade5};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade9};
  font-size: ${pxToRem(14)};
  line-height: 24px;
  font-weight: 500;
  flex: 1;
  padding-left: 12px;
  padding-right: 12px;
`;

export const Label = styled(Typography)`
  position: absolute;
  top: -20px;
  left: 0;
`;

export const ErrorContainer = styled.div`
  margin-top: 4px;
`;
