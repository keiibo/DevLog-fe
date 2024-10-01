import { Flex, Popover } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  mixinBgMainLight,
  mixinBoldFontSize16px,
  mixinBorderRadius8px,
  mixinTextColor
} from '../../../../style/Mixin';
import { LinkIcon } from './LinkIcon';
import { Form } from '../../../../components/element/form/Form';
import { FormItem } from '../../../../components/element/form/FormItem';
import { Input } from '../../../../components/element/input/Input';
import { Colors } from '../../../../style/Colors';
import { Button } from '../../../../components/element/button/Button';
import { Select } from '../../../../components/element/select/Select';
import { Option } from '../../../../components/element/select/Option';
import { IconType, TIconType } from '../../../../components/element/icon/Icon';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../../components/element/loading/Loading';
import {
  TDeleteLinkIconReq,
  TLinkIcon,
  TPostLinkIconsReq
} from '../../types/TDetail';
import { useMutation } from '@tanstack/react-query';
import { deleteLinkIcon, postLinkIcons } from '../../api/detail';
import { DeleteFilled } from '@ant-design/icons';
import { v4 } from 'uuid';
import { ConfirmDeleteModal } from '../../../../components/composition/modal/ConfirmDeleteModal';

type TProps = {
  linkIconList: TLinkIcon[];
  setLinkIcon: TLinkIcon;
  onOk: () => void;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  hasDelete: boolean;
};

export const LinkIconSettingTooltip = ({
  linkIconList,
  setLinkIcon,
  onOk,
  isOpen,
  setIsOpened,
  children,
  hasDelete
}: TProps): React.JSX.Element => {
  const [form] = useForm();
  const [iconValue, setIconValue] = useState<TIconType>();
  const { id } = useParams();
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);

  if (!id) <Loading />;

  const postLinkIconMutation = useMutation({
    mutationFn: postLinkIcons,
    onSuccess: () => {
      onOk();
      form.resetFields();
      setIconValue('none');
    }
  });

  const handleSaveLinkIcon = () => {
    const newIcon = {
      name: form.getFieldValue('name'),
      url: form.getFieldValue('url'),
      iconType: form.getFieldValue('iconType'),
      uuid: setLinkIcon.uuid || v4()
    };

    let updatedLinkIconList;

    if (setLinkIcon.uuid) {
      // 編集の場合：既存のアイコンを更新
      updatedLinkIconList = linkIconList.map((icon) =>
        icon.uuid === setLinkIcon.uuid ? newIcon : icon
      );
    } else {
      // 新規作成の場合：新しいアイコンを追加
      updatedLinkIconList = [...linkIconList, newIcon];
    }

    const req: TPostLinkIconsReq = {
      projectId: id || '',
      linkIconList: updatedLinkIconList
    };

    postLinkIconMutation.mutate(req);
  };

  const mutation = useMutation({
    mutationFn: deleteLinkIcon,
    onSuccess: () => {
      onOk();
      setIsOpenedDeleteModal(false);
    },
    onError: () => {}
  });

  const handleDelete = () => {
    const req: TDeleteLinkIconReq = {
      projectId: id || '',
      uuid: setLinkIcon.uuid
    };

    mutation.mutate(req);
  };

  const popoverContent = (
    <StyledFlex gap={24} align="center" justify="center">
      <Flex align="center">
        <LinkIcon
          type={iconValue || 'none'}
          isInTooltip
          uuid={setLinkIcon.uuid}
        />
      </Flex>
      <Flex vertical>
        <Flex justify="end">
          {hasDelete && (
            <StyledDeleteOutlined
              onClick={() => {
                setIsOpened(false);
                setIsOpenedDeleteModal(true);
              }}
            />
          )}
        </Flex>
        <Form onFinish={handleSaveLinkIcon} form={form}>
          <StyledFormItem
            label="名前"
            name="name"
            initialValue={setLinkIcon.name}
          >
            <StyleInput />
          </StyledFormItem>
          <StyledFormItem label="URL" name="url" initialValue={setLinkIcon.url}>
            <StyleInput />
          </StyledFormItem>
          <StyledFormItem
            label="アイコン"
            name="iconType"
            initialValue={
              setLinkIcon.iconType === IconType.PLUS ? '' : setLinkIcon.iconType
            }
          >
            <StyledSelect
              value={iconValue}
              getPopupContainer={(trigger) => trigger.parentNode}
              onChange={(value) => setIconValue(value)}
            >
              {Object.values(IconType).map((iconType) => (
                <Option key={iconType} value={iconType}>
                  {iconType}
                </Option>
              ))}
            </StyledSelect>
          </StyledFormItem>

          <Flex justify="end">
            <Button type="primary" htmlType="submit">
              OK
            </Button>
          </Flex>
        </Form>
      </Flex>
    </StyledFlex>
  );

  return (
    <>
      <Popover
        content={popoverContent}
        trigger="click"
        placement="top"
        open={isOpen}
      >
        {children}
      </Popover>{' '}
      {isOpenedDeleteModal && (
        <ConfirmDeleteModal
          isOpened={isOpenedDeleteModal}
          confirmMessage={`アイコン「${setLinkIcon.name}」を削除してよろしいですか？`}
          handleClose={() => setIsOpenedDeleteModal(false)}
          handleCancel={() => setIsOpenedDeleteModal(false)}
          handleDelete={handleDelete}
          width={'640px'}
        />
      )}
    </>
  );
};

const StyledFlex = styled(Flex)`
  width: 360px;
  border: 1px solid ${Colors.TEXT};
  z-index: 10000;
  padding: 16px 8px;
  ${mixinBgMainLight}
  ${mixinBorderRadius8px}
`;

const StyledDeleteOutlined = styled(DeleteFilled)`
  ${mixinTextColor}
  ${mixinBoldFontSize16px}
  cursor: pointer;
`;

const StyledFormItem = styled(FormItem)`
  width: 100%;
  align-items: center;
  .ant-form-item-label {
    display: flex;
    align-items: center;
  }
  margin-bottom: 12px;
`;

const StyleInput = styled(Input)`
  width: 100%;
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${Colors.TEXT};
  padding: 0 6px;
  ${mixinTextColor}

  &:hover,
  &:active,
  &:focus {
    background-color: transparent;
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;
  border: none;
  border-radius: 0;

  padding: 0 6px;

  && .ant-select-selector {
    background: none;
    border: none;
    border-bottom: 1px solid ${Colors.TEXT};
    border-radius: 0;
    padding: 0;

    ${mixinTextColor}
  }
  && .ant-select-arrow {
    color: ${Colors.TEXT};
    margin: 0 2px;
    &:hover,
    &:active,
    &:focus {
      border: none;
    }
  }

  &:hover,
  &:active,
  &:focus {
    background-color: transparent;
  }
`;
