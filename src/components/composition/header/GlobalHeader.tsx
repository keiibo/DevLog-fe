import {
  ConfigProvider,
  Flex,
  Image,
  Menu,
  MenuProps,
  notification
} from 'antd';
import { Header as AntDHeader } from 'antd/es/layout/layout';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TGetProjectRes } from '../../../feature/detail/types/TProject';
import { LayoutNum } from '../../../constant/LayoutNum';
import { useDispatch } from 'react-redux';
import { logout, TAuthSliceType } from '../../../store/slice/auth/authSlice';
import { NOTIFICATION_TIME } from '../../../constant/Notification';
// import { BellFilled } from '@ant-design/icons';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Colors } from '../../../style/Colors';
import { mixinMainColor } from '../../../style/Mixin';

// import { useAuth0 } from '@auth0/auth0-react';

type TMenuItem = Required<MenuProps>['items'][number];

type TProps = {
  selectedProjectName: string;
  projectList: TGetProjectRes[];
  setProject: React.Dispatch<React.SetStateAction<TGetProjectRes | null>>;
  auth: TAuthSliceType;
  canView: boolean;
  setCanView: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalHeader = ({
  selectedProjectName,
  projectList,
  setProject,
  auth,
  canView,
  setCanView
}: TProps): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // URLクエリパラメータを解析
  const { id: projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      const selectedProject = projectList.find(
        (project) => project.projectId === projectId
      );
      if (selectedProject) {
        setProject(selectedProject);
      } else {
        setProject(projectList[0]);
      }
    }
  }, [projectId, projectList, setProject]);

  const items: TMenuItem[] = [
    // {
    //   key: '1',
    //   label: `通知`,
    //   icon: (
    //     <StyledBellFilled
    //       style={{
    //         fontSize: 16,
    //         minWidth: 16
    //       }}
    //     />
    //   )
    // },
    {
      key: '2',
      label: selectedProjectName,
      children: projectList.map((project) => {
        return {
          key: project.projectId,
          label: project.name
        };
      })
    },
    {
      key: '3',
      label: `${auth.userName}さん`,
      children: [
        {
          key: 'ログアウト',
          label: 'ログアウト'
        }
      ]
    }
  ];

  const handleMenuClick = (e: { key: string }) => {
    switch (e.key) {
      case '1':
      case '2':
        break;
      case '3':
        navigate(`/login`);
        break;
      case 'ログアウト':
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/login');
        notification.success({
          message: 'ログアウトしました',
          description: `お疲れ様でした`,
          duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
        });
        break;
      default:
        const project = projectList.find((p) => p.projectId === e.key);
        setProject(project ? project : null);
        navigate(`/${e.key}/detail`);
        break;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            popupBg: Colors.MAIN
          }
        }
      }}
    >
      <StyledAntDHeader>
        <Flex align="center" gap={20}>
          <StyledIconFlex>
            <RxHamburgerMenu
              onClick={() => setCanView(!canView)}
              color={Colors.TEXT}
              fontSize={24}
              cursor={'pointer'}
            />
          </StyledIconFlex>
          <StyledLink to={'#'}>
            <Image
              preview={false}
              src="/assets/DevLog_header_logo.svg"
              alt="develog"
              width={152}
            />
          </StyledLink>
        </Flex>
        <StyledMenu mode="horizontal" items={items} onClick={handleMenuClick} />
      </StyledAntDHeader>
    </ConfigProvider>
  );
};

const StyledAntDHeader = styled(AntDHeader)`
  width: 100%;
  padding: 0 16px;
  height: ${LayoutNum.HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  .ant-menu-item {
    .ant-menu-title-content {
      margin-left: 2px !important;
    }
  }
`;

const StyledIconFlex = styled(Flex)`
  transition: background 0.3s ease;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background: rgba(255, 255, 255, 0.2); /* 半透明の白背景 */
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

// const StyledBellFilled = styled(BellFilled)`
//   width: 16px;
//   min-width: 16px;
// `;

const StyledMenu = styled(Menu)`
  &.ant-menu-title-content {
    margin-inline-start: 0;
    margin: 0;
  }
  &.custom-submenu-item {
    ${mixinMainColor}
  }
`;
