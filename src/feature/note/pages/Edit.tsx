import { Flex } from 'antd';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { ArrowBack } from '../../../components/composition/ArrowBack';
import { Input } from '../../../components/element/input/Input';
import { Textarea } from '../../../components/element/textarea/Textarea';
import styled from 'styled-components';
import { mixinBgMainLight, mixinTextColor } from '../../../style/Mixin';
import { Preview } from '../components/compositions/Preview';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form } from '../../../components/element/form/Form';
import { FormItem } from '../../../components/element/form/FormItem';
import { useForm } from 'antd/es/form/Form';
import { getNoteDetail, updateNote } from '../api/note';
import { Loading } from '../../../components/element/loading/Loading';
import { TNote, TUpdateNoteReq } from '../types/TNote';
import { useMutation } from 'react-query';

export const Edit = (): React.JSX.Element => {
  const { id, uuid } = useParams();
  const pathname = useLocation().pathname;
  const isEdit = pathname.includes('edit');
  const [detail, setDetail] = useState<TNote>();
  const navigate = useNavigate();
  const [form] = useForm();
  const [textValue, setTextValue] = useState<string>('');

  /**
   * 編集状態の時に詳細apiを投げてstateにセットする
   */
  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await getNoteDetail({
          projectId: id || '',
          uuid: uuid || ''
        });
        setDetail(data);
        setTextValue(data.body);
      } catch (error) {}
    };

    if (isEdit) {
      getDetail();
    }
  }, [isEdit, id, uuid]);

  const mutation = useMutation(updateNote);

  /**
   * 更新処理
   */
  const handleUpdateNote = async () => {
    try {
      setIsSaving(true); // 保存開始
      const req: TUpdateNoteReq = {
        projectId: id || '',
        req: {
          title: form.getFieldValue('title'),
          body: form.getFieldValue('body'),
          uuid: uuid || '',
          icon: 'note'
        }
      };
      // 非同期の保存処理
      await mutation.mutateAsync(req);
      setIsSaving(false); // 保存完了後に false にする
    } catch (error) {}
  };

  /**
   * テキストエリアが更新された時の処理
   * stateの更新、保存apiをでバウンスで飛ばしたい
   */
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setTextValue(e.target.value);

      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        handleUpdateNote();
      }, 1000);
    },
    []
  );

  /**
   * 初期値:編集状態なら詳細apiを反映する
   */
  const initialValues = {
    title: isEdit ? detail?.title : '',
    body: isEdit ? detail?.body : ''
  };

  // 保存メッセージの管理
  const renderSaveText = () => {
    if (isSaving) {
      return <StyledSaveText>保存中です...</StyledSaveText>;
    }
    if (!isSaving && detail?.body !== textValue) {
      return <StyledSaveText>保存しました！</StyledSaveText>;
    }
    return <StyledSaveText>※ テキストは自動保存されます</StyledSaveText>;
  };

  if (isEdit && !detail) {
    return <Loading />;
  }

  return (
    <Flex vertical gap={8}>
      <ArrowBack
        handleBack={() => {
          handleUpdateNote();
          navigate(`/${id}/note`);
        }}
      />
      <Form form={form} initialValues={initialValues}>
        <FormItem name="title">
          <StyledInput width={'100%'} placeholder="タイトルを入力" />
        </FormItem>
        <Flex gap={16}>
          <StyledEditFlex vertical gap={8}>
            <FormItem name="body" noStyle>
              <StyledTextarea
                value={textValue}
                autoSize
                onChange={(e) => handleTextChange(e)}
                style={{ fontFamily: 'monospace' }}
              />
            </FormItem>
            {renderSaveText()}
          </StyledEditFlex>
          <Preview value={textValue} />
        </Flex>
      </Form>
    </Flex>
  );
};

const StyledInput = styled(Input)`
  ${mixinTextColor}
  ${mixinBgMainLight}
  &:focus,&:hover {
    ${mixinBgMainLight}
  }
`;

const StyledTextarea = styled(Textarea)`
  height: 600px !important;
  ${mixinTextColor}
  ${mixinBgMainLight}
  &:focus,&:hover {
    ${mixinBgMainLight}
  }
`;
const StyledEditFlex = styled(Flex)`
  width: 400px;
`;

const StyledSaveText = styled.span`
  ${mixinTextColor}
`;
