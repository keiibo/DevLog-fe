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
import { TCategory } from '../../types/TTicket';

type TProps = {
  category: TCategory;
  isDeletable?: boolean;
  setCategories?: React.Dispatch<React.SetStateAction<TCategory[]>>;
};

export const Category = ({
  category,
  isDeletable = false,
  setCategories
}: TProps): React.JSX.Element => {
  return (
    <StyledCategoryContainer>
      {category.name}
      {isDeletable && (
        <StyledDeleteButton
          onClick={() => {
            if (setCategories) {
              setCategories((prev) => {
                return prev.filter((cate) => cate.uuid !== category.uuid);
              });
            }
          }}
        />
      )}
    </StyledCategoryContainer>
  );
};

const StyledCategoryContainer = styled.div`
  position: relative; /* 必須: 削除ボタンを絶対位置で配置するために必要 */
  display: inline-block; /* コンテナのサイズをコンテンツに合わせる */
  min-width: fit-content;
  text-align: center;
  width: fit-content;
  height: fit-content;
  white-space: nowrap;
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
