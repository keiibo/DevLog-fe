import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import {
  mixinBoldFontSize16px,
  mixinBorderRadius4px,
  mixinNormalFontSize16px,
  mixinPadding8px
} from '../../../../../style/Mixin';
import { Input } from '../../../../../components/element/input/Input';
import { Colors } from '../../../../../style/Colors';
import { Flex, notification } from 'antd';
import { MultiLineText } from '../../../../../components/composition/MultiLineText';
import { Form } from '../../../../../components/element/form/Form';
import { FormItem } from '../../../../../components/element/form/FormItem';
import { Button } from '../../../../../components/element/button/Button';
import { Category } from '../../elements/Category';
import { FormInstance } from 'antd/es/form/Form';
import { TCategory, TCreateCategoryReq } from '../../../types/TTicket';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../../../../constant/QueryKey';
import { createCategories, getCategories } from '../../../api/category';
import { v4 as uuidv4 } from 'uuid';
import { Loading } from '../../../../../components/element/loading/Loading';
import { NOTIFICATION_TIME } from '../../../../../constant/Notification';

type TProps = {
  form: FormInstance;
};

export const CategoryTabItem = ({ form }: TProps): React.JSX.Element => {
  const { id: projectId } = useParams();
  const { data } = useQuery({
    queryKey: [QueryKey.CATEGORY_LIST],
    queryFn: () => getCategories(projectId || '')
  });

  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

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

  const mutation = useMutation({
    mutationFn: createCategories,
    onSuccess: () => {
      notification.success({
        message: `カテゴリを更新しました`,
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
    }
  });

  const handleSave = () => {
    const req: TCreateCategoryReq = {
      projectId: projectId || '',
      categories
    };
    mutation.mutate(req);
  };

  if (!projectId || !data) {
    return <Loading />;
  }

  return (
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
