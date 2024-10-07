import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../../components/element/modal/Modal';
import { ModalHeader } from '../../../../../components/element/modal/ModalHeader';
import { ModalBody } from '../../../../../components/element/modal/ModalBody';
import styled from 'styled-components';
import { Flex, Table, Input, Button } from 'antd';
import { mixinNormalFontSize24px } from '../../../../../style/Mixin';
import { MultiLineText } from '../../../../../components/composition/MultiLineText';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../../../../constant/QueryKey';
import { getMileStones } from '../../../api/mileStone';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../../../components/element/loading/Loading';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type TProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

export const EditMileStoneModal = ({
  isOpened,
  setIsOpened,
  title
}: TProps): React.JSX.Element => {
  const { id } = useParams();
  const { data: mileStoneList } = useQuery({
    queryKey: [QueryKey.MILESTONE_LIST],
    queryFn: () => getMileStones(id || '')
  });

  const [editingKey, setEditingKey] = useState<string | null>(null);

  if (!mileStoneList) return <Loading />;

  const dataSource = mileStoneList.map((mileStone) => ({
    key: mileStone.uuid,
    name: mileStone.name,
    version: mileStone.version,
    editable: editingKey === mileStone.uuid
  }));

  const [data, setData] = useState(dataSource);

  useEffect(() => {
    setData(dataSource);
  }, [mileStoneList, editingKey]);

  const handleFieldChange = (
    value: string,
    fieldName: 'name' | 'version',
    key: string
  ) => {
    const newData = [...data];
    const target = newData.find((item) => item.key === key);
    if (target) {
      target[fieldName] = value;
      setData(newData);
    }
  };

  const edit = (key: string) => {
    setEditingKey(key);
  };

  const save = async () => {};

  const cancel = () => {
    setEditingKey(null);
    setData(dataSource);
  };

  const deleteMileStone = async () => {};

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
              <Button type="primary" onClick={() => save()}>
                保存
              </Button>
              <Button type="primary" onClick={() => cancel()}>
                キャンセル
              </Button>
            </>
          ) : (
            <>
              <EditOutlined onClick={() => edit(record.key)} />
              <DeleteOutlined onClick={() => deleteMileStone()} />
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
            dataSource={data}
            columns={columns}
            scroll={{ y: 300 }}
            pagination={false}
          />
          <Flex justify="center">
            <Button type="primary">保存</Button>
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
