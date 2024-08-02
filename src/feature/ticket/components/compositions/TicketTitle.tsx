import { Flex } from 'antd';
import React from 'react';
import { Id } from '../elements/Id';
import { mixinMargin0 } from '../../../../style/Mixin';
import { styled } from 'styled-components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TLabelColorType } from '../../types/TTicket';
import { getTitleTextColor } from '../../lib/labelColor';
import { Input } from '../../../../components/element/input/Input';
import FormItem from 'antd/es/form/FormItem';

type TProps = {
  id: string;
  title: string;
  isDeletable?: boolean;
  mode: 'detail' | 'list';
  labelColorType: TLabelColorType;
  isEditable?: boolean;
  isEditMode?: boolean;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TicketTitle = ({
  id,
  title,
  isDeletable = false,
  mode,
  labelColorType,
  isEditable = false,
  isEditMode = false,
  setIsEditMode
}: TProps): React.JSX.Element => {
  const handleClickEditButton = (): void => {
    if (setIsEditMode) {
      setIsEditMode(true);
    }
  };
  return (
    <StyledFlex $mode={mode} align="center" justify="space-between" gap={8}>
      <StyledLeftFlex gap={8} align="center">
        <StyledId id={id} />
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
        <StyledIcon>{isDeletable && <DeleteOutlined />}</StyledIcon>
        {isEditable && (
          <StyledIcon onClick={handleClickEditButton}>
            <EditOutlined />
          </StyledIcon>
        )}
      </Flex>
    </StyledFlex>
  );
};

const StyledFlex = styled(Flex)<{ $mode: string }>`
  /* TODO.Mixin対応できるかどうか */
  font-size: ${({ $mode }) => ($mode === 'detail' ? '24px' : '16px')};
`;
const StyledId = styled(Id)`
  flex: 2;
`;
const StyledTitleContainer = styled(Flex)`
  flex: 8;
`;
const StyledTitle = styled.h4<{
  $mode: string;
  $labelColorType: TLabelColorType;
}>`
  color: ${({ $mode, $labelColorType }) =>
    getTitleTextColor($mode, $labelColorType)};
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
