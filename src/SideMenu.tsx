import {
  ExperimentFilled,
  ProfileFilled,
  DatabaseFilled,
  ReadFilled
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { TGetProjectRes } from './feature/dashboard/types/TProject';

type TMenuItem = Required<MenuProps>['items'][number];

type TProps = {
  project: TGetProjectRes;
};

export const SideMenu = ({ project }: TProps): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKeys = [location.pathname.split('/')[2]];
  const items: TMenuItem[] = [
    { key: 'detail', label: 'プロジェクト詳細', icon: <ExperimentFilled /> },
    { key: 'dashboard', label: 'ダッシュボード', icon: <ProfileFilled /> },
    { key: 'ticket', label: 'チケット', icon: <DatabaseFilled /> },
    { key: 'diary', label: 'ダイアリー', icon: <ReadFilled /> }
  ];

  const handleMenuClick = (e: { key: string }) => {
    navigate(`/${project?.projectId}/${e.key}`);
  };
  return (
    <StyledSider>
      <StyledMenu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultSelectedKeys={['dashboard']}
        items={items}
        onClick={handleMenuClick}
      />
    </StyledSider>
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
  height: 100%;
`;

const StyledMenu = styled(Menu)`
  flex: 9;
`;
