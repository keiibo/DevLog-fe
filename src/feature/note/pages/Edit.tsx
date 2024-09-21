import { Flex } from 'antd';
import React, { useState } from 'react';
import { ArrowBack } from '../../../components/composition/ArrowBack';
import { Input } from '../../../components/element/input/Input';
import { Textarea } from '../../../components/element/textarea/Textarea';
import styled from 'styled-components';
import { mixinBgMainLight, mixinTextColor } from '../../../style/Mixin';
import { Preview } from '../components/compositions/Preview';

export const Edit = (): React.JSX.Element => {
  const [textValue, setTextValue] = useState<string>('');

  /**
   * テキストエリアが更新された時の処理
   * stateの更新、保存apiをでバウンスで飛ばしたい
   */
  const handleTextareaChange = (text: string): void => {
    setTextValue(text);
  };

  return (
    <Flex vertical gap={8}>
      <ArrowBack handleBack={() => {}} />
      <StyledInput width={'100%'} placeholder="タイトルを入力" />
      <Flex gap={16}>
        <StyledEditFlex vertical gap={8}>
          <StyledTextarea
            value={textValue}
            onChange={(value) => handleTextareaChange(value.target.value)}
            style={{ fontFamily: 'monospace' }}
          />
          <StyledSaveText>※ テキストは自動保存されます</StyledSaveText>
        </StyledEditFlex>
        <Preview value={textValue} />
      </Flex>
    </Flex>
  );
};

const StyledInput = styled(Input)`
  ${mixinTextColor}
  ${mixinBgMainLight}
  &:focus,&:hover {
    ${mixinBgMainLight}
  }
`;

const StyledTextarea = styled(Textarea)`
  height: 100%;
  ${mixinTextColor}
  ${mixinBgMainLight}
  &:focus,&:hover {
    ${mixinBgMainLight}
  }
`;
const StyledEditFlex = styled(Flex)`
  width: 400px;
`;

const StyledSaveText = styled.span`
  ${mixinTextColor}
`;
