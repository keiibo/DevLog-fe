import {
  ExperimentFilled,
  // ProfileFilled,
  DatabaseFilled,
  ReadFilled,
  SettingFilled,
  CustomerServiceFilled
  // UserOutlined,
  // SaveFilled
} from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { TGetProjectRes } from './feature/detail/types/TProject';
import { TMenuItem } from './types/TMenuItem';

type TProps = {
  project: TGetProjectRes;
  canView: boolean;
};

export const SideMenu = ({ project, canView }: TProps): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKeys = [location.pathname.split('/')[2]];
  // TODO.Enumにしたい
  const items: TMenuItem[] = [
    { key: 'detail', label: 'プロジェクト詳細', icon: <ExperimentFilled /> },
    // { key: 'dashboard', label: 'ダッシュボード', icon: <ProfileFilled /> },
    { key: 'ticket', label: 'チケット', icon: <DatabaseFilled /> },
    { key: 'note', label: 'ノート', icon: <ReadFilled /> },
    // { key: 'develop_log', label: 'みんなの開発ログ', icon: <SaveFilled /> },
    {
      key: 'setting',
      label: '設定',
      icon: <SettingFilled />,
      children: [
        // { key: 'userSetting', label: 'ユーザー設定', icon: <UserOutlined /> },
        {
          key: 'customerService',
          label: 'お問い合わせ',
          icon: <CustomerServiceFilled />
        }
      ]
    }
  ];

  const handleMenuClick = (e: { key: string }) => {
    navigate(`/${project?.projectId}/${e.key}`);
  };
  return (
    <StyledSider $view={canView} collapsed={canView} collapsedWidth={40}>
      <StyledMenu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultSelectedKeys={['dashboard']}
        items={items}
        onClick={handleMenuClick}
        inlineCollapsed={canView}
      />
    </StyledSider>
  );
};

const StyledSider = styled(Sider)<{ $view: boolean }>`
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
