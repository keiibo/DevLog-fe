import { Flex } from 'antd';
import React, { useState } from 'react';
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
import { Select } from '../../../../components/element/select/Select';
import { Option } from '../../../../components/element/select/Option';
import { IconType, TIconType } from '../../../../components/element/icon/Icon';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../../components/element/loading/Loading';
import { TLinkIconList, TPostLinkIconsReq } from '../../types/TDetail';
import { useMutation } from 'react-query';
import { postLinkIcons } from '../../api/detail';

type TProps = {
  linkIconList: TLinkIconList[];
  onOk: () => void;
};

export const LinkIconSettingTooltip = ({
  linkIconList,
  onOk
}: TProps): React.JSX.Element => {
  const [form] = useForm();
  const [iconValue, setIconValue] = useState<TIconType>();
  const { id } = useParams();

  if (!id) <Loading />;

  const postLinkIconMutation = useMutation(postLinkIcons, {
    onSuccess: () => {
      onOk();
    }
  });

  const handleSaveLinkIcon = () => {
    const req: TPostLinkIconsReq = {
      projectId: id || '',
      linkIconList: [
        ...linkIconList,
        {
          name: form.getFieldValue('name'),
          url: form.getFieldValue('url'),
          iconType: form.getFieldValue('iconType')
        }
      ]
    };

    postLinkIconMutation.mutate(req);
  };

  return (
    <StyledFlex align="center" justify="center">
      <StyledBubble gap={24} align="center" justify="center">
        <Flex align="center">
          <LinkIcon type={iconValue || 'none'} isInTooltip />
        </Flex>
        <Flex vertical>
          <Form onFinish={handleSaveLinkIcon} form={form}>
            <StyledFormItem label="名前" name="name">
              <StyleInput />
            </StyledFormItem>
            <StyledFormItem label="URL" name="url">
              <StyleInput />
            </StyledFormItem>
            <StyledFormItem label="アイコン" name="iconType">
              <StyledSelect
                value={iconValue}
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(value) => setIconValue(value)}
              >
                {Object.values(IconType).map((iconType) => (
                  <Option key={iconType} value={iconType}>
                    {iconType}
                  </Option>
                ))}
              </StyledSelect>
            </StyledFormItem>

            <Flex justify="end">
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            </Flex>
          </Form>
        </Flex>
      </StyledBubble>
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex)`
  width: 360px;
  border: 1px solid ${Colors.TEXT};
  z-index: 10000;
  padding: 16px 8px;
  ${mixinBgMainLight}
  ${mixinBorderRadius8px}
`;

const StyledBubble = styled(Flex)`
  position: relative; // 吹き出しの位置調整のための基準点を設定
  padding: 16px 8px; // 内容物との間隔
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
  margin-bottom: 12px;
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

const StyledSelect = styled(Select)`
  width: 100%;
  border: none;
  border-radius: 0;

  padding: 0 6px;

  && .ant-select-selector {
    background: none;
    border: none;
    border-bottom: 1px solid ${Colors.TEXT};
    border-radius: 0;
    padding: 0;

    ${mixinTextColor}
  }
  && .ant-select-arrow {
    color: ${Colors.TEXT};
    margin: 0 2px;
    &:hover,
    &:active,
    &:focus {
      border: none;
    }
  }

  &:hover,
  &:active,
  &:focus {
    background-color: transparent;
  }
`;
