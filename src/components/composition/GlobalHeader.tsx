import { Flex, Image } from 'antd';
import { Header as AntDHeader } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../constant/Colors';
import { Link } from 'react-router-dom';
import { RootPath } from '../../constant/RootPath';
// import { useAuth0 } from '@auth0/auth0-react';

type TMenu = {
  key: number;
  label: string;
};

type TStyledMenuItemProps = {
  $isSelected: boolean;
};

export const GlobalHeader = (): React.JSX.Element => {
  const items = [
    {
      key: 1,
      label: 'menu1',
      path: '',
      onClick: (item: TMenu) => {
        setSelectedItem(item);
      }
    },
    {
      key: 2,
      label: 'menu2',
      path: '',
      onClick: (item: TMenu) => {
        setSelectedItem(item);
      }
    },
    {
      key: 3,
      label: 'ログイン',
      path: 'login',
      onClick: (item: TMenu) => {
        //  TODO.Login
        setSelectedItem(item);
        // loginWithRedirect();
      }
    }
  ];
  const [selectedItem, setSelectedItem] = useState<TMenu>(items[0]);
  // const { loginWithRedirect } = useAuth0();
  return (
    <StyledAntDHeader>
      <StyledImageContainer>
        <StyledLink to={'#'}>
          <Image
            preview={false}
            src="src/assets/DeveLog.png"
            alt="develog"
            width={152}
          />
        </StyledLink>
      </StyledImageContainer>
      <Flex gap={32}>
        {items.map((item) => (
          <StyledMenuItem
            to={`${RootPath.ROOT_PATH}/${item.path}`}
            key={item.key}
            onClick={() => item.onClick(item)}
            $isSelected={selectedItem?.key === item.key}
          >
            {item.label}
          </StyledMenuItem>
        ))}
      </Flex>
    </StyledAntDHeader>
  );
};

const StyledAntDHeader = styled(AntDHeader)`
  width: 100%;
  background-color: ${Colors.MAIN};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 100;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMenuItem = styled(Link)<TStyledMenuItemProps>`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.TEXT};
  transition:
    color 0.4s,
    text-shadow 0.4s;
  border-bottom: ${({ $isSelected }) =>
    $isSelected
      ? `1px solid ${Colors.TEXT}`
      : 'none'}; // 選択時にボーダーを表示

  &:hover {
    color: ${Colors.WHITE};
    text-shadow: 0px 8px 8px rgba(244, 245, 247, 1);
  }
`;
