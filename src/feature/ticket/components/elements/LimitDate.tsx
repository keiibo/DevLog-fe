import { Flex } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { styled } from 'styled-components';
import { mixinDangerColor } from '../../../../style/Mixin';
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
      <Flex gap={4}>
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
        {!limitStartYm && !limitEndYm && (
          <Flex gap={4}>
            期限日:
            <StyledSpan>無</StyledSpan>
          </Flex>
        )}
      </Flex>
    </>
  );
};
const StyledSpan = styled.span<{ $isToday?: boolean }>`
  white-space: nowrap;
  ${({ $isToday }) => ($isToday ? mixinDangerColor : '')}
`;

const StyledFireFilled = styled(FireFilled)`
  color: ${Colors.RED};
`;
