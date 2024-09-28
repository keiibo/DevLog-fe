import { Flex, List as AdList } from 'antd';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import {
  mixinNormalFontSize24px,
  mixinPadding24px,
  mixinTextColor
} from '../../../style/Mixin';
import { Button } from '../../../components/element/button/Button';
import { Search } from '../../../components/element/search/Search';
import { NoteListItem } from '../components/compositions/NoteListItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { createNote, getNotes } from '../api/note';
import { QueryKey } from '../../../constant/QueryKey';
import { TPostNoteReq } from '../types/TNote';
import { v4 } from 'uuid';

export const List = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: notes } = useQuery(QueryKey.NOTE_LIST, () =>
    getNotes(id || '')
  );
  // 検索ボックスのキーワードを管理
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filteredNotes, setFilteredNotes] = useState(notes || []);

  const mutation = useMutation(createNote, {
    onSuccess: (res) => {
      navigate(`create/${res.uuid}`);
    }
  });

  /**
   * 新規作成ボタン押下時
   */
  const handleCreate = () => {
    const reqBody: TPostNoteReq = {
      projectId: id || '',
      req: {
        uuid: v4(),
        icon: 'note',
        title: '新しいノート',
        body: ''
      }
    };
    mutation.mutate(reqBody);
  };

  /**
   * デバウンス用の useEffect
   * searchTerm が変更されてから 300ms 後に debouncedSearchTerm を更新
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // searchTerm が 300ms 変わらなければ検索を実行
    }, 300);

    // クリーンアップ関数: 新しい入力が発生したらタイマーをリセット
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  /**
   * フィルタリング処理: debouncedSearchTerm を使って検索を行う
   */
  useEffect(() => {
    if (notes) {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [debouncedSearchTerm, notes]);

  /**
   * 検索ボックスの入力変更時の処理
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Flex vertical gap={12}>
      <StyledTitleFlex justify="space-between" align="center">
        <StyledPageTitle>ノート</StyledPageTitle>
        <Button type="primary" onClick={handleCreate}>
          新規作成
        </Button>
      </StyledTitleFlex>
      <StyledSearch
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="ノートを検索"
      />
      <AdList
        pagination={{ align: 'center', pageSize: 8 }}
        dataSource={filteredNotes}
        renderItem={(item) => (
          <NoteListItem note={item} searchTerm={searchTerm} />
        )}
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
