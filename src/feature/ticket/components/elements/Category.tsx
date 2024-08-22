import React from 'react';
import styled from 'styled-components';
import {
  mixinBgText,
  mixinBorderRadius8px,
  mixinNormalFontSize12px,
  mixinTextDarkColor,
  mixinWhiteColor
} from '../../../../style/Mixin';
import { CloseCircleFilled } from '@ant-design/icons';

type TProps = {
  label: string;
  isDeletable: boolean;
};

export const Category = ({ label, isDeletable }: TProps): React.JSX.Element => {
  return (
    <StyledCategoryContainer>
      {label}
      {isDeletable && <StyledDeleteButton />}
    </StyledCategoryContainer>
  );
};

const StyledCategoryContainer = styled.div`
  position: relative; /* 必須: 削除ボタンを絶対位置で配置するために必要 */
  display: inline-block; /* コンテナのサイズをコンテンツに合わせる */
  width: fit-content;
  height: fit-content;
  padding: 2px 4px;
  ${mixinNormalFontSize12px}
  ${mixinBorderRadius8px}
  ${mixinBgText}
  ${mixinWhiteColor}
`;

const StyledDeleteButton = styled(CloseCircleFilled)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  cursor: pointer; /* ボタンにカーソルを表示 */
  ${mixinTextDarkColor}
`;
