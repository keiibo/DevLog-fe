import React, { useEffect, useState } from 'react';
import { GlobalHeader } from './components/composition/header/GlobalHeader';
import { Layout } from 'antd';
import { Outlet, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Content } from 'antd/es/layout/layout';
import { LayoutNum } from './constant/LayoutNum';
import { useQuery } from '@tanstack/react-query';
import { TGetProjectRes } from './feature/detail/types/TProject';
import { getProjects } from './api/project';
import { SideMenu } from './SideMenu';
import {
  mixinBgTextDark,
  mixinPadding24px,
  mixinPadding4px
} from './style/Mixin';
import { Loading } from './components/element/loading/Loading';
import { useSelector } from 'react-redux';
import { selectAuth } from './store/slice/auth/authSlice';
import { QueryKey } from './constant/QueryKey';

export const Root = (): React.JSX.Element => {
  const auth = useSelector(selectAuth);
  // サイドメニューの開閉
  const [canView, setCanView] = useState(false);

  // storeに保存されたユーザー情報からuserIdを取得し、reqに使う
  const { data: projectList, refetch } = useQuery({
    queryKey: [QueryKey.PROJECT_LIST],
    queryFn: () => getProjects(auth.userId)
  });
  const { id: projectId } = useParams();
  const [project, setProject] = useState<TGetProjectRes | null>(
    projectList
      ? projectList.find((p) => p.projectId === projectId) || null
      : null
  );
  useEffect(() => {
    refetch();
  }, [auth]);

  if (!projectList) {
    return <Loading />;
  }

  return (
    <Layout>
      <GlobalHeader
        projectList={projectList}
        setProject={setProject}
        selectedProjectName={project ? project.name : '未選択'}
        auth={auth}
        canView={canView}
        setCanView={setCanView}
      />
      {project ? (
        <StyledMainLayout>
          <SideMenu project={project} canView={canView} />
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
