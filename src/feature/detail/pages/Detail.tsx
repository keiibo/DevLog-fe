import { Flex } from 'antd';
import React from 'react';
import { Section } from '../components/compositions/Section';
import { CategoryLabelMode } from '../../../components/composition/categoryLabel/CategoryLabel';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getProject } from '../../../api/project';
import { Loading } from '../../../components/element/loading/Loading';

export const Detail = (): React.JSX.Element => {
  const { id: projectId } = useParams();

  const { data } = useQuery('detail', () => getProject(projectId || ''));

  if (!data) <Loading />;

  const items = [
    {
      label: 'プロジェクト名',
      mode: CategoryLabelMode.BUTTON,
      children: data?.name,
      buttonTitle: '編集',
      onButtonClick: () => {}
    },
    {
      label: '詳細',
      mode: CategoryLabelMode.BUTTON,
      children: data?.detail,
      buttonTitle: '編集',
      onButtonClick: () => {}
    },
    {
      label: '各種リンク',
      mode: CategoryLabelMode.NONE,
      children: 'test'
    }
  ];

  return (
    <Flex vertical gap={8}>
      {items.map((item) => (
        <Section
          label={item.label}
          mode={item.mode}
          children={item.children}
          onButtonClick={item.onButtonClick}
          buttonTitle={item.buttonTitle}
        />
      ))}
    </Flex>
  );
};
