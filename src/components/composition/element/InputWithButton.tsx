import React from 'react';
import { Input as AntDInput, Space } from 'antd';
import styled from 'styled-components';
import { Button } from './Button';

type TProps = {
  defaultValue?: string | number;
  placeholder: string;
  width?: number;
};

export const InputWithButton = ({
  defaultValue,
  placeholder,
  width
}: TProps): React.JSX.Element => {
  return (
    <Space.Compact>
      <StyledAntDInput
        defaultValue={defaultValue}
        placeholder={placeholder}
        width={width ? width * 0.7 : undefined}
      />
      <StyledButton type="primary">Submit</StyledButton>
    </Space.Compact>
  );
};

// Inputに対するスタイリング、flex-basisを使って幅を指定
const StyledAntDInput = styled(AntDInput)<{ width?: number }>`
  flex: 7; // 全体の70%
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
`;

// Buttonに対するスタイリング
const StyledButton = styled(Button)`
  flex: 3; // 全体の30%
`;
