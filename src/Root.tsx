import React, { useState } from 'react';
import { GlobalHeader } from './components/composition/GlobalHeader';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { Content } from 'antd/es/layout/layout';
import { LayoutNum } from './constant/LayoutNum';
import { useQuery } from 'react-query';
import { TGetProjectRes } from './feature/dashboard/types/TProject';
import { getProjects } from './feature/dashboard/api/dashboard';
import { SideMenu } from './SideMenu';
import {
  mixinBgTextDark,
  mixinPadding24px,
  mixinPadding4px
} from './style/Mixin';

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
  height: calc(100vh - ${LayoutNum.HEADER_HEIGHT}px);

  ${mixinBgTextDark}
  ${mixinPadding4px}
`;

const StyledLayout = styled(Layout)`
  margin-left: 4px;
`;

const StyledContent = styled(Content)`
  height: 100%;
  overflow-y: auto;

  ${mixinPadding24px}
`;
