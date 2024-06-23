import { Flex } from 'antd';
import { Header as AntDHeader } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../constant/Colors';
import { Link } from 'react-router-dom';

type TMenu = {
  key: number;
  label: string;
};

type TStyledMenuItemProps = {
  isSelected: boolean;
};

export const GlobalHeader = (): React.JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<TMenu | null>(null);
  const items = [
    {
      key: 1,
      label: 'menu1'
    },
    {
      key: 2,
      label: 'menu1'
    },
    {
      key: 3,
      label: 'menu1'
    }
  ];
  return (
    <StyledAntDHeader>
      <StyledImageContainer>
        <StyledLink to={''}>
          <img src="src/assets/DeveLog.png" alt="develog" width={152} />
        </StyledLink>
      </StyledImageContainer>
      <Flex gap={32}>
        {items.map((item) => (
          <StyledMenuItem
            key={item.key}
            onClick={() => setSelectedItem(item)}
            isSelected={selectedItem?.key === item.key}
          >
            {item.label}
          </StyledMenuItem>
        ))}
      </Flex>
    </StyledAntDHeader>
  );
};

const StyledAntDHeader = styled(AntDHeader)`
  background-color: ${Colors.MAIN};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMenuItem = styled.a<TStyledMenuItemProps>`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.TEXT};
  transition:
    color 0.4s,
    text-shadow 0.4s;
  border-bottom: ${({ isSelected }) =>
    isSelected ? `1px solid ${Colors.TEXT}` : 'none'}; // 選択時にボーダーを表示

  &:hover {
    color: ${Colors.WHITE};
    text-shadow: 0px 8px 8px rgba(244, 245, 247, 1);
  }
`;
