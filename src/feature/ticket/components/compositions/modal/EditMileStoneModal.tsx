import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../../components/element/modal/Modal';
import { ModalHeader } from '../../../../../components/element/modal/ModalHeader';
import { ModalBody } from '../../../../../components/element/modal/ModalBody';
import styled from 'styled-components';
import { Flex, Table, Input, Button, notification } from 'antd';
import { mixinNormalFontSize24px } from '../../../../../style/Mixin';
import { MultiLineText } from '../../../../../components/composition/MultiLineText';
import { Loading } from '../../../../../components/element/loading/Loading';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TGetMileStoneRes, TUpdateMileStoneReq } from '../../../types/TTicket';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMileStones } from '../../../api/mileStone';
import { NOTIFICATION_TIME } from '../../../../../constant/Notification';
import { QueryKey } from '../../../../../constant/QueryKey';
import { useParams } from 'react-router-dom';

type TProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  mileStoneList: TGetMileStoneRes[];
};

export const EditMileStoneModal = ({
  isOpened,
  setIsOpened,
  title,
  mileStoneList
}: TProps): React.JSX.Element => {
  const { id } = useParams();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const queryClient = useQueryClient();
  if (!mileStoneList) return <Loading />;

  const dataSource = mileStoneList.map((mileStone) => ({
    key: mileStone.uuid,
    name: mileStone.name,
    version: mileStone.version,
    editable: editingKey === mileStone.uuid
  }));

  const initialData = mileStoneList.map((mileStone) => ({
    key: mileStone.uuid,
    name: mileStone.name,
    version: mileStone.version,
    editable: false // 初期状態では編集不可
  }));

  const [mileStones, setMileStones] = useState(initialData);

  useEffect(() => {
    setMileStones(initialData);
  }, [mileStoneList]);

  const handleFieldChange = (
    value: string,
    fieldName: 'name' | 'version',
    key: string
  ) => {
    setMileStones((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [fieldName]: value } : item
      )
    );
  };

  const edit = (key: string) => {
    setMileStones((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, editable: true } : item
      )
    );
  };

  const save = (key: string) => {
    setMileStones((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, editable: false } : item
      )
    );
  };

  const cancel = () => {
    setEditingKey(null);
    setMileStones(dataSource);
  };

  const deleteMileStone = (key: string) => {
    // 状態から項目を削除
    setMileStones((prev) => prev.filter((item) => item.key !== key));
  };

  const mutation = useMutation({
    mutationFn: updateMileStones,
    onSuccess() {
      notification.success({
        message: `マイルストーンを更新しました`,
        duration: NOTIFICATION_TIME.SUCCESS // 通知が表示される時間（秒）
      });
      setIsOpened(false);
      queryClient.invalidateQueries({ queryKey: [QueryKey.MILESTONE_LIST] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.TICKET_LIST] });
    },
    onError() {
      notification.error({
        message: `マイルストーンの更新に失敗しました`,
        duration: NOTIFICATION_TIME.ERROR // 通知が表示される時間（秒）
      });
    }
  });

  const handleAllSave = () => {
    const updateMileStones = mileStones.map((mileStone) => {
      return {
        uuid: mileStone.key,
        name: mileStone.name,
        version: mileStone.version
      };
    });
    const req: TUpdateMileStoneReq = {
      projectId: id || '',
      updateMileStones
    };
    mutation.mutate(req);
  };

  const columns = [
    {
      title: 'マイルストーン名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => {
        return record.editable ? (
          <Input
            value={record.name}
            onChange={(e) =>
              handleFieldChange(e.target.value, 'name', record.key)
            }
          />
        ) : (
          text
        );
      }
    },
    {
      title: 'バージョン',
      dataIndex: 'version',
      key: 'version',
      width: '30%',
      render: (text: string, record: any) => {
        return record.editable ? (
          <Input
            value={record.version}
            onChange={(e) =>
              handleFieldChange(e.target.value, 'version', record.key)
            }
          />
        ) : (
          text
        );
      }
    },
    {
      title: '',
      dataIndex: 'setting',
      key: 'setting',
      width: '20%',
      render: (_: any, record: any) => (
        <Flex gap={8}>
          {record.editable ? (
            <>
              <Button type="primary" onClick={() => save(record.key)}>
                保存
              </Button>
              <Button type="primary" onClick={() => cancel()}>
                キャンセル
              </Button>
            </>
          ) : (
            <>
              <EditOutlined onClick={() => edit(record.key)} />
              <DeleteOutlined onClick={() => deleteMileStone(record.key)} />
            </>
          )}
        </Flex>
      )
    }
  ];

  return (
    <Modal
      open={isOpened}
      footer={false}
      width={800}
      destroyOnClose
      closeIcon={false}
      onCancel={() => {
        setIsOpened(false);
      }}
    >
      <ModalHeader
        title={title}
        hasCloseIcon
        onClickCloseButton={() => {
          setIsOpened(false);
        }}
      />
      <ModalBody>
        <Flex vertical gap={8}>
          <StyledSubTitle>設定済みマイルストーン</StyledSubTitle>
          <MultiLineText
            text={`ここから設定済みのマイルストーンを編集できます。
マイルストーンを削除すると、紐付いているチケットのマイルストーンは未設定状態になります。
※「保存」ボタンを押さないと変更が反映されませんのでご注意ください。`}
          />
          <Table
            dataSource={mileStones}
            columns={columns}
            scroll={{ y: 300 }}
            pagination={false}
          />
          <Flex justify="center">
            <Button
              type="primary"
              onClick={handleAllSave}
              disabled={editingKey != null}
            >
              保存
            </Button>
          </Flex>
        </Flex>
      </ModalBody>
    </Modal>
  );
};

const StyledSubTitle = styled.h3`
  ${mixinNormalFontSize24px}
  font-weight: 100;
  margin: 0;
`;
