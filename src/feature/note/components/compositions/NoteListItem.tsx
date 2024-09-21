import { ConfigProvider, Flex, Menu, Popover } from 'antd';
import React from 'react';
import { NoteIcon } from '../elements/NoteIcon';
import { EllipsisOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import {
  mixinNormalFontSize12px,
  mixinNormalFontSize16px,
  mixinTextColor
} from '../../../../style/Mixin';
import { Colors } from '../../../../style/Colors';
import { TNote } from '../../types/TNote';

type TProps = {
  note: TNote;
};

export const NoteListItem = ({ note }: TProps): React.JSX.Element => {
  const { title, createdAt, updateAt } = note;
  const handleClick = () => {};
  const popoverContent = (
    <StyledMenu
      items={[
        {
          key: 'delete',
          label: '削除',
          type: 'item'
        }
      ]}
    />
  );
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemColor: Colors.MAIN,
            itemActiveBg: Colors.TEXT,
            itemSelectedBg: Colors.TEXT,
            itemBorderRadius: 8,
            groupTitleColor: Colors.MAIN,
            groupTitleFontSize: 16,
            itemHeight: 24
          }
        }
      }}
    >
      <StyledFlex justify="space-between" align="center" onClick={handleClick}>
        <Flex align="center" gap={16}>
          <NoteIcon />
          <Flex vertical gap={4}>
            <StyledTitle>{title}</StyledTitle>
            <StyledDate>
              作成日:{createdAt} 最終更新日:{updateAt}
            </StyledDate>
          </Flex>
        </Flex>
        <Popover trigger={'hover'} content={popoverContent} placement={'left'}>
          <StyledEllipsisOutlined />
        </Popover>
      </StyledFlex>
    </ConfigProvider>
  );
};

const StyledFlex = styled(Flex)`
  cursor: pointer;
`;

const StyledTitle = styled.span`
  ${mixinTextColor}
  ${mixinNormalFontSize16px}
`;

const StyledDate = styled.span`
  ${mixinTextColor}
  ${mixinNormalFontSize12px}
`;

const StyledEllipsisOutlined = styled(EllipsisOutlined)`
  cursor: pointer;
  ${mixinTextColor}
`;

const StyledMenu = styled(Menu)`
  flex: auto;
  background-color: transparent;
`;
