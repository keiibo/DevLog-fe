import React from 'react';
import { Input as AntDInput, Space } from 'antd';
import styled from 'styled-components';
import { Button } from '../button/Button';

type TProps = {
  defaultValue?: string | number;
  placeholder: string;
  width?: number;
  buttonText: string;
};

export const InputWithButton = ({
  defaultValue,
  placeholder,
  width,
  buttonText
}: TProps): React.JSX.Element => {
  return (
    <StyledCompact width={width}>
      <StyledAntDInput
        defaultValue={defaultValue}
        placeholder={placeholder}
        width={width ? width : 100}
      />
      <StyledButton type="primary">{buttonText}</StyledButton>
    </StyledCompact>
  );
};

const StyledCompact = styled(Space.Compact)<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
  display: flex;
  height: 100%;
`;

// Inputに対するスタイリング、flex-basisを使って幅を指定
const StyledAntDInput = styled(AntDInput)`
  flex: 6; // 全体の70%
`;

// Buttonに対するスタイリング
const StyledButton = styled(Button)`
  flex: 4; // 全体の30%
  box-shadow: none;
`;
