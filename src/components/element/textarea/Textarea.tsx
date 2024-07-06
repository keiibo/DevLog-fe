import React, { forwardRef } from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { TextAreaRef } from 'antd/es/input/TextArea';

type TProps = TextAreaProps & {
  autoSize?: boolean | { minRows?: number; maxRows?: number };
};

export const Textarea = forwardRef<TextAreaRef, TProps>(
  ({ autoSize, ...props }: TProps, ref): React.JSX.Element => {
    return <Input.TextArea {...props} autoSize={autoSize} ref={ref} />;
  }
);
