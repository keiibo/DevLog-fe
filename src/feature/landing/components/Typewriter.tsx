// Typewriter.jsx
import React from 'react';
import { styled } from 'styled-components';
import { Colors } from '../../../constant/Colors';

type TProps = {
  text: string;
};

export const Typewriter = ({ text }: TProps): React.JSX.Element => {
  return (
    <StyledTypewriterContainer>
      <StyledTypewriter totalSteps={text.length * 1.3}>{text}</StyledTypewriter>
    </StyledTypewriterContainer>
  );
};
const StyledTypewriterContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${Colors.TEXT};
`;
const StyledTypewriter = styled.div<{ totalSteps: number }>`
  width: ${({ totalSteps }) =>
    `${totalSteps}ch`}; /* ch 単位でカーソルの幅を文字数に応じて設定 */
  animation:
    typing ${({ totalSteps }) => totalSteps * 0.1}s 2s
      steps(${({ totalSteps }) => totalSteps}, end) forwards,
    effect 0.8s step-end infinite;
  opacity: 0;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  font-family: monospace;
  @keyframes typing {
    0% {
      width: 0;
      opacity: 0;
    }
    1% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes effect {
    50% {
      border-color: transparent;
    }
  }
`;
