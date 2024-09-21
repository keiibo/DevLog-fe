import { Flex, List as AdList } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import {
  mixinNormalFontSize24px,
  mixinPadding24px,
  mixinTextColor
} from '../../../style/Mixin';
import { Button } from '../../../components/element/button/Button';
import { Search } from '../../../components/element/search/Search';
import { TNote } from '../types/TNote';
import { NoteListItem } from '../components/compositions/NoteListItem';
import { useNavigate } from 'react-router-dom';

export const List = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dummy: TNote[] = [
    {
      noteId: 1,
      uuid: 'fdsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノーfdafdsトタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    },
    {
      noteId: 2,
      uuid: 'fdsdfafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートfdsafdsafタイトル',
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
    },
    {
      noteId: 7,
      uuid: 'fddflfslsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートタfdafdsイトル',
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
    },
    {
      noteId: 7,
      uuid: 'fddflfslsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートfdsafdsfadfsafdsfタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    },
    {
      noteId: 7,
      uuid: 'fddflfslsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートタfdイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    },
    {
      noteId: 7,
      uuid: 'fddflfslsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートfdsfdsaタイトル',
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
    },
    {
      noteId: 7,
      uuid: 'fddflfslsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノートfdafdタイトル',
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
    },
    {
      noteId: 7,
      uuid: 'fddflfslsafda',
      projectId: 'DVLG',
      icon: '',
      title: 'ノーfdafdfsトタイトル',
      body: 'こんちゃああああ',
      createdAt: '2024/12/31',
      updateAt: '2024/12/31'
    }
  ];
  return (
    <Flex vertical gap={12}>
      <StyledTitleFlex justify="space-between" align="center">
        <StyledPageTitle>ノート</StyledPageTitle>
        <Button type="primary" onClick={()=>navigate("create")}>新規作成</Button>
      </StyledTitleFlex>
      <StyledSearch />
      <AdList
        pagination={{ align: 'center' }}
        dataSource={dummy}
        renderItem={(item) => <NoteListItem note={item} />}
      />
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
