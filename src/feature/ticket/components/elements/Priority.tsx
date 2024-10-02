import React from 'react';
import { Priority as PriorityEnum, TPriority } from '../../types/TTicket';
import { styled } from 'styled-components';
import { Colors } from '../../../../style/Colors';
import { Flex } from 'antd';

type TProps = {
  priority: TPriority;
};

export const Priority = ({ priority }: TProps): React.JSX.Element => {
  const getPriorityLabel = (priority: TPriority): string => {
    switch (priority) {
      case PriorityEnum.HIGH:
        return '高';
      case PriorityEnum.MEDIUM:
        return '中';
      case PriorityEnum.LOW:
        return '低';
      default:
        return '';
    }
  };
  return (
    <Flex gap={4}>
      優先度:
      <StyledSpan $priority={priority}>{getPriorityLabel(priority)}</StyledSpan>
    </Flex>
  );
};

const getPriorityColor = (priority: TPriority): string => {
  switch (priority) {
    case PriorityEnum.HIGH:
      return Colors.RED;
    default:
      return Colors.MAIN;
  }
};

const StyledSpan = styled.span<{ $priority: TPriority }>`
  white-space: nowrap;
  color: ${(props) => getPriorityColor(props.$priority)};
`;
