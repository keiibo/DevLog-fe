import React, { useEffect, useState } from 'react';
import { Priority, Status, TGetMileStoneRes, TTicket } from '../types/TTicket';
import { Flex, Tooltip } from 'antd';
import { CategoryLabel } from '../../../components/composition/categoryLabel/CategoryLabel';
import { TicketListItem } from '../components/compositions/TicketListItem';
import { styled } from 'styled-components';
import { CreateModal } from '../components/compositions/modal/CreateModal';
import {
  mixinBgTextDark,
  mixinNormalFontSize24px,
  mixinTextColor
} from '../../../style/Mixin';
import {
  CloseOutlined,
  FlagFilled,
  PlusCircleFilled,
  SearchOutlined,
  SettingFilled,
  SlidersFilled
} from '@ant-design/icons';
import { SettingModal } from '../components/compositions/modal/SettingModal';
import { SortPopover } from '../components/elements/SortPopover';
import { useSearchParams } from 'react-router-dom';
import { SortQueryCategoryType, HowToSortQueryType } from '../types/TQuery';
import { MileStoneSelectModal } from '../components/compositions/modal/MileStoneSelectModal';
import { NewMileStoneModal } from '../components/compositions/modal/NewMileStoneModal';
import { Input } from '../../../components/element/input/Input';
import { Colors } from '../../../style/Colors';
import { EditMileStoneModal } from '../components/compositions/modal/EditMileStoneModal';
type TProps = {
  ticketList: TTicket[];
  mileStoneList: TGetMileStoneRes[];
};

export const List = ({
  ticketList,
  mileStoneList
}: TProps): React.JSX.Element => {
  const [searchParams, _] = useSearchParams();
  const querySortType = searchParams.get('sort');
  const queryCategory = searchParams.get('category');
  const [open, setOpen] = useState(false);
  const handleOpenChange = () => setOpen(!open);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  /**
   * チケットをステータスごとにフィルタリング
   * 件数に使用する
   */
  const notStartedTicketList = ticketList.filter(
    (ticket) => ticket.status === Status.NOT_STARTED
  );
  const underConstructionTicketList = ticketList.filter(
    (ticket) => ticket.status === Status.UNDER_CONSTRUCTION
  );
  const completedTicketList = ticketList.filter(
    (ticket) => ticket.status === Status.COMPLETED
  );

  // 優先度を数値にマッピングする関数
  const priorityToNumber = (priority: string): number => {
    switch (priority) {
      case Priority.HIGH:
        return 1;
      case Priority.MEDIUM:
        return 2;
      case Priority.LOW:
        return 3;
      default:
        return 4; // 未知の値は最低優先度とする
    }
  };

  // ソート
  const sortTicketList = (list: TTicket[]): TTicket[] => {
    // クエリパラメータから条件を取得する
    // 条件未設定の場合はそのまま返す
    if (!queryCategory || !querySortType) return list;
    return list.sort((a, b) => {
      let result = 0;
      switch (queryCategory) {
        case SortQueryCategoryType.CREATE_AT:
          // createdAtが存在しない場合の処理
          if (!a.createdAt) return 1; // aがnullならbを前に
          if (!b.createdAt) return -1; // bがnullならaを前に

          const createdAtA = new Date(a.createdAt);
          const createdAtB = new Date(b.createdAt);
          result = createdAtA.getTime() - createdAtB.getTime();
          break;

        case SortQueryCategoryType.LIMIT_DATE:
          if (!a.limitEndYm) return 1; // aがnullならbを前に
          if (!b.limitEndYm) return -1; // bがnullならaを前に

          const dateA = new Date(a.limitEndYm);
          const dateB = new Date(b.limitEndYm);
          result = dateA.getTime() - dateB.getTime();
          break;
        case SortQueryCategoryType.PRIORITY:
          const priorityA = priorityToNumber(a.priority);
          const priorityB = priorityToNumber(b.priority);
          result = priorityA - priorityB;
          break;
        default:
          return 0;
      }
      return querySortType === HowToSortQueryType.DESCENDING ? -result : result;
    });
  };

  // モーダル用のstate
  const [isOpenedNewCreateModal, setIsOpenedNewCreateModal] =
    useState<boolean>(false);
  const [isOpenedSettingModal, setIsOpenedSettingModal] =
    useState<boolean>(false);
  const [isOpenedMileStoneModal, setIsOpenedMileStoneModal] =
    useState<boolean>(false);
  const [isOpenedMileStoneSelectModal, setIsOpenedMileStoneSelectModal] =
    useState<boolean>(false);
  const [isOpenedEditMileStoneModal, setIsOpenedEditMileStoneModal] =
    useState<boolean>(false);

  // 各マイルストーンの開閉状態を管理するオブジェクト
  const [mileStoneOpenStates, setMileStoneOpenStates] = useState<{
    [uuid: string]: boolean;
  }>({});
  // マイルストーンの開閉状態をトグルする
  const toggleMileStone = (uuid: string) => {
    setMileStoneOpenStates((prev) => ({
      ...prev,
      [uuid]: !prev[uuid] // 現在の開閉状態をトグル
    }));
  };

  // useEffectで最初にマイルストーンを開いた状態にする
  useEffect(() => {
    const initialOpenStates: { [uuid: string]: boolean } = {};
    mileStoneList.forEach((mileStone) => {
      initialOpenStates[mileStone.uuid] = true; // 全てのマイルストーンを開いた状態にする
    });
    initialOpenStates['unassigned'] = true;
    setMileStoneOpenStates(initialOpenStates);
  }, [mileStoneList]); // mileStoneListが変わるたびに再実行

  // フィルタリングされたチケットリスト
  const filteredKeywordTicketList = ticketList.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  // 新規作成ボタン押下時にモーダルを開く
  const handleNewCreateClick = (): void => {
    setIsOpenedNewCreateModal(true);
  };
  const handleSettingClick = (): void => {
    setIsOpenedSettingModal(true);
  };
  const handleMileStoneSelectClick = (): void => {
    setIsOpenedMileStoneSelectModal(true);
  };
  const handleOpenNewMileStoneModal = () => {
    setIsOpenedMileStoneModal(true);
  };
  const handleOpenEditMileStoneModal = () => {
    setIsOpenedEditMileStoneModal(true);
  };

  return (
    <>
      <StyledListFlexContainer vertical gap={16}>
        <StyledListDataFlex justify="space-between" align="center">
          <Flex gap={8}>
            未着手 {notStartedTicketList.length}件 着手中{'  '}
            {underConstructionTicketList.length}件 完了{'  '}
            {completedTicketList.length}件 / 全{ticketList && ticketList.length}
            件
          </Flex>
          <Flex gap={8}>
            <StyledSearchInput
              placeholder="検索"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              $visible={searchVisible}
            />
            <Tooltip title="キーワードで検索">
              {searchVisible ? (
                <StyledCloseOutlined
                  onClick={() => {
                    setSearchVisible(false);
                    setSearchValue('');
                  }}
                />
              ) : (
                <StyledSearchOutlined onClick={() => setSearchVisible(true)} />
              )}
            </Tooltip>
            <Tooltip title="チケットを新規作成">
              <StyledPlusCircleFilled onClick={handleNewCreateClick} />
            </Tooltip>
            <Tooltip title="マイルストーンを設定">
              <StyledFlagFilled onClick={handleMileStoneSelectClick} />
            </Tooltip>
            <SortPopover open={open} setOpen={setOpen}>
              <Tooltip title="並び替え">
                <StyledSlidersFilled onClick={() => handleOpenChange()} />
              </Tooltip>
            </SortPopover>
            <Tooltip title="設定">
              <StyledSettingFilled onClick={handleSettingClick} />
            </Tooltip>
          </Flex>
        </StyledListDataFlex>

        <Flex vertical gap={24}>
          {mileStoneList.map((mileStone) => {
            // マイルストーンが設定されている完了していないチケットをフィルター
            const filteredTicketList = filteredKeywordTicketList
              .filter((ticket) => ticket.status !== Status.COMPLETED)
              .filter((ticket) => ticket.mileStoneUuid === mileStone.uuid);
            // チケットがない場合はスキップ
            if (filteredTicketList.length === 0) {
              return null;
            }
            const isOpen = mileStoneOpenStates[mileStone.uuid] || false; // 開閉状態の取得（デフォルトは閉じる）

            return (
              <Flex vertical gap={8} key={mileStone.uuid}>
                <CategoryLabel
                  label={mileStone.name}
                  subText={mileStone.version || ''}
                  onClick={() => toggleMileStone(mileStone.uuid)} // カテゴリクリックでトグル
                  defaultOpenState={false}
                  mode="accordion"
                />
                <StyledTicketList
                  vertical
                  gap={2}
                  $show={isOpen} // 開閉状態に基づく表示
                  $height={filteredTicketList.length || 0}
                >
                  {sortTicketList(filteredTicketList).map((ticket) => (
                    <TicketListItem
                      ticket={ticket}
                      key={ticket.ticketId}
                      searchedValue={searchValue}
                    />
                  ))}
                </StyledTicketList>
              </Flex>
            );
          })}
          <Flex vertical gap={8}>
            <CategoryLabel
              label="マイルストーン未設定"
              onClick={() => toggleMileStone('unassigned')} // 未設定のマイルストーン用トグル
              defaultOpenState={
                !(
                  ticketList
                    .filter((ticket) => ticket.status !== Status.COMPLETED)
                    .filter((ticket) => !ticket.mileStoneUuid).length > 0
                )
              }
              mode="accordion"
            />
            <StyledTicketList
              vertical
              gap={2}
              $show={mileStoneOpenStates['unassigned'] || false} // 未設定の開閉状態
              $height={
                ticketList
                  .filter((ticket) => ticket.status !== Status.COMPLETED)
                  .filter((ticket) => !ticket.mileStoneUuid).length || 0
              }
            >
              {sortTicketList(
                filteredKeywordTicketList
                  .filter((ticket) => ticket.status !== Status.COMPLETED)
                  .filter((ticket) => !ticket.mileStoneUuid)
              ).map((ticket) => (
                <TicketListItem
                  ticket={ticket}
                  key={ticket.ticketId}
                  searchedValue={searchValue}
                />
              ))}
            </StyledTicketList>
          </Flex>
          <Flex vertical gap={8}>
            <CategoryLabel
              label="完了したチケット"
              onClick={() => toggleMileStone('completed')}
              defaultOpenState={
                ticketList
                  .filter((ticket) => ticket.status === Status.COMPLETED)
                  .filter((ticket) => !ticket.mileStoneUuid).length > 0
              }
              mode="accordion"
            />
            <StyledTicketList
              vertical
              gap={2}
              $show={mileStoneOpenStates['completed'] || false}
              $height={
                ticketList
                  .filter((ticket) => ticket.status === Status.COMPLETED)
                  .filter((ticket) => !ticket.mileStoneUuid).length || 0
              }
            >
              {filteredKeywordTicketList
                .filter((ticket) => ticket.status === Status.COMPLETED)
                .map((ticket) => (
                  <TicketListItem
                    ticket={ticket}
                    key={ticket.ticketId}
                    searchedValue={searchValue}
                  />
                ))}
            </StyledTicketList>
          </Flex>
        </Flex>
      </StyledListFlexContainer>
      <CreateModal
        isOpenedNewCreateModal={isOpenedNewCreateModal}
        setIsOpenedNewCreateModal={setIsOpenedNewCreateModal}
      />
      <SettingModal
        isOpened={isOpenedSettingModal}
        setIsOpened={setIsOpenedSettingModal}
        title={'設定'}
      />
      <MileStoneSelectModal
        isOpened={isOpenedMileStoneSelectModal}
        setIsOpened={setIsOpenedMileStoneSelectModal}
        title={'マイルストーン設定'}
        handleOpenNewMileStoneModal={handleOpenNewMileStoneModal}
        handleOpenEditMileStoneModal={handleOpenEditMileStoneModal}
      />
      <NewMileStoneModal
        isOpened={isOpenedMileStoneModal}
        setIsOpened={setIsOpenedMileStoneModal}
        setIsSelectModalOpened={setIsOpenedMileStoneSelectModal}
        title={'新規マイルストーンの作成'}
        tickets={ticketList}
      />
      <EditMileStoneModal
        isOpened={isOpenedEditMileStoneModal}
        setIsOpened={setIsOpenedEditMileStoneModal}
        mileStoneList={mileStoneList}
        title={'設定済みマイルストーンを編集'}
      />
    </>
  );
};

const StyledListFlexContainer = styled(Flex)`
  max-width: 50vw;
  min-width: 50vw;
`;

const StyledListDataFlex = styled(Flex)`
  ${mixinTextColor}
`;

const StyledTicketList = styled(Flex)<{ $show: boolean; $height: number }>`
  padding-left: 32px;
  /* 70は1チケットあたりの高さ */
  max-height: ${(props) => (props.$show ? `${props.$height * 70}px` : '0')};
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
`;

const StyledPlusCircleFilled = styled(PlusCircleFilled)`
  ${mixinNormalFontSize24px}
`;
const StyledFlagFilled = styled(FlagFilled)`
  ${mixinNormalFontSize24px}
`;
const StyledSlidersFilled = styled(SlidersFilled)`
  ${mixinNormalFontSize24px}
`;

const StyledSettingFilled = styled(SettingFilled)`
  ${mixinNormalFontSize24px}
`;

const StyledSearchInput = styled(Input)<{ $visible: boolean }>`
  width: ${(props) => (props.$visible ? '200px' : '0px')};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition:
    width 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  overflow: hidden;
  /* プレースホルダーとアイコンの位置調整 */
  .ant-input-prefix {
    margin-right: 8px;
  }
  ${mixinBgTextDark}
  &:hover,&:focus {
    ${mixinBgTextDark}
  }

  &::placeholder {
    color: ${Colors.TEXT};
    opacity: 1;
  }
`;
const StyledSearchOutlined = styled(SearchOutlined)`
  ${mixinNormalFontSize24px}
`;
const StyledCloseOutlined = styled(CloseOutlined)`
  ${mixinNormalFontSize24px}
`;
