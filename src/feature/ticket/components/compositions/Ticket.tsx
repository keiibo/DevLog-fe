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
  mixinPadding8px
} from '../../../../style/Mixin';
import { TicketTitle } from './TicketTitle';
import { getLabelColor } from '../../lib/labelColor';
import { useNavigate, useParams } from 'react-router-dom';
import { Category } from '../elements/Category';
import { useQuery } from 'react-query';
import { getCategories } from '../../api/category';
import { Loading } from '../../../../components/element/loading/Loading';

type TProps = {
  ticket: TTicket;
};

export const Ticket = ({ ticket }: TProps): React.JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery('category', () => getCategories(id || ''));

  if (!data) {
    return <Loading />;
  }

  const {
    ticketId,
    title,
    priority,
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
      gap={8}
      vertical
      $borderColor={labelColorType}
      onClick={() => handleTicketClick()}
    >
      <StyledFlex align="center" justify="space-between">
        <TicketTitle
          id={ticketId}
          title={title}
          isDeletable={false}
          mode="list"
          labelColorType={labelColorType}
        />
        <LimitDate limitStartYm={limitStartYm} limitEndYm={limitEndYm} />
      </StyledFlex>
      <StyledFlex justify="space-between">
        <StyledCategoryFlex gap={4}>
          {categories && categories.length > 0 ? (
            categories.map((category) => {
              if (data.find((d) => d.uuid === category.uuid)) {
                return <Category key={category.uuid} category={category} />;
              } else {
                return <div key={category.uuid} style={{ flex: 1 }}></div>;
              }
            })
          ) : (
            <div style={{ flex: 1 }}></div>
          )}
        </StyledCategoryFlex>
        <Priority priority={priority}></Priority>
      </StyledFlex>
    </StyledTicketFlexContainer>
  );
};

const StyledTicketFlexContainer = styled(Flex)<{
  $borderColor: TLabelColorType;
}>`
  border-left: 12px solid ${(props) => getLabelColor(props.$borderColor)};
  cursor: pointer;
  ${mixinBgWhite}
  ${mixinMainColor}
  ${mixinBorderRadius4px}
  ${mixinPadding8px}
`;

const StyledFlex = styled(Flex)`
  padding: 0 8px;
`;

const StyledCategoryFlex = styled(Flex)`
  padding-left: 88px;
`;
