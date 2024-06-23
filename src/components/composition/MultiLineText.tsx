import React from 'react';

type TProps = {
  text: string;
};

export const MultiLineText = ({ text }: TProps): React.JSX.Element => {
  const formattedText = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return <div>{formattedText}</div>;
};
