import React from 'react';
import { styled } from 'styled-components';
import { FormItem } from '../../../components/element/form/FormItem';
import { Select } from '../../../components/element/select/Select';
import { Option } from '../../../components/element/select/Option';
import { Button } from '../../../components/element/button/Button';

export const Dashboard = (): React.JSX.Element => {
  return (
    <StyledDashBoardContainer>
      <StyledProjectDisplay>
        <FormItem label="プロジェクト名">
          <StyledSelect>
            <Option value={1}>プロジェクトの名前1</Option>
            <Option value={2}>プロジェクトの名前2</Option>
            <Option value={3}>プロジェクトの名前3</Option>
          </StyledSelect>
        </FormItem>
        <Button type="primary">プロジェクトの新規作成</Button>
      </StyledProjectDisplay>
    </StyledDashBoardContainer>
  );
};

const StyledDashBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

const StyledSelect = styled(Select)`
  min-width: 240px;
`;

const StyledProjectDisplay = styled.div`
  display: flex;
  justify-content: space-between;
`;
