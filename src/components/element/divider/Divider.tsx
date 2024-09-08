import React from 'react';
import { Divider as AdDivider, DividerProps } from 'antd';
import styled from 'styled-components';

type TProps = DividerProps;

export const Divider = (props: TProps): React.JSX.Element => {
  return <StyledDivider {...props} />;
};

const StyledDivider = styled(AdDivider)`
  margin: 8px 0;
`;
