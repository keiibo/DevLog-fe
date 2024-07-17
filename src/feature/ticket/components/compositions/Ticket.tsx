import React from 'react';
import { LabelColorType, TLabelColorType, TTicket } from '../../types/TTicket';
import { Flex } from 'antd';
import { styled } from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';
import { Colors } from '../../../../constant/Colors';
import { Priority } from '../elements/Priority';
import { Id } from '../elements/Id';
import { LimitDate } from '../elements/LimitDate';

type TProps = {
  ticket: TTicket;
};

export const Ticket = ({ ticket }: TProps): React.JSX.Element => {
  const {
    id,
    title,
    isDeletable,
    priority,
    limitStartYm,
    limitEndYm,
    labelColorType
  } = ticket;

  return (
    <StyledTicketFlexContainer borderColor={labelColorType}>
      <StyledFlex align="center" justify="space-between">
        <Flex align="center" gap={8}>
          <Id id={id} />
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
  borderColor: TLabelColorType;
}>`
  background-color: ${Colors.WHITE};
  flex-direction: column;

  padding: 8px;
  border-radius: 8px;
  border-left: 12px solid ${(props) => getBorderColor(props.borderColor)};
  box-shadow: 4px 4px 4px 0 ${Colors.TEXT};
`;

const StyledFlex = styled(Flex)`
  padding: 0 8px;
`;

const StyledTitle = styled.h4`
  font-size: 18px;
  margin: 0;
`;

const StyledIcon = styled.div`
  font-size: 18px;
  cursor: pointer;
`;
