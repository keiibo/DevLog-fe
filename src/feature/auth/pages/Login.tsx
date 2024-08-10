// import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import styled from 'styled-components';
import { Flex, Image, notification } from 'antd';

import {
  mixinBgMain,
  mixinBorderRadius24px,
  mixinTextColor
} from '../../../style/Mixin';
import { Colors } from '../../../style/Colors';
import { Input } from '../../../components/element/input/Input';
import { Form } from '../../../components/element/form/Form';
import { FormItem } from '../../../components/element/form/FormItem';
import { Button } from '../../../components/element/button/Button';
import { useForm } from 'antd/es/form/Form';
import { TPostLoginReq } from '../types/TLogin';
import { useMutation } from 'react-query';
import { login as postLogin } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slice/auth/authSlice';

export const Login = (): React.JSX.Element => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutation = useMutation(postLogin, {
    onSuccess: (res) => {
      notification.success({
        message: 'ログイン成功',
        description: `おかえりなさい、${res.userName}さん`,
        duration: 3 // 通知が表示される時間（秒）
      });
      // ユーザー情報をstoreに保存
      dispatch(
        login({
          userId: res.userId,
          userName: res.userName,
          email: res.email,
          projectIds: res.projectIds
        })
      );
      localStorage.setItem('token', res.token);
      if (res.projectIds.length > 0) {
        navigate(`/${res.projectIds[0]}/dashboard`);
      } else {
        navigate('/create');
      }
    },
    onError: () => {
      // エラー処理
      notification.error({
        message: 'ログイン失敗',
        description: 'ユーザーIDまたはパスワードを再確認してください',
        duration: 3
      });
    }
  });

  // ログイン処理
  const handleLogin = () => {
    const { identifier, password } = form.getFieldsValue();
    const req: TPostLoginReq = {
      identifier,
      password
    };
    mutation.mutate(req);
  };

  return (
    <StyledLoginContainer justify="center" align="center">
      <StyledBox vertical gap={32}>
        <Image
          preview={false}
          src="/src/assets/DevLog_header_logo.svg"
          alt="develog"
          width={'520px'}
        />
        <Flex vertical gap={16}>
          <StyledForm form={form} onFinish={handleLogin}>
            <FormItem
              name={'identifier'}
              required
              rules={[
                {
                  required: true,
                  message: '入力してください'
                }
              ]}
            >
              <Input width={400} placeholder="ユーザーIDまたはメールアドレス" />
            </FormItem>
            <FormItem
              name={'password'}
              required
              rules={[
                {
                  required: true,
                  message: '入力してください'
                }
              ]}
            >
              <Input
                type="password"
                width={400}
                placeholder="パスワード"
              ></Input>
            </FormItem>
            <Flex justify="center">
              <Button type={'primary'} htmlType="submit">
                ログイン
              </Button>
            </Flex>
          </StyledForm>
        </Flex>
      </StyledBox>
    </StyledLoginContainer>
  );
};

const StyledLoginContainer = styled(Flex)`
  height: 100vh;
  width: 100vw;
  ${mixinBgMain}
  ${mixinTextColor}
`;

const StyledBox = styled(Flex)`
  border: 4px solid ${Colors.TEXT};
  padding: 64px 100px;
  ${mixinBorderRadius24px};
`;

const StyledForm = styled(Form)`
  margin: 0 auto;
`;
