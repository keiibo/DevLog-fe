import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { mixinTextColor } from '../../../../style/Mixin';

type TProps = {
  value: string;
};

export const Preview = ({ value }: TProps): React.JSX.Element => {
  return (
    <StyledPreviewContainer>
      <StyledReactMarkdown>{value}</StyledReactMarkdown>
    </StyledPreviewContainer>
  );
};

const StyledPreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 600px; /* 必要に応じて高さを調整 */
  word-wrap: break-word; /* 長い単語も折り返し可能にする */
  word-break: break-word;
  overflow-y: auto; /* 縦方向にスクロール可能にする */
`;
const StyledReactMarkdown = styled(ReactMarkdown)`
  ${mixinTextColor}
  white-space: pre-wrap;
`;
