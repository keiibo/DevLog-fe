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
import { useNavigate } from 'react-router-dom';
import { Category } from '../elements/Category';

type TProps = {
  ticket: TTicket;
};

export const Ticket = ({ ticket }: TProps): React.JSX.Element => {
  const {
    ticketId,
    title,
    priority,
    limitStartYm,
    limitEndYm,
    labelColorType,
    categories
  } = ticket;

  const navigate = useNavigate();
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
            categories.map((category) => <Category category={category} />)
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
