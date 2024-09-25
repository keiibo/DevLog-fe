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
import dayjs from 'dayjs';
import { DateFormat } from '../../../../constant/DateFormat';
import { useNavigate } from 'react-router-dom';

type TProps = {
  note: TNote;
  searchTerm: string;
};

export const NoteListItem = ({
  note,
  searchTerm
}: TProps): React.JSX.Element => {
  const { title, uuid, createdAt, updatedAt } = note;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`edit/${uuid}`);
  };

  // 検索キーワードに該当する部分をハイライトする関数
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : part
    );
  };

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
            <StyledTitle>{highlightText(title, searchTerm)}</StyledTitle>
            <StyledDate>
              作成日:{dayjs(createdAt).format(DateFormat.SLASH)} 最終更新日:
              {dayjs(updatedAt).format(DateFormat.SLASH)}
            </StyledDate>
          </Flex>
        </Flex>
        <Popover trigger={'hover'} content={popoverContent} placement={'left'}>
          <StyledEllipsisOutlined style={{ fontSize: 16 }} />
        </Popover>
      </StyledFlex>
    </ConfigProvider>
  );
};

const StyledFlex = styled(Flex)`
  cursor: pointer;

  padding: 8px;
`;

const StyledTitle = styled.span`
  ${mixinTextColor}
  ${mixinNormalFontSize16px}
  mark {
    padding: 2px 4px;
    background-color: ${Colors.PURPLE}; 
    color: ${Colors.TEXT}; 
  }
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
