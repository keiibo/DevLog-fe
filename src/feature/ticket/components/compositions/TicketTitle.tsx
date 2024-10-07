import { Flex } from 'antd';
import React, { useState } from 'react';
import { mixinMargin0 } from '../../../../style/Mixin';
import { styled } from 'styled-components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TLabelColorType } from '../../types/TTicket';
import { getTitleTextColor } from '../../lib/labelColor';
import { Input } from '../../../../components/element/input/Input';
import FormItem from 'antd/es/form/FormItem';
import { ConfirmDeleteModal } from '../../../../components/composition/modal/ConfirmDeleteModal';

type TProps = {
  id: string;
  title: string;
  isDeletable?: boolean;
  mode: 'detail' | 'list';
  labelColorType: TLabelColorType;
  isEditable?: boolean;
  isEditMode?: boolean;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete?: () => void;
};

export const TicketTitle = ({
  title,
  isDeletable = false,
  mode,
  labelColorType,
  isEditable = false,
  isEditMode = false,
  setIsEditMode,
  handleDelete
}: TProps): React.JSX.Element => {
  const [isDeleteModalOpened, setIsDeleteModalOpened] =
    useState<boolean>(false);

  const handleClickEditButton = (): void => {
    if (setIsEditMode) {
      setIsEditMode(true);
    }
  };

  const deleteTicket = () => {
    if (handleDelete) {
      handleDelete();
    }
  };

  return (
    <>
      <StyledFlex $mode={mode} align="center" justify="space-between" gap={8}>
        <StyledLeftFlex gap={8} align="center">
          <StyledTitleContainer gap={8}>
            {isEditMode ? (
              <FormItem
                noStyle
                initialValue={title}
                name={'title'}
                rules={[
                  {
                    required: true,
                    message: '必須項目です'
                  }
                ]}
              >
                <StyledInput />
              </FormItem>
            ) : (
              <StyledTitle $mode={mode} $labelColorType={labelColorType}>
                {title}
              </StyledTitle>
            )}
          </StyledTitleContainer>
        </StyledLeftFlex>
        <Flex gap={8}>
          <StyledIcon>
            {isDeletable && (
              <DeleteOutlined onClick={() => setIsDeleteModalOpened(true)} />
            )}
          </StyledIcon>
          {isEditable && (
            <StyledIcon onClick={handleClickEditButton}>
              <EditOutlined />
            </StyledIcon>
          )}
        </Flex>
      </StyledFlex>
      {isDeleteModalOpened && (
        <ConfirmDeleteModal
          isOpened={isDeleteModalOpened}
          confirmMessage={'チケットを削除してよろしいですか？'}
          handleClose={() => setIsDeleteModalOpened(false)}
          handleCancel={() => setIsDeleteModalOpened(false)}
          handleDelete={deleteTicket}
          width={'640px'}
        />
      )}
    </>
  );
};

const StyledFlex = styled(Flex)<{ $mode: string }>`
  /* TODO.Mixin対応できるかどうか */
  font-size: ${({ $mode }) => ($mode === 'detail' ? '24px' : '16px')};
`;

const StyledTitleContainer = styled(Flex)`
  flex: 8;
`;
const StyledTitle = styled.div<{
  $mode: string;
  $labelColorType: TLabelColorType;
}>`
  color: ${({ $mode, $labelColorType }) =>
    getTitleTextColor($mode, $labelColorType)};
  ${({ $mode }) =>
    $mode === 'list' &&
    `
    max-width: 32vw; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;  
  `}
  ${mixinMargin0};
`;

const StyledIcon = styled.div`
  cursor: pointer;
`;

const StyledLeftFlex = styled(Flex)`
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;
