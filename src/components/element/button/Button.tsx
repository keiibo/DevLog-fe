import React from 'react';
import { Button as AntDButton } from 'antd';
import styled from 'styled-components';
import { ButtonHTMLType, ButtonProps } from 'antd/es/button';

type TProps = ButtonProps & {
  onClick?: () => void; // クリックイベントの型定義
  children: React.ReactNode; // ボタンに表示する内容
  width?: string; // ボタンの幅
  height?: string;
  htmlType?: ButtonHTMLType;
  type: 'primary' | 'default' | 'dashed' | 'link' | 'text';
};

export const Button = ({
  onClick,
  children,
  width,
  height,
  htmlType,
  type = 'default', // デフォルトタイプを'default'に設定
  ...restProps
}: TProps): React.JSX.Element => {
  return (
    <StyledButton
      onClick={onClick}
      htmlType={htmlType}
      type={type}
      width={width}
      height={height}
      {...restProps}
    >
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
