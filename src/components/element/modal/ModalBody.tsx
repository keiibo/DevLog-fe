import React from 'react';

type TProps = {
  children: React.ReactNode;
};

export const ModalBody = (props: TProps): React.JSX.Element => {
  return <div>{props.children}</div>;
};
