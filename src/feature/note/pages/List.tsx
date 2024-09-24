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

  const mutation = useMutation(createNote, {
    onSuccess: () => {
      navigate('create');
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

  return (
    <Flex vertical gap={12}>
      <StyledTitleFlex justify="space-between" align="center">
        <StyledPageTitle>ノート</StyledPageTitle>
        <Button type="primary" onClick={handleCreate}>
          新規作成
        </Button>
      </StyledTitleFlex>
      <StyledSearch />
      <AdList
        pagination={{ align: 'center', pageSize: 8 }}
        dataSource={notes}
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
