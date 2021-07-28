import styled from 'utils/styled';

export const Container = styled.div`
  display: inline-flex;
`;

export const InnerContainer = styled.div<{ checked: boolean }>`
  border-radius: 100px;
  cursor: pointer;
  height: 24px;
  width: 42px;
  position: relative;
  transition: background 100ms;
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  background: ${(props) =>
    props.checked ? props.theme.brand.primary : props.theme.grey.shade3};
`;

export const InnerCheck = styled.span<{
  scale: number;
}>`
  width: 5px;
  height: 8px;
  border: solid #fff;
  border-radius: 2px;
  border-width: 0 2px 2px 0;
  position: absolute;
  left: 26%;
  top: 40%;
  transform: translate(-50%, -40%) rotate(45deg)
    ${({ scale }) => `scale(${scale}, ${scale})`};
`;

export const InnerCircle = styled.span<{
  scale: number;
  checked: boolean;
}>`
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.theme.grey.noshade};
  border-radius: 50%;
  left: 68%;
  top: 42%;
  position: absolute;
  display: inline-block;
  transition: transform 800ms;
  transform: ${({ checked }) =>
      checked ? `translate(-50%, -40%)` : `translate(-124%, -40%)`}
    rotate(45deg) ${({ scale }) => `scale(${scale}, ${scale})`};
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
`;
