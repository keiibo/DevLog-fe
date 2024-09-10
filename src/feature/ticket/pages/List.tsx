import React, { useEffect, useState } from 'react';
import { Priority, Status, TStatus, TTicket } from '../types/TTicket';
import { Flex, Tooltip } from 'antd';
import { CategoryLabel } from '../../../components/composition/categoryLabel/CategoryLabel';
import { TicketListItem } from '../components/compositions/TicketListItem';
import { styled } from 'styled-components';
import { CreateModal } from '../components/compositions/CreateModal';
import { mixinNormalFontSize24px, mixinTextColor } from '../../../style/Mixin';
import {
  PlusCircleFilled,
  SettingFilled,
  SlidersFilled
} from '@ant-design/icons';
import { SettingModal } from '../components/compositions/SettingModal';
import { SortPopover } from '../components/elements/SortPopover';
import { useSearchParams } from 'react-router-dom';
import { SortQueryCategoryType, HowToSortQueryType } from '../types/TQuery';
type TProps = {
  ticketList: TTicket[];
};

export const List = ({ ticketList }: TProps): React.JSX.Element => {
  const [searchParams, _] = useSearchParams();
  const querySortType = searchParams.get('sort');
  const queryCategory = searchParams.get('category');
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => setOpen(!open);

  const [notStartedTicketList, setNotStartedTicketList] = useState<TTicket[]>(
    []
  );
  const [underConstructionTicketList, setUnderConstructionTicketList] =
    useState<TTicket[]>([]);
  const [completedTicketList, setCompletedTicketList] = useState<TTicket[]>([]);

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

  // 初期orソート状態のチケットリストの用意
  useEffect(() => {
    setNotStartedTicketList(
      sortTicketList(
        ticketList &&
          ticketList.filter((ticket) => ticket.status === Status.NOT_STARTED)
      )
    );
    setUnderConstructionTicketList(
      sortTicketList(
        ticketList &&
          ticketList.filter(
            (ticket) => ticket.status === Status.UNDER_CONSTRUCTION
          )
      )
    );
    setCompletedTicketList(
      sortTicketList(
        ticketList &&
          ticketList.filter((ticket) => ticket.status === Status.COMPLETED)
      )
    );
  }, [queryCategory, querySortType, ticketList]);

  const [isOpenedNewCreateModal, setIsOpenedNewCreateModal] =
    useState<boolean>(false);
  const [isOpenedSettingModal, setIsOpenedSettingModal] =
    useState<boolean>(false);

  // 未着手カテゴリの開閉状態
  const [showNotStarted, setShowNotStarted] = useState(true);
  // 着手中
  const [showUnderConstruction, setShowUnderConstruction] = useState(true);
  // 完了
  const [showCompleted, setShowCompleted] = useState(true);

  // 新規作成ボタン押下時にモーダルを開く
  const handleNewCreateClick = (): void => {
    setIsOpenedNewCreateModal(true);
  };
  const handleSettingClick = (): void => {
    setIsOpenedSettingModal(true);
  };

  // 各ステータスの開閉状態をトグルする
  const toggleCategory = (status: TStatus): void => {
    switch (status) {
      case Status.NOT_STARTED:
        setShowNotStarted(!showNotStarted);
        break;
      case Status.UNDER_CONSTRUCTION:
        setShowUnderConstruction(!showUnderConstruction);
        break;
      case Status.COMPLETED:
        setShowCompleted(!showCompleted);
        break;
      default:
        break;
    }
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
            <Tooltip title="チケットを新規作成">
              <StyledPlusCircleFilled onClick={handleNewCreateClick} />
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
          {/* 未着手 */}
          <Flex vertical gap={8}>
            <CategoryLabel
              label={'未着手'}
              onClick={() => toggleCategory(Status.NOT_STARTED)}
              defaultOpenState={notStartedTicketList.length > 0 || false}
              mode="accordion"
            />
            <StyledTicketList
              vertical
              gap={2}
              $show={showNotStarted}
              $height={notStartedTicketList.length || 0}
            >
              {notStartedTicketList.map((ticket) => (
                <TicketListItem ticket={ticket} key={ticket.ticketId} />
              ))}
            </StyledTicketList>
          </Flex>
          {/* 着手中*/}
          <Flex vertical gap={8}>
            <CategoryLabel
              label={'着手中'}
              onClick={() => toggleCategory(Status.UNDER_CONSTRUCTION)}
              defaultOpenState={underConstructionTicketList.length > 0 || false}
              mode="accordion"
            />
            <StyledTicketList
              vertical
              gap={4}
              $show={showUnderConstruction}
              $height={underConstructionTicketList.length || 0}
            >
              {underConstructionTicketList.map((ticket) => (
                <TicketListItem ticket={ticket} key={ticket.ticketId} />
              ))}
            </StyledTicketList>
          </Flex>
          {/* 完了 */}
          <Flex vertical gap={8}>
            <CategoryLabel
              label={'完了'}
              onClick={() => toggleCategory(Status.COMPLETED)}
              defaultOpenState={completedTicketList.length > 0 || false}
              mode="accordion"
            />
            <StyledTicketList
              vertical
              gap={4}
              $show={showCompleted}
              $height={completedTicketList.length || 0}
            >
              {completedTicketList.map((ticket) => (
                <TicketListItem ticket={ticket} key={ticket.ticketId} />
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
const StyledSlidersFilled = styled(SlidersFilled)`
  ${mixinNormalFontSize24px}
`;

const StyledSettingFilled = styled(SettingFilled)`
  ${mixinNormalFontSize24px}
`;
