import React from 'react';
import { TLabelColorType, TTicket } from '../../types/TTicket';
import { Flex } from 'antd';
import { styled } from 'styled-components';
import { Priority } from '../elements/Priority';
import { LimitDate } from '../elements/LimitDate';
import {
  mixinBgWhite,
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

type TProps = {
  ticket: TTicket;
};

export const TicketListItem = ({ ticket }: TProps): React.JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <StyledTicketFlexContainer
      gap={4}
      vertical
      $borderColor={labelColorType}
      onClick={() => handleTicketClick()}
    >
      <StyledFlex justify="space-between">
        <StyledLeftContent gap={8}>
          <Flex vertical gap={4}>
            <Id id={ticketId} />
          </Flex>
          <StyledTitleFlex vertical gap={4}>
            <StyledTitle>{title}</StyledTitle>
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
}>`
  position: relative; /* 疑似要素の基準点とする */
  padding: 6px 8px;
  cursor: pointer;
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

  ${mixinBgWhite}
  ${mixinMainColor}
  ${mixinBorderRadius4px}
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
