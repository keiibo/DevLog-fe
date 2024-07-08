import React from 'react';
import { styled } from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { TGetProjectRes } from '../types/TProject';

export const Dashboard = (): React.JSX.Element => {
  const project = useOutletContext<TGetProjectRes>();

  if (!project) {
    return <div>Load</div>;
  }
  return (
    <StyledDashboardContainer>
      {project.detail ?? '詳細がありません'}
    </StyledDashboardContainer>
  );
};

const StyledDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;
