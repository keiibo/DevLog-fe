import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { mixinTextColor } from '../../../../style/Mixin';

type TProps = {
  value: string;
};

export const Preview = ({ value }: TProps): React.JSX.Element => {
  return <StyledReactMarkdown>{value}</StyledReactMarkdown>;
};

const StyledReactMarkdown = styled(ReactMarkdown)`
  ${mixinTextColor}
`;
