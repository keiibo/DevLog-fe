import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { TGetProjectRes } from '../types/TProject';
import { Flex } from 'antd';

export const Dashboard = (): React.JSX.Element => {
  const project = useOutletContext<TGetProjectRes>();

  if (!project) {
    return <div>Load</div>;
  }
  return (
    <Flex vertical gap={56}>
      {project.detail ?? '詳細がありません'}
    </Flex>
  );
};
