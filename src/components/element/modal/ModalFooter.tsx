import { Flex, Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

type TProps = {
  okButtonTitle: string;
  hasOkButton: boolean;
  handleOk: () => void;
  hasCancelIcon?: boolean;
  cancelButtonTitle?: string;
  handleCancel?: () => void;
};

export const ModalFooter = ({
  okButtonTitle,
  hasOkButton,
  hasCancelIcon = false,
  cancelButtonTitle = '',
  handleCancel,
  handleOk
}: TProps): React.JSX.Element => {
  return (
    <StyledFlex justify="center">
      {hasCancelIcon && (
        <Button type="primary" onClick={handleCancel}>
          {cancelButtonTitle}
        </Button>
      )}
      {hasOkButton && (
        <Button type="primary" onClick={handleOk}>
          {okButtonTitle}
        </Button>
      )}
    </StyledFlex>
  );
};
const StyledFlex = styled(Flex)`
  margin-top: 24px;
`;
