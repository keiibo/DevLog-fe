import React, { SetStateAction, useState } from 'react';
import { ConfigProvider, Flex, Menu, Popover } from 'antd';
import { TMenuItem } from '../../../../types/TMenuItem';
import { styled } from 'styled-components';
import { Colors } from '../../../../style/Colors';
import { Button } from '../../../../components/element/button/Button';
import { useSearchParams } from 'react-router-dom';
import { HowToSortQueryType, SortQueryCategoryType } from '../../types/TQuery';

type TProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const SortPopover = ({
  children,
  open,
  setOpen
}: TProps): React.JSX.Element => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [_, setSearchParams] = useSearchParams();

  const hide = () => setOpen(false);

  const menuItem = [
    {
      key: 'category',
      type: 'group',
      label: '種類:',
      children: [
        { key: SortQueryCategoryType.CREATE_AT, label: '作成日' },
        { key: SortQueryCategoryType.LIMIT_DATE, label: '期限日' },
        { key: SortQueryCategoryType.PRIORITY, label: '優先度' }
      ]
    },
    { type: 'divider' },
    {
      key: 'howToSort',
      type: 'group',
      label: '並び順:',
      children: [
        { key: HowToSortQueryType.DESCENDING, label: '降順' },
        { key: HowToSortQueryType.ASCENDING, label: '昇順' }
      ]
    }
  ];

  // グループ内で1つだけ選択するための関数
  const handleSelect = ({ key }: { key: string }) => {
    // 現在選択されているグループを確認
    const newSelectedKeys = [...selectedKeys];
    const groupKey = menuItem.find(
      (group) =>
        group.children && group.children.some((item) => item.key === key)
    )?.key;

    // 同じグループの選択を解除
    newSelectedKeys.forEach((itemKey, index) => {
      if (
        menuItem
          .find((group) => group.key === groupKey)
          ?.children?.some((item) => item.key === itemKey)
      ) {
        newSelectedKeys.splice(index, 1);
      }
    });

    // 新しいキーを追加
    newSelectedKeys.push(key);
    setSelectedKeys(newSelectedKeys);
  };

  // ok押下時の処理
  const handleOk = () => {
    // 各グループから少なくとも一つのキーが選択されているか確認
    const allGroupsSelected = menuItem.every((group) => {
      if (!group.children || group.children.length === 0) {
        return true; // 選択項目がなければ、そのグループは自動的に選択済みとする
      }

      // group.children.some() を使って、selectedKeys に含まれるキーがあるかをチェック
      const isSelectedInGroup = group.children.some((item) =>
        selectedKeys.includes(item.key)
      );

      return isSelectedInGroup;
    });

    if (!allGroupsSelected) {
      alert('TODO');
      return;
    }

    // 選択されたキーをクエリパラメータとしてURLに追加する
    const newSearchParams = new URLSearchParams();
    selectedKeys.forEach((key) => {
      if (
        key === HowToSortQueryType.DESCENDING ||
        key === HowToSortQueryType.ASCENDING
      ) {
        newSearchParams.append('sort', key);
        return;
      }
      newSearchParams.append('category', key);
    });

    setSearchParams(newSearchParams); // URLのクエリパラメータを更新

    hide();
  };

  const handleClear = () => {
    // クエリパラメータを全て削除
    setSearchParams(new URLSearchParams());
    // 選択されたキーもリセット
    setSelectedKeys([]);
    hide();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemActiveBg: Colors.TEXT,
            itemSelectedBg: Colors.TEXT,
            itemBorderRadius: 8,
            groupTitleColor: Colors.MAIN,
            groupTitleFontSize: 16,
            itemHeight: 24
          }
        }
      }}
    >
      <StyledPopover
        open={open}
        content={
          <>
            <StyledMenu
              multiple
              mode={'inline'}
              items={menuItem as TMenuItem[]}
              defaultOpenKeys={['category', 'howToSort']} // このキーを持つサブメニューは常に開いた状態
              onOpenChange={() => {}} // サブメニューを閉じる操作を無効化
              onSelect={handleSelect}
              selectedKeys={selectedKeys}
            />
            <Flex justify="center" gap={4}>
              <Button type={'primary'} onClick={handleClear}>
                全てクリア
              </Button>
              <Button type={'primary'} onClick={handleOk}>
                OK
              </Button>
            </Flex>
          </>
        }
        trigger="click"
        placement="bottom"
      >
        {/* ボタンなど、openのきっかけになるNode */}
        {children}
      </StyledPopover>
    </ConfigProvider>
  );
};

const StyledMenu = styled(Menu)`
  min-width: 200px;
  flex: auto;
  background-color: transparent;
`;

const StyledPopover = styled(Popover)``;
