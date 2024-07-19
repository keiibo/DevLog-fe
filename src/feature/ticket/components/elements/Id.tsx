import React from 'react';
import { styled } from 'styled-components';
import { mixinTextText } from '../../../../constant/Mixin';

type TProps = {
  id: number;
};

export const Id = ({ id }: TProps): React.JSX.Element => {
  return <StyledId>#{id}</StyledId>;
};
const StyledId = styled.div`
  ${mixinTextText}
`;
