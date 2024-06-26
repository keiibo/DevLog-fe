import React from 'react';
import { ThemeSection } from '../../../components/composition/ThemeSection';
import { styled } from 'styled-components';
import { themeSectionData } from '../../../constant/ThemeSectionData';
import { Image } from 'antd';
import { Colors } from '../../../constant/Colors';
import { Button } from '../../../components/composition/element/Button';
import { InputWithButton } from '../../../components/composition/element/InputWithButton';

/**
 * LP画面
 */
export const Landing = (): React.JSX.Element => {
  return (
    <StyledContainer>
      <StyledWrapper>
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
          <StyledInputContainer>
            <InputWithButton
              placeholder={'メールアドレス'}
              width={720}
              buttonText={'登録'}
            />
            <p>または</p>
            <Button
              type="primary"
              onClick={function (): void {
                throw new Error('Function not implemented.');
              }}
              width="120px"
            >
              ログイン
            </Button>
          </StyledInputContainer>
        </StyledResistContainer>
      </StyledWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 120px;
`;
const StyledWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 120px;
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

const StyledInputContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  height: 100px;
  padding: 20px 12px;
`;
