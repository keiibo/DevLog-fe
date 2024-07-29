import { Flex, Image, Menu, MenuProps } from 'antd';
import { Header as AntDHeader } from 'antd/es/layout/layout';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TGetProjectRes } from '../../feature/dashboard/types/TProject';
import { LayoutNum } from '../../constant/LayoutNum';
// import { useAuth0 } from '@auth0/auth0-react';

type TMenuItem = Required<MenuProps>['items'][number];

type TProps = {
  selectedProjectName: string;
  projectList: TGetProjectRes[];
  setProject: React.Dispatch<React.SetStateAction<TGetProjectRes | null>>;
};

export const GlobalHeader = ({
  selectedProjectName,
  projectList,
  setProject
}: TProps): React.JSX.Element => {
  const navigate = useNavigate();

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
    { key: '3', label: 'ログイン' },
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
    { key: '1', label: 'menu1' }
  ];

  const handleMenuClick = (e: { key: string }) => {
    console.log(e);

    switch (e.key) {
      case '1':
      case '2':
        break;
      case '3':
        navigate(`/login`);
        break;
      default:
        console.log(projectList);

        const project = projectList.find((p) => p.projectId === e.key);
        setProject(project ? project : null);
        navigate(`/${e.key}/dashboard`);
        break;
    }
  };

  return (
    <StyledAntDHeader>
      <Flex align="center">
        <StyledLink to={'#'}>
          <Image
            preview={false}
            src="/src/assets/DevLog_header_logo.svg"
            alt="develog"
            width={152}
          />
        </StyledLink>
      </Flex>
      <Menu
        mode="horizontal"
        items={items}
        style={{
          width: '100%',
          direction: 'rtl'
        }}
        onClick={handleMenuClick}
      />
    </StyledAntDHeader>
  );
};

const StyledAntDHeader = styled(AntDHeader)`
  width: 100%;
  height: ${LayoutNum.HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;
