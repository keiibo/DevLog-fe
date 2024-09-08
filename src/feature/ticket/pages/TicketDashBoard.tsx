import { Flex } from 'antd';
import React from 'react';
import {
  CategoryLabel,
  CategoryLabelMode
} from '../../../components/composition/categoryLabel/CategoryLabel';

// #DVLG-41
export const TicketDashBoard = (): React.JSX.Element => {
  return (
    <Flex>
      <div>
        <CategoryLabel
          mode={CategoryLabelMode.NONE}
          label="ウィークリーボード"
        ></CategoryLabel>
      </div>
    </Flex>
  );
};
