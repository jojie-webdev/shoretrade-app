import styled from 'utils/styled';

import { BadgeProps } from './Badge.props';

export const BadgeContainer = styled.div<BadgeProps>`
  color: ${(props) => (props.fontColor ? props.fontColor : 'white')};
  background-color: ${(props) =>
    props.badgeColor ? props.badgeColor : '#09131d'};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '4px'};
  padding: ${(props) =>
    props.padding ? props.padding : '4px 8px 2px'};
  font-size: 10px;
  margin: 0px 2px;
  white-space: nowrap;
`;
