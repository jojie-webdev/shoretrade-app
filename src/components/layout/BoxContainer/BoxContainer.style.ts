import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div<{
  isPreview?: boolean;
  isCreatListingSuccess?: boolean;
  isIOS?: boolean;
}>`
  padding: 48px;
  background: ${({ theme, isPreview, isCreatListingSuccess }) =>
    theme.appType === 'seller'
      ? isPreview && isCreatListingSuccess
        ? theme.grey.shade8
        : theme.grey.shade2
      : theme.grey.shade2};
  border: ${({ theme, isCreatListingSuccess }) => {
    //  if (theme.appType === 'seller') return 'none';

    return `2px solid ${
      isCreatListingSuccess ? theme.grey.shade9 : theme.grey.shade3
    }`;
  }};
  border-radius: 8px;

  @media ${BREAKPOINTS['genericTablet']} {
    padding: 24px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 16px;
    background: none;
    border: 0;
`;
