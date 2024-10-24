import { Flex } from 'antd';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Card } from '../Card';
import { Priority, TTicket } from '../../../types/TTicket';
import {
  HowToSortQueryType,
  SortQueryCategoryType
} from '../../../types/TQuery';
import { useSearchParams } from 'react-router-dom';
import { closestCenter, DndContext, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

type TProps = {
  id: string;
  ticketList: TTicket[];
  isOpen: boolean;
  searchValue: string;
};

export const Column = ({
  id,
  ticketList,
  isOpen,
  searchValue
}: TProps): React.JSX.Element => {
  const [searchParams, _] = useSearchParams();
  const querySortType = searchParams.get('sort');
  const queryCategory = searchParams.get('category');
  const { setNodeRef } = useDroppable({ id: id });

  // 優先度を数値にマッピングする関数
  const priorityToNumber = (priority: string): number => {
    switch (priority) {
      case Priority.HIGH:
        return 1;
      case Priority.MEDIUM:
        return 2;
      case Priority.LOW:
        return 3;
      default:
        return 4; // 未知の値は最低優先度とする
    }
  };
  // ソート
  const sortTicketList = (list: TTicket[]): TTicket[] => {
    // クエリパラメータから条件を取得する
    // 条件未設定の場合はそのまま返す
    if (!queryCategory || !querySortType) return list;
    return list.sort((a, b) => {
      let result = 0;
      switch (queryCategory) {
        case SortQueryCategoryType.CREATE_AT:
          // createdAtが存在しない場合の処理
          if (!a.createdAt) return 1; // aがnullならbを前に
          if (!b.createdAt) return -1; // bがnullならaを前に

          const createdAtA = new Date(a.createdAt);
          const createdAtB = new Date(b.createdAt);
          result = createdAtA.getTime() - createdAtB.getTime();
          break;

        case SortQueryCategoryType.LIMIT_DATE:
          if (!a.limitEndYm) return 1; // aがnullならbを前に
          if (!b.limitEndYm) return -1; // bがnullならaを前に

          const dateA = new Date(a.limitEndYm);
          const dateB = new Date(b.limitEndYm);
          result = dateA.getTime() - dateB.getTime();
          break;
        case SortQueryCategoryType.PRIORITY:
          const priorityA = priorityToNumber(a.priority);
          const priorityB = priorityToNumber(b.priority);
          result = priorityA - priorityB;
          break;
        default:
          return 0;
      }
      return querySortType === HowToSortQueryType.DESCENDING ? -result : result;
    });
  };
  const [items, setItems] = useState<TTicket[]>(sortTicketList(ticketList));

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={(event) => {
        const { active, over } = event;
        if (over == null || active.id === over.id) {
          return;
        }
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);
      }}
    >
      <SortableContext items={items}>
        <StyledTicketList
          vertical
          gap={2}
          $show={isOpen} // 開閉状態に基づく表示
          $height={ticketList.length || 0}
          ref={setNodeRef}
        >
          {items.map((ticket) => (
            <Card
              ticket={ticket}
              key={ticket.ticketId}
              searchedValue={searchValue}
            />
          ))}
        </StyledTicketList>
      </SortableContext>
    </DndContext>
  );
};

const StyledTicketList = styled(Flex)<{ $show: boolean; $height: number }>`
  padding-left: 32px;
  /* 70は1チケットあたりの高さ */
  max-height: ${(props) => (props.$show ? `${props.$height * 70}px` : '0')};
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
`;
