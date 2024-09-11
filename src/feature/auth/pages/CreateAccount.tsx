import React, { useState } from 'react';
import { BaseLayout } from '../../../components/element/layout/BaseLayout';
import { Flex, Image, notification } from 'antd';
import styled from 'styled-components';
import {
  mixinNormalFontSize24px,
  mixinNormalFontSize40px,
  mixinTextColor
} from '../../../style/Mixin';
import { Form } from '../../../components/element/form/Form';
import { FormItem } from '../../../components/element/form/FormItem';
import { Input } from '../../../components/element/input/Input';
import { Button } from '../../../components/element/button/Button';
import { useForm } from 'antd/es/form/Form';
import { Rule } from 'antd/es/form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../api/auth';
import { NOTIFICATION_TIME } from '../../../constant/Notification';
import { AxiosError } from 'axios';

export const CreateAccount = (): React.JSX.Element => {
  const [mode, setMode] = useState<'form' | 'confirm'>('form');
  const [form] = useForm<{
    userId: string;
    userName: string;
    password: string;
    confirmPassword: string;
    email: string;
    confirmEmail: string;
  }>();
  const patterns = {
    userId: new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,20}$'),
    password: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'),
    email: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')
  };

  const formItem = [
    {
      label: 'ユーザーID',
      name: 'userId',
      type: 'text',
      pattern: patterns.userId,
      errorMessage:
        'ユーザーIDは半角英数字を含み、6文字以上20文字以内で入力してください。',
      showCount: true
    },
    {
      label: 'パスワード',
      name: 'password',
      type: 'password',
      pattern: patterns.password,
      errorMessage:
        'パスワードは8文字以上で、少なくとも1つの大文字、1つの小文字、1つの数字を含む必要があります。',
      showCount: true
    },
    {
      label: 'パスワード確認',
      name: 'confirmPassword',
      type: 'password',
      pattern: patterns.password,
      errorMessage: '',
      showCount: false
    },
    {
      label: 'メールアドレス',
      name: 'email',
      type: 'email',
      pattern: patterns.email,
      errorMessage: '有効なメールアドレスを入力してください。',
      showCount: false
    },
    {
      label: 'メールアドレス(確認)',
      name: 'confirmEmail',
      type: 'email',
      pattern: patterns.email,
      errorMessage: '',
      showCount: false
    },
    {
      label: 'ニックネームを教えてください(他のユーザーに公開されます)',
      name: 'userName',
      type: 'text',
      errorMessage:
        'ニックネームは半角英数字または全角日本語で入力してください。',
      showCount: false
    }
  ];

  const navigate = useNavigate();

  const mutation = useMutation(createAccount, {
    onSuccess: (res) => {
      notification.success({
        message: `ようこそ！${res.userName}さん！`,
        description:
          'DeveLogにログインして、あなたのプロジェクトを促進させましょう',
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
      navigate(`/login`);
    },
    onError: (error: AxiosError) => {
      // エラー処理
      notification.error({
        message: 'アカウントの作成ができませんでした',
        description: error.response?.data as string,
        duration: NOTIFICATION_TIME.ERROR
      });
    }
  });

  const handleConfirm = () => {
    setMode('confirm');
  };

  const handleSubmit = () => {
    const formData = form.getFieldsValue();
    const req = {
      userId: formData.userId,
      userName: formData.userName,
      password: formData.password,
      email: formData.email
    };
    mutation.mutate(req);
  };

  return (
    <BaseLayout center>
      <Flex justify="center">
        <Flex vertical gap={32}>
          <Flex align="end">
            <Image
              preview={false}
              src="/assets/DevLog_header_logo.svg"
              alt="develog"
              width={'520px'}
            />
            <StyledSpan>へようこそ</StyledSpan>
          </Flex>
          <Flex vertical gap={24}>
            {mode === 'form' ? (
              <StyledTitle>アカウント新規作成</StyledTitle>
            ) : (
              <StyledTitle>入力内容の確認</StyledTitle>
            )}
            <Flex vertical>
              <Form form={form} onFinish={handleConfirm}>
                {formItem.map((item) => {
                  const validations: Rule[] = [
                    {
                      pattern: item.pattern,
                      message: item.errorMessage
                    },
                    {
                      required: true,
                      message: '入力してください' // 正しいプロパティは `message` であることに注意
                    }
                  ];

                  // パスワードとemailの確認用のバリデーションルール
                  if (
                    item.name === 'confirmPassword' ||
                    item.name === 'confirmEmail'
                  ) {
                    validations.push({
                      validator: (_, value) =>
                        value &&
                        value ===
                          form.getFieldValue(
                            item.name === 'confirmPassword'
                              ? 'password'
                              : 'email'
                          )
                          ? Promise.resolve()
                          : Promise.reject(new Error('入力値が一致しません'))
                    });
                  }

                  return (
                    <StyledFormItem
                      colon={false}
                      name={item.name}
                      label={item.label}
                      key={item.name}
                      rules={validations}
                    >
                      {mode === 'form' ? (
                        <StyledInput
                          max={item.name === 'userId' ? 20 : undefined}
                          showCount={item.showCount}
                          type={item.type}
                        />
                      ) : item.name === 'password' ||
                        item.name === 'confirmPassword' ? (
                        <StyledConfirmData>
                          {'****************'}
                        </StyledConfirmData>
                      ) : (
                        <StyledConfirmData>
                          {form.getFieldValue(item.name)}
                        </StyledConfirmData>
                      )}
                    </StyledFormItem>
                  );
                })}
                <Flex justify="center">
                  {mode === 'form' ? (
                    <Button type="primary" htmlType="submit">
                      入力内容の確認
                    </Button>
                  ) : (
                    <Flex gap={16}>
                      <Button type="primary" onClick={() => setMode('form')}>
                        戻る
                      </Button>
                      <Button type="primary" onClick={handleSubmit}>
                        登録
                      </Button>
                    </Flex>
                  )}
                </Flex>
              </Form>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

const StyledSpan = styled.span`
  ${mixinNormalFontSize40px}
`;

const StyledTitle = styled.div`
  text-align: center;
  ${mixinNormalFontSize40px}
`;

const StyledFormItem = styled(FormItem)`
  .ant-form-item-label {
    width: 400px;
    margin-right: 24px;
    label {
      ${mixinNormalFontSize24px}
    }
  }
  .ant-form-item-explain-error {
    max-width: 400px;
  }
`;

const StyledInput = styled(Input)`
  width: 400px;
  ${mixinNormalFontSize24px}
`;
const StyledConfirmData = styled.span`
  ${mixinNormalFontSize24px}
  ${mixinTextColor}
`;
