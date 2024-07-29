import React from 'react';
import { LabelColorType, TLabelColorType, TTicket } from '../../types/TTicket';
import { Flex } from 'antd';
import { styled } from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';
import { Colors } from '../../../../constant/Colors';
import { Priority } from '../elements/Priority';
import { Id } from '../elements/Id';
import { LimitDate } from '../elements/LimitDate';
import {
  mixinBgWhite,
  mixinBorderRadius8px,
  mixinMainText,
  mixinMargin0,
  mixinNormalFontSize16px,
  mixinPadding8px
} from '../../../../constant/Mixin';

type TProps = {
  ticket: TTicket;
};

export const Ticket = ({ ticket }: TProps): React.JSX.Element => {
  const {
    ticketId,
    title,
    isDeletable,
    priority,
    limitStartYm,
    limitEndYm,
    labelColorType
  } = ticket;

  return (
    <StyledTicketFlexContainer vertical $borderColor={labelColorType}>
      <StyledFlex align="center" justify="space-between">
        <Flex align="center" gap={8}>
          <Id id={ticketId} />
          <Flex gap={8}>
            <StyledTitle>{title}</StyledTitle>
            <StyledIcon>{isDeletable && <DeleteOutlined />}</StyledIcon>
          </Flex>
        </Flex>
        <LimitDate limitStartYm={limitStartYm} limitEndYm={limitEndYm} />
      </StyledFlex>
      <StyledFlex justify="end">
        <Priority priority={priority}></Priority>
      </StyledFlex>
    </StyledTicketFlexContainer>
  );
};

const getBorderColor = (borderColor: TLabelColorType): string => {
  switch (borderColor) {
    case LabelColorType.BLUE:
      return Colors.BLUE_ACCENT;
    case LabelColorType.LIGHT_BLUE:
      return Colors.LIGHT_BLUE_ACCENT;
    case LabelColorType.RED:
      return Colors.RED;
    case LabelColorType.WHITE:
      return Colors.WHITE;
    default:
      return '';
  }
};

const StyledTicketFlexContainer = styled(Flex)<{
  $borderColor: TLabelColorType;
}>`
  border-left: 12px solid ${(props) => getBorderColor(props.$borderColor)};

  ${mixinBgWhite}
  ${mixinMainText}
  ${mixinBorderRadius8px}
  ${mixinPadding8px}
`;

const StyledFlex = styled(Flex)`
  padding: 0 8px;
`;

const StyledTitle = styled.h4`
  ${mixinNormalFontSize16px}
  ${mixinMargin0}
`;

const StyledIcon = styled.div`
  ${mixinNormalFontSize16px}
  cursor: pointer;
`;
