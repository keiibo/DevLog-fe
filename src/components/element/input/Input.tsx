import React from 'react';
import { Input as AntDInput } from 'antd';
import styled from 'styled-components';

type TProps = {
  defaultValue?: string | number;
  placeholder: string;
  width?: number;
};

export const Input = ({
  defaultValue,
  placeholder,
  width
}: TProps): React.JSX.Element => {
  return (
    <StyledAntDInput
      defaultValue={defaultValue}
      placeholder={placeholder}
      width={width}
    />
  );
};

const StyledAntDInput = styled(AntDInput)`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
`;
