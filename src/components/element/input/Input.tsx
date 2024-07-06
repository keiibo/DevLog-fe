import React, { forwardRef } from 'react';
import { Input as AntDInput, InputProps, InputRef } from 'antd';
import styled from 'styled-components';

type TProps = InputProps & {
  defaultValue?: string | number;
  placeholder?: string;
  width?: number;
  style?: React.CSSProperties;
};

export const Input = forwardRef<InputRef, TProps>(
  (
    { defaultValue, placeholder, width, style, ...props }: TProps,
    ref
  ): React.JSX.Element => {
    return (
      <StyledAntDInput
        defaultValue={defaultValue}
        placeholder={placeholder}
        width={width}
        ref={ref}
        style={style}
        {...props}
      />
    );
  }
);

const StyledAntDInput = styled(AntDInput)`
  width: ${({ width }) => (width ? `${width}px` : '100px')};
`;
