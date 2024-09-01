import { Flex } from 'antd';
import React from 'react';
import styled from 'styled-components';
import {
  mixinBgMainLight,
  mixinBorderRadius8px,
  mixinPadding8px,
  mixinTextColor
} from '../../../../style/Mixin';
import { LinkIcon } from './LinkIcon';
import { Form } from '../../../../components/element/form/Form';
import { FormItem } from '../../../../components/element/form/FormItem';
import { Input } from '../../../../components/element/input/Input';
import { Colors } from '../../../../style/Colors';
import { Button } from '../../../../components/element/button/Button';

export const LinkIconSettingTooltip = (): React.JSX.Element => {
  return (
    <StyledFlex align="center" justify="center">
      <StyledBubble gap={8}>
        <Flex align="center">
          <LinkIcon type={'none'} isInTooltip />
        </Flex>
        <Flex vertical>
          <Form>
            <StyledFormItem label="名前">
              <StyleInput />
            </StyledFormItem>
            <StyledFormItem label="URL">
              <StyleInput />
            </StyledFormItem>
            <StyledFormItem label="アイコン">
              <StyleInput />
            </StyledFormItem>
          </Form>

          <Flex justify="end">
            <Button type="primary">OK</Button>
          </Flex>
        </Flex>
      </StyledBubble>
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex)`
  width: 360px;
  border: 1px solid ${Colors.TEXT};
  z-index: 10000;
  ${mixinBgMainLight}
  ${mixinBorderRadius8px}
`;

const StyledBubble = styled(Flex)`
  position: relative; // 吹き出しの位置調整のための基準点を設定
  padding: 10px 20px; // 内容物との間隔
  ${mixinPadding8px}
  z-index:10000;
  /* &::after {
    content: '';
    position: absolute;
    bottom: -11px; // 吹き出しの下部に配置し、枠線を見せるために位置を微調整
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 11px 11px 0 11px; // 三角形の大きさを1px大きくして背景色の枠線を見せる
    border-color: ${Colors.TEXT} transparent transparent transparent; // 枠線色を適用
    z-index: 1000;
  } */

  /* &::before {
    content: '';
    position: absolute;
    bottom: -10px; // 吹き出しの直下
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 10px 0 10px;
    border-color: ${Colors.MAIN_LIGHT} transparent transparent transparent; // 背景色と同じ
    z-index: 10000;
  } */
`;

const StyledFormItem = styled(FormItem)`
  width: 100%;
  align-items: center;
  .ant-form-item-label {
    display: flex;
    align-items: center;
  }
`;

const StyleInput = styled(Input)`
  width: 100%;
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${Colors.TEXT};
  padding: 0 6px;
  ${mixinTextColor}

  &:hover,
  &:active,
  &:focus {
    background-color: transparent;
  }
`;
