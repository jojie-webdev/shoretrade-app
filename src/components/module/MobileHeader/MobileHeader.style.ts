import Typography from 'components/base/Typography';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Header = styled(Typography)`
  font-weight: bold;
  font-size: ${pxToRem(24)};
  line-height: 32px;

  margin-bottom: 24px;
`;
