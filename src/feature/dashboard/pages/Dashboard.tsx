import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { TGetProjectRes } from '../types/TProject';
import { Flex } from 'antd';
import styled from 'styled-components';
import { mixinBgText } from '../../../style/Mixin';

export const Dashboard = (): React.JSX.Element => {
  const project = useOutletContext<TGetProjectRes>();

  if (!project) {
    return <div>Load</div>;
  }
  return (
    <StyledFlex vertical gap={56}>
      {project.detail ?? '詳細がありません'}
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex)`
  ${mixinBgText}
`;
