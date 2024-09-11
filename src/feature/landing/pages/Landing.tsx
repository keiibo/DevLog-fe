import React from 'react';
import { ThemeSection } from '../../../components/composition/themeSection/ThemeSection';
import { styled } from 'styled-components';
import { themeSectionData } from '../../../constant/ThemeSectionData';
import { Flex, Image } from 'antd';
import { Colors } from '../../../style/Colors';
import { Button } from '../../../components/element/button/Button';
import { InputWithButton } from '../../../components/element/input/InputWithButton';
import { Typewriter } from '../components/Typewriter';
import { useNavigate } from 'react-router-dom';
import {
  mixinBgMain,
  mixinBoldFontSize40px,
  mixinMargin0,
  mixinWhiteColor
} from '../../../style/Mixin';

/**
 * LP画面
 */
export const Landing = (): React.JSX.Element => {
  const navigate = useNavigate();
  return (
    <StyledContainer vertical gap={120}>
      <StyledWrapper vertical gap={120}>
        <Flex align="center" gap={234}>
          <Flex vertical gap={24}>
            <Image preview={false} src="/assets/Develog.svg" />
            <Typewriter text="コーディングの旅を記録し、シェアしよう。" />
          </Flex>
          <Image preview={false} src="/assets/files.png" />
        </Flex>
        <Flex vertical gap={64}>
          {themeSectionData.map((theme) => (
            <ThemeSection
              imageUrl={theme.imageUrl}
              imageAlt={theme.imageAlt}
              title={theme.title}
              description={theme.description}
            />
          ))}
        </Flex>
        <Flex vertical gap={24}>
          <StyledH2>
            さぁ、<span>仲間</span>を探す旅に出かけよう
          </StyledH2>
          <StyledInputContainer gap={12} align="center">
            <InputWithButton
              placeholder={'メールアドレス'}
              width={720}
              buttonText={'登録'}
            />
            <p>または</p>
            <Button
              type="primary"
              onClick={() => navigate('/login')}
              width="120px"
            >
              ログイン
            </Button>
          </StyledInputContainer>
        </Flex>
      </StyledWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled(Flex)`
  padding: 48px 0;

  ${mixinBgMain}
`;
const StyledWrapper = styled(Flex)`
  margin: 0 auto;
`;

const StyledH2 = styled.h2`
  letter-spacing: 4%;
  span {
    background: linear-gradient(
      to right,
      ${Colors.LIGHT_BLUE_ACCENT},
      ${Colors.PURPLE}
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  ${mixinBoldFontSize40px}
  ${mixinMargin0}
  ${mixinWhiteColor}
`;

const StyledInputContainer = styled(Flex)``;
