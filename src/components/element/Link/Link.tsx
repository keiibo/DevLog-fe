import { LinkProps, Link as LinkRouter } from 'react-router-dom';
import styled from 'styled-components';
import { mixinPurpleColor } from '../../../style/Mixin';

export const Link = ({ children, ...props }: LinkProps) => {
  return <StyledLink {...props}>{children}</StyledLink>;
};

const StyledLink = styled(LinkRouter)`
  ${mixinPurpleColor}
  text-decoration: none;
  &:hover {
    ${mixinPurpleColor}
    filter: brightness(2.2);
  }
`;
