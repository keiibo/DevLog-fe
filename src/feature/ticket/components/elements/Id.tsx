import React from 'react';
import { styled } from 'styled-components';
import { mixinTextColor } from '../../../../style/Mixin';
import { Tooltip, message } from 'antd';
import { Colors } from '../../../../style/Colors';

type TProps = {
  id: string;
};

export const Id = ({ id }: TProps): React.JSX.Element => {
  const handleCopy = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    // 画面上の既存のテキスト選択をクリア
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }

    // Shiftキーを押しながらクリックした場合のみ実行
    if (event.shiftKey) {
      navigator.clipboard.writeText(`#${id}`);
      message.success(`コピー：#${id}`);
    }
  };
  return (
    <Tooltip title="Shift + クリックでIDをコピー">
      <StyledId onClick={handleCopy}>#{id}</StyledId>
    </Tooltip>
  );
};
const StyledId = styled.span`
  ${mixinTextColor}
  width: fit-content;
  cursor: pointer;
  white-space: nowrap;
  &&:hover {
    background-color: ${Colors.TEXT_DARK}1a;
    border-radius: 4px;
  }
`;
