import React, { useState } from 'react';
import { styled } from 'styled-components';
import { mixinBoldFontSize16px } from '../../../../../style/Mixin';
import { Flex, FormInstance, notification } from 'antd';
import { MultiLineText } from '../../../../../components/composition/MultiLineText';
import { Form } from '../../../../../components/element/form/Form';
import { FormItem } from '../../../../../components/element/form/FormItem';
import { Button } from '../../../../../components/element/button/Button';
import { Input } from '../../../../../components/element/input/Input';
import { Textarea } from '../../../../../components/element/textarea/Textarea';
import ReactMarkdown from 'react-markdown';
import { Select } from '../../../../../components/element/select/Select';
import { Option } from '../../../../../components/element/select/Option';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createTemplate,
  getTemplates,
  updateTemplate
} from '../../../api/template';
import { QueryKey } from '../../../../../constant/QueryKey';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../../../components/element/loading/Loading';
import {
  TCreateTemplateReq,
  TUpdateTemplateRequest
} from '../../../types/TTicket';
import { NOTIFICATION_TIME } from '../../../../../constant/Notification';
import { v4 } from 'uuid';

type TProps = {
  form: FormInstance;
};

export const TemplateTabItem = ({ form }: TProps): React.JSX.Element => {
  const { id } = useParams();
  const initial = '## 概要';

  const [textValue, setTextValue] = useState(initial);
  const { data } = useQuery({
    queryKey: [QueryKey.TEMPLATE_LIST],
    queryFn: () => getTemplates(id || '')
  });

  const updateMutation = useMutation({
    mutationFn: updateTemplate,
    onSuccess: () => {
      notification.success({
        message: 'テンプレートを更新しました',
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
      form.resetFields();
      form.setFieldValue('content', initial);
      setTextValue(initial);
    }
  });

  const createMutation = useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      notification.success({
        message: 'テンプレートを作成しました',
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
      form.resetFields();
      form.setFieldValue('content', initial);
      setTextValue(initial);
    }
  });

  const handleSave = () => {
    // uuidがあれば更新、なければ新規作成
    if (form.getFieldValue('uuid')) {
      // 更新
      const req: TUpdateTemplateRequest = {
        projectId: id || '',
        req: {
          uuid: form.getFieldValue('uuid'),
          title: form.getFieldValue('title'),
          content: form.getFieldValue('content')
        }
      };
      updateMutation.mutate(req);
      return;
    }
    // 新規
    const req: TCreateTemplateReq = {
      projectId: id || '',
      req: {
        uuid: v4(),
        title: form.getFieldValue('title'),
        content: form.getFieldValue('content')
      }
    };
    createMutation.mutate(req);
  };

  const handleSelectChange = (uuid: string) => {
    const targetTemplate = data?.find((template) => template.uuid === uuid);
    form.setFieldsValue({
      title: targetTemplate?.title,
      content: targetTemplate?.content || initial
    });
    setTextValue(targetTemplate?.content || initial);
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <Flex vertical gap={16}>
      <StyledSubTitle>テンプレートの作成・編集</StyledSubTitle>
      <MultiLineText
        text="チケットの詳細文のテンプレートを作成することができます。
テンプレートを用いることでチケットに一貫性を持たせ、必要な情報を過不足なく含めることができます。"
      />
      <Form form={form}>
        <Flex gap={8} vertical>
          <FormItem noStyle name={'uuid'}>
            <StyledSelect
              placeholder="(新規作成)"
              onChange={(value) => handleSelectChange(value)}
            >
              <Option value={null}>{''}</Option>
              {data.map((template) => {
                return <Option value={template.uuid}>{template.title}</Option>;
              })}
            </StyledSelect>
          </FormItem>
          <MultiLineText
            text={`*新規作成時はタイトルとテンプレートを入力し保存してください。
プルダウンが選択済みだと新規作成ではなく更新になるのでご注意ください。`}
          />

          <FormItem name="title" noStyle>
            <StyledInput placeholder="テンプレート名" />
          </FormItem>
          <Flex gap={8}>
            <StyledFormItem name="content" initialValue={textValue}>
              <StyledTextarea
                value={textValue}
                autoSize
                onChange={(e) => setTextValue(e.target.value)}
              />
            </StyledFormItem>
            <StyledReactMarkdown>{textValue}</StyledReactMarkdown>
          </Flex>
        </Flex>
      </Form>
      <Flex justify="center">
        <Button type="primary" onClick={handleSave}>
          保存
        </Button>
      </Flex>
    </Flex>
  );
};

const StyledSubTitle = styled.h3`
  ${mixinBoldFontSize16px}
  margin: 0;
`;

const StyledInput = styled(Input)`
  min-width: 50%;
`;

const StyledSelect = styled(Select)`
  width: 50%;
`;

const StyledFormItem = styled(FormItem)`
  width: 50%;
`;
const StyledReactMarkdown = styled(ReactMarkdown)`
  width: 50%;
`;

const StyledTextarea = styled(Textarea)`
  min-height: 400px !important;
`;
