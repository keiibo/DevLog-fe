import React from 'react';
import { ThemeSection } from '../../../components/composition/ThemeSection';
import { styled } from 'styled-components';
import { themeSectionData } from '../../../constant/ThemeSectionData';
import { Image } from 'antd';
import { Colors } from '../../../constant/Colors';
import { Input } from '../../../components/composition/element/Input';
import { Button } from '../../../components/composition/element/Button';
import { InputWithButton } from '../../../components/composition/element/InputWithButton';

/**
 * LP画面
 */
export const Landing = (): React.JSX.Element => {
  return (
    <StyledContainer>
      <StyledTitleContainer>
        <StyledTitleWrapper>
          <Image preview={false} src="src/assets/Develog.svg" />
          <p>コーディングの旅を記録し、シェアしよう。</p>
        </StyledTitleWrapper>
        <Image preview={false} src="src/assets/files.png" />
      </StyledTitleContainer>
      <StyledThemeSectionContainer>
        {themeSectionData.map((theme) => (
          <ThemeSection
            imageUrl={theme.imageUrl}
            imageAlt={theme.imageAlt}
            title={theme.title}
            description={theme.description}
          />
        ))}
      </StyledThemeSectionContainer>
      <StyledResistContainer>
        <StyledH2>
          <span>仲間</span>を探す旅に出かけよう
        </StyledH2>
        <InputWithButton placeholder={'メールアドレス'} />
        <p>または</p>
        <Button
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        >
          ログイン
        </Button>
      </StyledResistContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const StyledThemeSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 234px;
`;

const StyledTitleWrapper = styled.div``;
const StyledResistContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledH2 = styled.h2`
  font-size: 64px;
  font-weight: bolder;
  letter-spacing: 4%;
  color: ${Colors.WHITE};
  margin: 0;
  span {
    color: ${Colors.LIGHT_BLUE_ACCENT};
  }
`;
