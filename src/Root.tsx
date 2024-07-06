import React, { useState } from 'react';
import { GlobalHeader } from './components/composition/GlobalHeader';
import { Layout, Menu, MenuProps } from 'antd';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { Content } from 'antd/es/layout/layout';
import { LayoutNum } from './constant/LayoutNum';
import Sider from 'antd/es/layout/Sider';
import { Colors } from './constant/Colors';
import { useQuery } from 'react-query';
import { TGetProjectRes } from './feature/dashboard/types/TProject';
import { getProjects } from './feature/dashboard/api/dashboard';

type TMenuItem = Required<MenuProps>['items'][number];

export const Root = (): React.JSX.Element => {
  const { data: projectList } = useQuery('projects', getProjects);
  const [project, setProject] = useState<TGetProjectRes | null>(
    projectList ? projectList[0] : null
  );
  const items: TMenuItem[] = [
    { key: '1', label: 'ダッシュボード' },
    { key: '2', label: 'チケット' },
    { key: '3', label: 'ダイアリー' }
  ];
  if (!projectList) {
    return <div>ダメええええ</div>;
  }

  return (
    <Layout>
      <GlobalHeader
        projectList={projectList}
        setProject={setProject}
        selectedProjectName={project ? project.name : '未選択'}
      />
      <StyledMainLayout>
        <StyledSider>
          <StyledMenu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            items={items}
          />
        </StyledSider>
        <StyledLayout>
          <StyledContent>
            <Outlet context={project} />
          </StyledContent>
        </StyledLayout>
      </StyledMainLayout>
    </Layout>
  );
};

const StyledSider = styled(Sider)`
  display: flex;
  .ant-layout-sider-children {
    width: 100%;
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
  width: 200px;
  border-radius: 24px;
  height: 100%;
`;

const StyledMenu = styled(Menu)`
  padding-top: 12px;
  border-radius: 12px;
  flex: 9;
`;

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
`;
