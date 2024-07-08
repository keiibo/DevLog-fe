import React, { useState } from 'react';
import { GlobalHeader } from './components/composition/GlobalHeader';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { Content } from 'antd/es/layout/layout';
import { LayoutNum } from './constant/LayoutNum';
import { Colors } from './constant/Colors';
import { useQuery } from 'react-query';
import { TGetProjectRes } from './feature/dashboard/types/TProject';
import { getProjects } from './feature/dashboard/api/dashboard';
import { SideMenu } from './SideMenu';

export const Root = (): React.JSX.Element => {
  const { data: projectList } = useQuery('projects', getProjects);
  const [project, setProject] = useState<TGetProjectRes | null>(
    projectList ? projectList[0] : null
  );

  if (!projectList) {
    return <div>プロジェクト一覧がロードできません</div>;
  }

  return (
    <Layout>
      <GlobalHeader
        projectList={projectList}
        setProject={setProject}
        selectedProjectName={project ? project.name : '未選択'}
      />
      {project ? (
        <StyledMainLayout>
          <SideMenu project={project} />
          <StyledLayout>
            <StyledContent>
              <Outlet context={project} />
            </StyledContent>
          </StyledLayout>
        </StyledMainLayout>
      ) : (
        <StyledMainLayout>プロジェクトが選択されていません</StyledMainLayout>
      )}
    </Layout>
  );
};

const StyledMainLayout = styled(Layout)`
  padding: 12px;
  background-color: ${Colors.TEXT_DARK};
  height: calc(100vh - ${LayoutNum.HEADER_HEIGHT}px);
`;
const StyledLayout = styled(Layout)`
  border-radius: 12px;
  margin-left: 12px;
`;
const StyledContent = styled(Content)`
  height: 100%;
  padding: 24px;
  border-radius: 24px;
  overflow-y: auto;
`;
