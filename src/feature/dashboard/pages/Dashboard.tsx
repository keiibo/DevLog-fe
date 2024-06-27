import React from 'react';
import { styled } from 'styled-components';
import { FormItem } from '../../../components/element/form/FormItem';
import { Select } from '../../../components/element/select/Select';
import { Option } from '../../../components/element/select/Option';
import { Button } from '../../../components/element/button/Button';
import { Tab } from '../../../components/element/tab/Tab';
import { Colors } from '../../../constant/Colors';

export const Dashboard = (): React.JSX.Element => {
  const tabItems = [
    {
      label: 'DashBoard',
      key: '1',
      children: <StyledTabContent>dsafdsa</StyledTabContent>
    },
    {
      label: 'Ticket',
      key: '2',
      children: <StyledTabContent>aaa</StyledTabContent>
    },
    {
      label: 'Diary',
      key: '3',
      children: <StyledTabContent>fsdafdas</StyledTabContent>
    }
  ];
  return (
    <StyledDashboardContainer>
      <StyledSelectContainer>
        <FormItem label="プロジェクト名">
          <StyledSelect>
            <Option value={1}>プロジェクトの名前1</Option>
            <Option value={2}>プロジェクトの名前2</Option>
            <Option value={3}>プロジェクトの名前3</Option>
          </StyledSelect>
        </FormItem>
        <Button type="primary">プロジェクトの新規作成</Button>
      </StyledSelectContainer>
      <StyledDashboard>
        <StyledTab
          defaultActiveKey="1"
          type="card"
          items={tabItems}
          size="large"
        />
      </StyledDashboard>
    </StyledDashboardContainer>
  );
};

const StyledDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

const StyledSelect = styled(Select)`
  min-width: 240px;
`;

const StyledSelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDashboard = styled.div``;

const StyledTab = styled(Tab)`
  margin: 0;
`;

const StyledTabContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  min-height: 704px;
  background-color: ${Colors.TEXT};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
`;
