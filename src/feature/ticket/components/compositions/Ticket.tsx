import React from 'react';
import { TLabelColorType, TTicket } from '../../types/TTicket';
import { Flex } from 'antd';
import { styled } from 'styled-components';
import { Priority } from '../elements/Priority';
import { LimitDate } from '../elements/LimitDate';
import {
  mixinBgWhite,
  mixinBorderRadius8px,
  mixinMainColor,
  mixinPadding8px
} from '../../../../style/Mixin';
import { TicketTitle } from './TicketTitle';
import { getLabelColor } from '../../lib/labelColor';
import { useNavigate } from 'react-router-dom';

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
    labelColorType
  } = ticket;

  const navigate = useNavigate();
  const handleTicketClick = () => {
    navigate(ticketId);
  };

  return (
    <StyledTicketFlexContainer
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
      <StyledFlex justify="end">
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
  ${mixinBorderRadius8px}
  ${mixinPadding8px}
`;

const StyledFlex = styled(Flex)`
  padding: 0 8px;
`;
