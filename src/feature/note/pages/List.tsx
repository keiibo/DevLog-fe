import { Flex } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import {
  mixinNormalFontSize24px,
  mixinPadding24px,
  mixinTextColor
} from '../../../style/Mixin';
import { Button } from '../../../components/element/button/Button';
import { Search } from '../components/elements/Search';
import { TNote } from '../types/TNote';
import { NoteListItem } from '../components/compositions/NoteListItem';

export const List = (): React.JSX.Element => {
  const dummy: TNote[] = [
    {
      noteId: 1,
      uuid: 'fdsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    },
    {
      noteId: 2,
      uuid: 'fdsdfafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    },
    {
      noteId: 3,
      uuid: 'fdsaefdfdsfda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    },
    {
      noteId: 4,
      uuid: 'fdfsfdsfdsdsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    },
    {
      noteId: 5,
      uuid: 'fddldsfldsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    },
    {
      noteId: 6,
      uuid: 'fdkndsfkffdklsfsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    },
    {
      noteId: 7,
      uuid: 'fddflfslsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    }
  ];
  return (
    <Flex vertical gap={12}>
      <StyledTitleFlex justify="space-between" align="center">
        <StyledPageTitle>ノート</StyledPageTitle>
        <Button type="primary">新規作成</Button>
      </StyledTitleFlex>
      <StyledSearch />
      <StyledListItemFlex vertical gap={24}>
        {dummy.map((note) => (
          <NoteListItem note={note} />
        ))}
      </StyledListItemFlex>
    </Flex>
  );
};

const StyledTitleFlex = styled(Flex)`
  padding-bottom: 12px;
`;

const StyledPageTitle = styled.h1`
  ${mixinNormalFontSize24px}
  ${mixinTextColor}
  margin: 0;
  padding: 0;
`;

const StyledSearch = styled(Search)`
  ${mixinPadding24px}
`;

const StyledListItemFlex = styled(Flex)`
  ${mixinPadding24px}
`;
