import React from 'react';
import { styled } from 'styled-components';
import { Colors } from '../../../../constant/Colors';

type TProps = {
  id: number;
};

export const Id = ({ id }: TProps): React.JSX.Element => {
  return <StyledId>#{id}</StyledId>;
};
const StyledId = styled.div`
  color: ${Colors.TEXT};
`;
