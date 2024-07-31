import React from 'react';
import { styled } from 'styled-components';
import { mixinTextColor } from '../../../../style/Mixin';

type TProps = {
  id: string;
};

export const Id = ({ id }: TProps): React.JSX.Element => {
  return <StyledId>#{id}</StyledId>;
};
const StyledId = styled.div`
  ${mixinTextColor}
`;
