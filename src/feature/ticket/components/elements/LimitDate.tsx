import { Flex } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { styled } from 'styled-components';
import { mixinNormalFontSize12px } from '../../../../constant/Mixin';

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
      {limitStartYm && dayjs(limitStartYm).format('YYYY/MM/DD')}
      {(limitStartYm || limitEndYm) && <span>~</span>}
      {limitEndYm && dayjs(limitEndYm).format('YYYY/MM/DD')}
      {!limitStartYm && !limitEndYm && <span>期限日なし</span>}
    </Styled12px>
  );
};
const Styled12px = styled(Flex)`
  ${mixinNormalFontSize12px}
`;
