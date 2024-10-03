import React from 'react';
import { TStatus } from '../../types/TTicket';
import { getStatusStr } from '../../lib/status';
import { styled } from 'styled-components';
import {
  mixinBorderRadius8px,
  mixinNormalFontSize12px,
  mixinWhiteColor
} from '../../../../style/Mixin';
import { Status as StatusEnum } from '../../types/TTicket';
import { Colors } from '../../../../style/Colors';

type TProps = {
  status: TStatus;
};

export const Status = ({ status }: TProps): React.JSX.Element => {
  // ステータスに応じた背景色を決定する関数

  return <StyledStatus $status={status}>{getStatusStr(status)}</StyledStatus>;
};

const getBackgroundColor = (status: TStatus) => {
  switch (status) {
    case StatusEnum.NOT_STARTED:
      return Colors.LIGHT_GREEN;
    case StatusEnum.UNDER_CONSTRUCTION:
      return Colors.BLUE_ACCENT;
    case StatusEnum.COMPLETED:
      return Colors.PURPLE;
    default:
      return 'gray';
  }
};

const StyledStatus = styled.span<{ $status: TStatus }>`
  display: flex;
  justify-content: center;
  min-width: 44px;
  background-color: ${(props) => getBackgroundColor(props.$status)};
  padding: 2px 4px;
  ${mixinWhiteColor}
  ${mixinNormalFontSize12px}
  ${mixinBorderRadius8px}
`;
