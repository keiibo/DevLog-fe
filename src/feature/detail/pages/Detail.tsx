import { Flex } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Section } from '../components/compositions/Section';
import { CategoryLabelMode } from '../../../components/composition/categoryLabel/CategoryLabel';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getProject } from '../../../api/project';
import { Loading } from '../../../components/element/loading/Loading';
import { LinkIcon } from '../components/elements/LinkIcon';
import { IconType } from '../../../components/element/icon/Icon';
import { styled } from 'styled-components';
import dayjs from 'dayjs';
import { DateFormat } from '../../../constant/DateFormat';

export const Detail = (): React.JSX.Element => {
  const { id: projectId } = useParams();
  const [mainView, setMainView] = useState<DOMRect>();
  const ref = useRef<HTMLElement>(null);

  const { data } = useQuery('detail', () => getProject(projectId || ''));

  if (!data) <Loading />;

  useEffect(() => {
    const rect = ref.current?.parentElement?.getBoundingClientRect();
    setMainView(rect);
  }, [ref]);

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
      label: '期限日',
      mode: CategoryLabelMode.NONE,
      children: dayjs(data?.limitDate).format(DateFormat.SLASH),
      buttonTitle: '編集',
      onButtonClick: () => {}
    },
    {
      label: '各種リンク',
      mode: CategoryLabelMode.NONE,
      children: (
        <StyledIconFlex gap={8}>
          {data?.linkIconList.map((data, index) => (
            <StyledLinkIcon key={index}>
              <LinkIcon
                type={data.iconType}
                link={data.url}
                name={data.name}
                isInTooltip={false}
                mainView={mainView}
              />
            </StyledLinkIcon>
          ))}
          <StyledLinkIcon>
            <LinkIcon
              linkIconList={data?.linkIconList || []}
              type={IconType.PLUS}
              isInTooltip={false}
              mainView={mainView}
            />
          </StyledLinkIcon>
        </StyledIconFlex>
      )
    }
  ];

  return (
    <Flex vertical gap={8} ref={ref}>
      {items.map((item) => (
        <Section
          key={item.label}
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

const StyledLinkIcon = styled.div`
  flex: 0 0 2; // 8個表示で折り返す計算（100% / 8 - gap）
`;

const StyledIconFlex = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; // ここを調整してアイテムの配置を制御
`;
