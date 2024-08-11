import { Flex } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { styled } from 'styled-components';
import {
  mixinDangerColor,
  mixinNormalFontSize12px
} from '../../../../style/Mixin';
import { DateFormat } from '../../../../constant/DateFormat';
import { isOverLimitDate } from '../../lib/limitDate';
import { FireFilled } from '@ant-design/icons';
import { Colors } from '../../../../style/Colors';

type TProps = {
  limitStartYm?: string;
  limitEndYm?: string;
};

export const LimitDate = ({
  limitStartYm,
  limitEndYm
}: TProps): React.JSX.Element => {
  return (
    <>
      <Styled12px gap={4}>
        {(isOverLimitDate(limitStartYm) || isOverLimitDate(limitEndYm)) && (
          <StyledFireFilled />
        )}
        <StyledSpan $isToday={isOverLimitDate(limitStartYm)}>
          {limitStartYm && dayjs(limitStartYm).format(DateFormat.SLASH)}
        </StyledSpan>
        {(limitStartYm || limitEndYm) && <span>~</span>}
        <StyledSpan $isToday={isOverLimitDate(limitEndYm)}>
          {limitEndYm && dayjs(limitEndYm).format(DateFormat.SLASH)}
        </StyledSpan>
        {!limitStartYm && !limitEndYm && <span>期限日なし</span>}
      </Styled12px>
    </>
  );
};
const Styled12px = styled(Flex)`
  ${mixinNormalFontSize12px}
`;
const StyledSpan = styled.span<{ $isToday: boolean }>`
  ${({ $isToday }) => ($isToday ? mixinDangerColor : '')}
`;

const StyledFireFilled = styled(FireFilled)`
  color: ${Colors.RED};
`;
