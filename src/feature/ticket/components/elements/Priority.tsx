import React from 'react';
import { Priority as PriorityEnum, TPriority } from '../../types/TTicket';
import { styled } from 'styled-components';
import { Colors } from '../../../../style/Colors';
import { Flex } from 'antd';
import { mixinNormalFontSize12px } from '../../../../style/Mixin';

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
    <Styled12px gap={4}>
      優先度:
      <StyledSpan $priority={priority}>{getPriorityLabel(priority)}</StyledSpan>
    </Styled12px>
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

const Styled12px = styled(Flex)`
  ${mixinNormalFontSize12px}
`;
const StyledSpan = styled.span<{ $priority: TPriority }>`
  color: ${(props) => getPriorityColor(props.$priority)};
`;
