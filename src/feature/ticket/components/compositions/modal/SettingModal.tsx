import { Flex, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { MultiLineText } from '../../../../../components/composition/MultiLineText';
import { Input } from '../../../../../components/element/input/Input';
import { Button } from '../../../../../components/element/button/Button';
import { TCategory, TCreateCategoryReq } from '../../../types/TTicket';
import { Category } from '../../elements/Category';
import { Form } from '../../../../../components/element/form/Form';
import { FormItem } from '../../../../../components/element/form/FormItem';
import { useForm } from 'antd/es/form/Form';
import { styled } from 'styled-components';
import {
  mixinBoldFontSize24px,
  mixinBorderRadius4px,
  mixinNormalFontSize16px,
  mixinPadding8px
} from '../../../../../style/Mixin';
import { Colors } from '../../../../../style/Colors';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCategories, getCategories } from '../../../api/category';
import { NOTIFICATION_TIME } from '../../../../../constant/Notification';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../../../components/element/loading/Loading';
import { Modal } from '../../../../../components/element/modal/Modal';
import { ModalHeader } from '../../../../../components/element/modal/ModalHeader';
import { ModalBody } from '../../../../../components/element/modal/ModalBody';
import { ModalFooter } from '../../../../../components/element/modal/ModalFooter';
import { QueryKey } from '../../../../../constant/QueryKey';

type TProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

export const SettingModal = ({
  isOpened,
  setIsOpened,
  title
}: TProps): React.JSX.Element => {
  const { id: projectId } = useParams();
  const { data } = useQuery({
    queryKey: [QueryKey.CATEGORY_LIST],
    queryFn: () => getCategories(projectId || '')
  });

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [form] = useForm();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: createCategories,
    onSuccess: () => {
      setIsOpened(false);
      notification.success({
        message: `カテゴリを更新しました`,
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
    }
  });

  if (!projectId || !data) {
    return <Loading />;
  }
  const handleClickResistor = () => {
    const newCategory = form.getFieldValue('category');
    if (!newCategory) return;
    setCategories((prev) => {
      // カテゴリーのラベルが既に存在するかを確認
      const isDuplicate = prev.some(
        (category) => category.name === newCategory
      );

      // 重複していなければ新しいカテゴリーを追加
      if (!isDuplicate) {
        return [...prev, { name: newCategory, uuid: uuidv4() }];
      } else {
        // 重複している場合、警告を表示するか、他の処理を行う
        alert('このカテゴリーは既に存在しています。');
        return prev; // 重複している場合は変更しない
      }
    });
    form.resetFields();
  };

  const handleSave = () => {
    const req: TCreateCategoryReq = {
      projectId,
      categories
    };
    mutation.mutate(req);
  };

  return (
    <Modal
      open={isOpened}
      footer={false}
      width={800}
      destroyOnClose
      closeIcon={false}
      onCancel={() => {
        setIsOpened(false);
        form.resetFields();
      }}
    >
      <ModalHeader
        title={title}
        hasCloseIcon
        onClickCloseButton={() => {
          setIsOpened(false);
          form.resetFields();
        }}
      />
      <ModalBody>
        <Flex vertical gap={16}>
          <StyledSubTitle>カテゴリーの登録</StyledSubTitle>
          <MultiLineText
            text={`チケットに設定できるカテゴリーを作成することができます。
カテゴリーを用いることで、チケットの属性を管理することが一層容易になります。`}
          />
          <Form form={form}>
            <Flex align="center" gap={8}>
              <FormItem name="category" noStyle>
                <StyledInput placeholder="カテゴリー名を入力" />
              </FormItem>
              <Button type="primary" onClick={handleClickResistor}>
                登録
              </Button>
            </Flex>
          </Form>

          <div>
            <StyledThirdTitle>登録済みのカテゴリー:</StyledThirdTitle>
            <StyledCategoryContainer>
              <Flex gap={8}>
                {categories.map((category) => (
                  <Category
                    key={category.uuid}
                    category={category}
                    isDeletable
                    setCategories={setCategories}
                  />
                ))}
              </Flex>
            </StyledCategoryContainer>
          </div>
        </Flex>
      </ModalBody>
      <ModalFooter okButtonTitle={'保存'} hasOkButton handleOk={handleSave} />
    </Modal>
  );
};

const StyledSubTitle = styled.h3`
  ${mixinBoldFontSize24px}
  margin: 0;
`;
const StyledThirdTitle = styled.h4`
  ${mixinNormalFontSize16px}
  margin: 0;
  margin-bottom: 4px;
`;

const StyledInput = styled(Input)`
  min-width: 320px;
`;

const StyledCategoryContainer = styled.div`
  min-height: 40px;
  border: 1px solid ${Colors.TEXT};
  ${mixinPadding8px}
  ${mixinBorderRadius4px}
`;
