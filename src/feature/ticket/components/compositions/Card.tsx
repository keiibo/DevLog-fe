import React from 'react';
import { TLabelColorType, TTicket } from '../../types/TTicket';
import { Flex } from 'antd';
import { styled } from 'styled-components';
import { Priority } from '../elements/Priority';
import { LimitDate } from '../elements/LimitDate';
import {
  mixinBorderRadius4px,
  mixinMainColor,
  mixinMargin0
} from '../../../../style/Mixin';
import { getLabelColor } from '../../lib/labelColor';
import { useNavigate, useParams } from 'react-router-dom';
import { Category } from '../elements/Category';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api/category';
import { Loading } from '../../../../components/element/loading/Loading';
import { Colors } from '../../../../style/Colors';
import { QueryKey } from '../../../../constant/QueryKey';
import { Id } from '../elements/Id';
import { Status } from '../elements/Status';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HolderOutlined } from '@ant-design/icons';

type TProps = {
  ticket: TTicket;
  searchedValue: string;
};

export const Card = ({ ticket, searchedValue }: TProps): React.JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isDragging,
    // 並び替えのつまみ部分に設定するプロパティ
    setActivatorNodeRef,
    attributes,
    listeners,
    // DOM全体に対して設定するプロパティ
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: ticket.id });
  const { data } = useQuery({
    queryKey: [QueryKey.CATEGORY_LIST],
    queryFn: () => getCategories(id || '')
  });

  if (!data) {
    return <Loading />;
  }

  const {
    ticketId,
    title,
    priority,
    status,
    limitStartYm,
    limitEndYm,
    labelColorType,
    categories
  } = ticket;

  const handleTicketClick = () => {
    navigate(ticketId);
  };

  // ハイライト関数を追加
  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight) {
      return text;
    }

    // 正規表現の特殊文字をエスケープ
    const escapeRegExp = (string: string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const escapedHighlight = escapeRegExp(highlight);
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <HighlightSpan key={index}>{part}</HighlightSpan>
      ) : (
        part
      )
    );
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <StyledTicketFlexContainer
      gap={4}
      vertical
      $borderColor={labelColorType}
      onClick={() => handleTicketClick()}
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
    >
      <StyledFlex justify="space-between" ref={setActivatorNodeRef} gap={4}>
        {/* つまみ部分 */}
        <HolderOutlined
          ref={setActivatorNodeRef}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          {...attributes}
          {...listeners}
        />
        <StyledLeftContent gap={8}>
          <Flex vertical gap={4}>
            <Id id={ticketId} />
          </Flex>
          <StyledTitleFlex vertical gap={4}>
            <StyledTitle>
              {getHighlightedText(title, searchedValue)}
            </StyledTitle>
            <Flex gap={4}>
              {categories &&
                categories.length > 0 &&
                (() => {
                  // 条件に合致するカテゴリをフィルタリング
                  const filteredCategories = categories.filter((category) =>
                    data.find((d) => d.uuid === category.uuid)
                  );

                  // 最初の5件を取得
                  const displayedCategories = filteredCategories.slice(0, 5);

                  // 5件以上あるかを判定
                  const hasMoreCategories = filteredCategories.length > 5;

                  return (
                    <>
                      {displayedCategories.map((category) => (
                        <Category key={category.uuid} category={category} />
                      ))}
                      {hasMoreCategories && <span>...</span>}
                    </>
                  );
                })()}
            </Flex>
          </StyledTitleFlex>
        </StyledLeftContent>

        <Flex vertical gap={4} align="end">
          <LimitDate limitStartYm={limitStartYm} limitEndYm={limitEndYm} />
          <Flex gap={8}>
            <Status status={status} />
            <Priority priority={priority} />
          </Flex>
        </Flex>
      </StyledFlex>
    </StyledTicketFlexContainer>
  );
};

const StyledTicketFlexContainer = styled(Flex)<{
  $borderColor: TLabelColorType;
  $isDragging: boolean;
}>`
  position: relative; /* 疑似要素の基準点とする */
  padding: 6px 4px;
  cursor: pointer;
  z-index: ${(props) => (props.$isDragging ? 1000 : 10)};
  background-color: ${(props) =>
    props.$isDragging ? '#ffc3e1de' : Colors.WHITE}; /* お好みの色に変更 */

  ${mixinMainColor}
  ${mixinBorderRadius4px}
  &&:hover {
    border: 2px solid ${Colors.MAIN}4A;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px; /* 左の線の太さ */
    background-color: ${(props) =>
      getLabelColor(props.$borderColor)}; /* 背景色はpropsから */
  }
`;

const StyledFlex = styled(Flex)`
  padding: 0 8px;
`;

const StyledLeftContent = styled(Flex)`
  flex: 1;
  min-width: 0;
  gap: 8px;
`;

const StyledTitle = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1; // 追加

  ${mixinMargin0}
`;

const StyledTitleFlex = styled(Flex)`
  flex: 1;
  overflow: hidden;
  min-width: 0;
`;
const HighlightSpan = styled.span`
  background-color: ${Colors.PURPLE}6a;
`;
