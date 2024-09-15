import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../components/element/input/Input';
import { Button } from '../../../components/element/button/Button';
import { Colors } from '../../../style/Colors';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Textarea } from '../../../components/element/textarea/Textarea';
import { MultiLineText } from '../../../components/composition/MultiLineText';
import { Form } from '../../../components/element/form/Form';
import { FormItem } from '../../../components/element/form/FormItem';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import { createProject } from '../../../api/project';
import { TCreateProjectReq } from '../../detail/types/TProject';
import { useNavigate } from 'react-router-dom';
import { Flex, notification } from 'antd';
import DatePicker from '../../../components/element/datepicker/DatePicker';
import {
  mixinBoldFontSize40px,
  mixinMargin0,
  mixinNormalFontSize16px,
  mixinNormalFontSize24px
} from '../../../style/Mixin';
import { DateFormat } from '../../../constant/DateFormat';
import { NOTIFICATION_TIME } from '../../../constant/Notification';
import { QueryKey } from '../../../constant/QueryKey';

export const Create = (): React.JSX.Element => {
  const queryClient = useQueryClient();
  const questions = [
    {
      key: 'name',
      question: 'プロジェクトの名前を教えてください',
      inputType: 'text'
    },
    {
      key: 'detail',
      question: (
        <MultiLineText
          text="素晴らしい名前ですね。
          これはどのようなプロジェクトですか？"
        />
      ),
      inputType: 'textarea'
    },
    {
      key: 'limitDate',
      question: 'いつまでにプロジェクトを完成させますか？',
      inputType: 'date'
    },
    {
      key: 'projectId',
      question: (
        <MultiLineText
          text="最後にプロジェクトを象徴するIDを作成しましょう！
          ※アルファベット大文字5文字まで"
        />
      ),
      inputType: 'id'
    }
  ];
  const navigate = useNavigate();

  const [form] = useForm();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  /**
   * 次へ、完了
   */
  const handleAnswer = () => {
    const currentKey = questions[currentQuestionIndex].key;

    // 現在の質問のフィールドのみをバリデート
    form.validateFields([currentKey]).then(() => {
      // バリデーションが成功した場合
      if (currentQuestionIndex === questions.length - 1) {
        setShowConfirmation(true); // 最後の質問であれば確認画面を表示
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // 次の質問へ
      }
    });
  };

  /**
   * 戻るボタン
   */
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      if (currentQuestionIndex === 4) {
        setShowConfirmation(false);
      }
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const mutation = useMutation(createProject, {
    onSuccess: (res) => {
      notification.success({
        message: 'プロジェクト作成成功',
        description: '新しいプロジェクトが正常に作成されました。',
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
      queryClient.invalidateQueries(QueryKey.PROJECT_LIST);
      navigate(`/${res.projectId}/dashboard`);
    },
    onError: () => {
      // エラー処理
      notification.error({
        message: 'プロジェクト作成失敗',
        description: 'プロジェクトの作成に失敗しました。再試行してください。',
        duration: NOTIFICATION_TIME.ERROR
      });
    }
  });

  /**
   * 作成処理
   */
  const handleSubmit = () => {
    const req: TCreateProjectReq = {
      name: form.getFieldValue('name'),
      detail: form.getFieldValue('detail'),
      limitDate: form.getFieldValue('limitDate'),
      projectId: form.getFieldValue('projectId')
    };
    mutation.mutate(req);
  };

  const validateInput = (_: any, value: string) => {
    if (!value) return Promise.resolve(); // 値が空の場合は検証をスキップ
    const uppercasePattern = /^[A-Z]+$/; // 大文字のみを許可する正規表現
    if (value.length > 5) {
      return Promise.reject(
        new Error('You can enter up to 5 uppercase letters.')
      );
    }
    if (!uppercasePattern.test(value)) {
      return Promise.reject(new Error('Only uppercase letters are allowed.'));
    }
    return Promise.resolve();
  };

  const renderInputField = (inputType: string) => {
    switch (inputType) {
      case 'text':
        return (
          <StyledQuestionFormItem
            name="name"
            rules={[{ required: true, message: '入力してください' }]}
          >
            <StyledInput type="text" placeholder="個人開発応援アプリDevLog" />
          </StyledQuestionFormItem>
        );
      case 'textarea':
        return (
          <StyledQuestionFormItem
            name="detail"
            rules={[
              {
                required: true,
                message: '入力してください'
              }
            ]}
          >
            <StyledTextarea
              required
              size="large"
              autoSize={{
                minRows: 6,
                maxRows: 6
              }}
            />
          </StyledQuestionFormItem>
        );
      case 'date':
        return (
          <StyledQuestionFormItem
            name="limitDate"
            rules={[{ required: true, message: '選択してください' }]}
          >
            <StyledDatePicker format={DateFormat.SLASH} />
          </StyledQuestionFormItem>
        );
      case 'id':
        return (
          <StyledQuestionFormItem
            name="projectId"
            rules={[{ validator: validateInput }]}
          >
            <StyledInput type="text" placeholder="ABCDE" maxLength={5} />
          </StyledQuestionFormItem>
        );
      default:
        return null;
    }
  };

  return (
    <StyledCreateContainer>
      <StyledScrollContainer>
        <StyledBackContainer gap={8}>
          {currentQuestionIndex > 0 && (
            <StyledBackButton onClick={goToPreviousQuestion}>
              <ArrowUpOutlined />
              Back
            </StyledBackButton>
          )}
        </StyledBackContainer>
        <StyledQuestionTitle>
          {questions[currentQuestionIndex] &&
          questions[currentQuestionIndex].question
            ? questions[currentQuestionIndex].question
            : 'さあ、あなたのプロジェクトが始まろうとしています！'}
        </StyledQuestionTitle>
        <Form form={form}>
          {showConfirmation ? (
            <>
              <StyledConfirmItemContainer vertical gap={24}>
                <div>
                  タイトル：
                  <StyledConfirmText>
                    {form.getFieldValue('name')}
                  </StyledConfirmText>
                </div>
                <div>
                  詳細：
                  <StyledConfirmText>
                    <StyledMultiLineText text={form.getFieldValue('detail')} />
                  </StyledConfirmText>
                </div>
                <div>
                  完了日：
                  <StyledConfirmText>
                    {dayjs(form.getFieldValue('limitDate')).format(
                      DateFormat.SLASH
                    )}
                  </StyledConfirmText>
                </div>
                <div>
                  プロジェクトID：
                  <StyledConfirmText>
                    {form.getFieldValue('projectId')}
                  </StyledConfirmText>
                </div>
              </StyledConfirmItemContainer>
              <StyledButtonContainer>
                <Button type="primary" onClick={() => handleSubmit()}>
                  作成
                </Button>
              </StyledButtonContainer>
            </>
          ) : (
            <>
              {renderInputField(questions[currentQuestionIndex].inputType)}
              <Button type="primary" onClick={() => handleAnswer()}>
                次へ
              </Button>
            </>
          )}
        </Form>
      </StyledScrollContainer>
    </StyledCreateContainer>
  );
};

const StyledCreateContainer = styled.div`
  text-align: center;
  height: 100%;
`;
const StyledBackContainer = styled(Flex)`
  text-align: left;
  min-height: 32px;
  ${mixinNormalFontSize24px}
`;

const StyledBackButton = styled.div`
  cursor: pointer;
`;
const StyledQuestionTitle = styled.h1`
  padding: 80px;

  ${mixinBoldFontSize40px}
  ${mixinMargin0}
`;

const StyledScrollContainer = styled.div``;

const StyledInput = styled(Input)`
  width: 60%;
  border: none;
  border-bottom: 1px solid ${Colors.WHITE};
  border-radius: 0;

  ${mixinNormalFontSize24px}
`;

const StyledTextarea = styled(Textarea)`
  width: 60%;
  border-bottom: 1px solid ${Colors.WHITE};

  ${mixinNormalFontSize24px}
`;

// 質問コンテナのスタイルを定義
const StyledQuestionFormItem = styled(FormItem)`
  justify-content: center;
  align-items: center;
`;

const StyledConfirmItemContainer = styled(Flex)`
  text-align: left;
  margin: 0 80px;

  ${mixinNormalFontSize16px}
`;

const StyledConfirmText = styled.div`
  margin-left: 24px;
  ${mixinNormalFontSize24px}
`;

const StyledButtonContainer = styled.div`
  margin-top: 24px;
`;

const StyledMultiLineText = styled(MultiLineText)`
  height: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 50%;
  height: 80px;
  ${mixinNormalFontSize24px}
`;
