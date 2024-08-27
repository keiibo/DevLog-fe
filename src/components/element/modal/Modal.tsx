import React from 'react';
import { Modal as AntDModal, ModalProps } from 'antd';
import { styled } from 'styled-components';
import { mixinPadding24px } from '../../../style/Mixin';

type TProps = ModalProps & {
  hasCloseIcon?: boolean;
};

export const Modal = ({
  hasCloseIcon = false,
  ...props
}: TProps): React.JSX.Element => {
  return <StyledModal {...props}>{props.children}</StyledModal>;
};

const StyledModal = styled(AntDModal)`
  ${mixinPadding24px}
`;
