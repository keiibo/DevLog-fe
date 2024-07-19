import React from 'react';
import { Button as AntDButton } from 'antd';
import styled from 'styled-components';

type TProps = {
  onClick?: () => void; // クリックイベントの型定義
  children: React.ReactNode; // ボタンに表示する内容
  width?: string; // ボタンの幅
  height?: string;
  type: 'primary' | 'default' | 'dashed' | 'link' | 'text';
};

export const Button = ({
  onClick,
  children,
  width,
  height,
  type = 'default' // デフォルトタイプを'default'に設定
}: TProps): React.JSX.Element => {
  return (
    <StyledButton onClick={onClick} type={type} width={width} height={height}>
      {children}
    </StyledButton>
  );
};

type StyledButtonProps = {
  width?: string; // width プロパティはオプショナル
  height?: string;
};
const StyledButton = styled(AntDButton)<StyledButtonProps>`
  width: ${({ width }) => width || 'auto'}; // width が指定されていなければ自動
  height: ${({ height }) => height || 'auto'};
`;
