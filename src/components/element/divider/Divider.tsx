import React from 'react';
import { Divider as AdDivider } from 'antd';
import styled from 'styled-components';

export const Divider = (): React.JSX.Element => {
  return <StyledDivider />;
};

const StyledDivider = styled(AdDivider)`
  margin: 8px 0;
`;
