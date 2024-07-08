import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../components/element/input/Input';
import { Button } from '../../../components/element/button/Button';
import { Colors } from '../../../constant/Colors';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Textarea } from '../../../components/element/textarea/Textarea';
import { MultiLineText } from '../../../components/composition/MultiLineText';
import { Form } from '../../../components/element/form/Form';
import { FormItem } from '../../../components/element/form/FormItem';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import { createProject } from '../api/dashboard';
import { TCreateProjectReq } from '../types/TProject';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import DatePicker from '../../../components/element/datepicker/DatePicker';

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
    console.log(form.getFieldsValue());

    const currentKey = questions[currentQuestionIndex].key;

    // 現在の質問のフィールドのみをバリデート
    form
      .validateFields([currentKey])
      .then(() => {
        // バリデーションが成功した場合
        if (currentQuestionIndex === questions.length - 1) {
          setShowConfirmation(true); // 最後の質問であれば確認画面を表示
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1); // 次の質問へ
        }
      })
      .catch((errorInfo) => {
        // バリデーションが失敗した場合、ここで処理を行う
        console.error('Validation Error:', errorInfo);
      });
  };

  /**
   * 戻るボタン
   */
  const goToPreviousQuestion = () => {
    console.log(currentQuestionIndex);

    if (currentQuestionIndex > 0) {
      if (currentQuestionIndex === 3) {
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
        duration: 4.5 // 通知が表示される時間（秒）
      });
      queryClient.invalidateQueries('projects');
      navigate(`/${res._id}/dashboard`);
    },
    onError: (error) => {
      console.log(error);
      // エラー処理
      notification.error({
        message: 'プロジェクト作成失敗',
        description: 'プロジェクトの作成に失敗しました。再試行してください。',
        duration: 4.5
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
      limitDate: form.getFieldValue('limitDate')
    };
    mutation.mutate(req);
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
            <StyledDatePicker format={'YYYY/MM/DD'} />
          </StyledQuestionFormItem>
        );
      default:
        return null;
    }
  };

  return (
    <StyledCreateContainer>
      <StyledScrollContainer>
        <StyledBackContainer>
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
              <StyledConfirmItemContainer>
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
                      'YYYY/MM/DD'
                    )}
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
const StyledBackContainer = styled.div`
  text-align: left;
  font-size: 32px;
  display: flex;
  gap: 8px;
  min-height: 32px;
`;

const StyledBackButton = styled.div`
  cursor: pointer;
`;
const StyledQuestionTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  padding: 80px;
  margin: 0;
`;

const StyledScrollContainer = styled.div``;

const StyledInput = styled(Input)`
  font-size: 32px;
  width: 60%;
  border: none;
  border-bottom: 1px solid ${Colors.WHITE};
  border-radius: 0;
`;

const StyledTextarea = styled(Textarea)`
  font-size: 24px;
  width: 60%;
  border-bottom: 1px solid ${Colors.WHITE};
`;

// 質問コンテナのスタイルを定義
const StyledQuestionFormItem = styled(FormItem)`
  justify-content: center;
  align-items: center;
`;

const StyledConfirmItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: left;
  font-size: 18px;
  margin: 0 80px;
`;

const StyledConfirmText = styled.div`
  font-size: 32px;
  margin-left: 24px;
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
  font-size: 32px;
`;
