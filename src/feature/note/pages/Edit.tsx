import { Flex } from 'antd';
import React, { useState } from 'react';
import { ArrowBack } from '../../../components/composition/ArrowBack';
import { Input } from '../../../components/element/input/Input';
import { Textarea } from '../../../components/element/textarea/Textarea';
import styled from 'styled-components';
import { mixinBgMainLight, mixinTextColor } from '../../../style/Mixin';
import { Preview } from '../components/compositions/Preview';
import { useNavigate, useParams } from 'react-router-dom';

export const Edit = (): React.JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [textValue, setTextValue] = useState<string>('');

  /**
   * テキストエリアが更新された時の処理
   * stateの更新、保存apiをでバウンスで飛ばしたい
   */
  const handleTextareaChange = (text: string): void => {
    setTextValue(text);
  };

  return (
    <StyledFlexContainer vertical gap={8}>
      <ArrowBack
        handleBack={() => {
          navigate(`/${id}/note`);
          // 保存api処理
        }}
      />
      <StyledInput width={'100%'} placeholder="タイトルを入力" />
      <StyledEditAreaFlex gap={16}>
        <StyledEditFlex vertical gap={8}>
          <StyledTextarea
            value={textValue}
            autoSize
            onChange={(value) => handleTextareaChange(value.target.value)}
            style={{ fontFamily: 'monospace' }}
          />
          <StyledSaveText>※ テキストは自動保存されます</StyledSaveText>
        </StyledEditFlex>
        <Preview value={textValue} />
      </StyledEditAreaFlex>
    </StyledFlexContainer>
  );
};

const StyledFlexContainer = styled(Flex)`
  height: 100%;
`;

const StyledEditAreaFlex = styled(Flex)`
  height: 100%;
`;

const StyledInput = styled(Input)`
  ${mixinTextColor}
  ${mixinBgMainLight}
  &:focus,&:hover {
    ${mixinBgMainLight}
  }
`;

const StyledTextarea = styled(Textarea)`
  height: 100%;
  flex-grow: 1;
  ${mixinTextColor}
  ${mixinBgMainLight}
  &:focus,&:hover {
    ${mixinBgMainLight}
  }
`;
const StyledEditFlex = styled(Flex)`
  width: 400px;
  height: 100%;
`;

const StyledSaveText = styled.span`
  ${mixinTextColor}
`;
