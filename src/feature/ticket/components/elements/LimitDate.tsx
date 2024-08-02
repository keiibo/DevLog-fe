import { Flex } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { styled } from 'styled-components';
import { mixinNormalFontSize12px } from '../../../../style/Mixin';
import { DateFormat } from '../../../../constant/DateFormat';

type TProps = {
  limitStartYm?: string;
  limitEndYm?: string;
};

export const LimitDate = ({
  limitStartYm,
  limitEndYm
}: TProps): React.JSX.Element => {
  return (
    <Styled12px gap={4}>
      {limitStartYm && dayjs(limitStartYm).format(DateFormat.YYYYMMDD)}
      {(limitStartYm || limitEndYm) && <span>~</span>}
      {limitEndYm && dayjs(limitEndYm).format(DateFormat.YYYYMMDD)}
      {!limitStartYm && !limitEndYm && <span>期限日なし</span>}
    </Styled12px>
  );
};
const Styled12px = styled(Flex)`
  ${mixinNormalFontSize12px}
`;
