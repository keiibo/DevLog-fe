import { Flex } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CategoryLabel,
  CategoryLabelMode
} from '../../../components/composition/categoryLabel/CategoryLabel';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import styled from 'styled-components';
import { Colors } from '../../../style/Colors';
import {
  mixinBgMainLight,
  mixinNormalFontSize16px,
  mixinPadding12px,
  mixinTextColor
} from '../../../style/Mixin';
import { Status, TTicket } from '../types/TTicket';

type TProps = {
  ticketList: TTicket[];
};
// #DVLG-41
export const TicketDashBoard = ({ ticketList }: TProps): React.JSX.Element => {
  const [weekData, setWeekData] = useState<{ name: string; count: number }[]>(
    []
  );
  const [maxCount, setMaxCount] = useState(5); // 縦軸の最大値の初期値は5

  useEffect(() => {
    const currentWeekData = getCurrentWeekData(ticketList);
    setWeekData(currentWeekData);

    // データ群の最大件数を取得
    const maxDataCount = Math.max(...currentWeekData.map((data) => data.count));
    setMaxCount(maxDataCount < 5 ? 5 : maxDataCount); // 5未満の場合は5を設定
  }, [ticketList]);

  // 今週の日付を取得してチケットをカウントする
  const getCurrentWeekData = useCallback((tickets: TTicket[]) => {
    const now = new Date();
    const sunday = new Date(now.setDate(now.getDate() - now.getDay()));
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + i);
      return {
        name: day.toLocaleDateString('ja-JP', {
          month: '2-digit',
          day: '2-digit'
        }),
        count: 0 // 初期値は0
      };
    });

    // 完了したチケットのcompletedAtを日ごとに集計
    tickets
      .filter(
        (ticket) => ticket.status === Status.COMPLETED && ticket.completedAt
      )
      .forEach((ticket) => {
        const completedDate =
          ticket.completedAt &&
          new Date(ticket.completedAt).toLocaleDateString('ja-JP', {
            month: '2-digit',
            day: '2-digit'
          });
        const dayData = days.find((d) => d.name === completedDate);
        if (dayData) {
          dayData.count += 1; // 件数をカウント
        }
      });

    return days;
  }, []);

  // X軸のラベルの色を日曜は赤、土曜は青にする
  const renderCustomizedTick = (tickProps: any) => {
    const { x, y, payload } = tickProps;
    const isSunday = payload.value === weekData[0]?.name;
    const isSaturday = payload.value === weekData[6]?.name;

    let fill: string = Colors.TEXT; // デフォルトの色
    if (isSunday) fill = 'red';
    if (isSaturday) fill = 'blue';

    return (
      <text x={x} y={y + 10} textAnchor="middle" fill={fill}>
        {payload.value}
      </text>
    );
  };

  const getMessage = (): string => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 日曜: 0, 月曜: 1, ..., 土曜: 6

    if (dayOfWeek >= 0 && dayOfWeek <= 1) {
      return '週の始まりですね。頑張りましょう！';
    } else if (dayOfWeek >= 2 && dayOfWeek <= 3) {
      return '週の中間に入りました。あと少し頑張ってください！';
    } else if (dayOfWeek >= 4 && dayOfWeek <= 6) {
      return '週の終わりが近づいてきました。もうひと踏ん張りです！';
    } else {
      return '日付が不正です。';
    }
  };

  return (
    <Flex style={{ width: '100%' }}>
      <Flex vertical style={{ width: '100%' }}>
        <CategoryLabel
          mode={CategoryLabelMode.NONE}
          label="ウィークリーボード"
        />
        <Flex vertical>
          <StyledChartContainer>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weekData}>
                <XAxis dataKey="name" tick={renderCustomizedTick} />
                <YAxis domain={[0, maxCount]} tick={{ fill: Colors.TEXT }} />
                <Tooltip />
                <Bar dataKey="count" fill={Colors.TEXT} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
            <StyledMessageContainer>
              <p>
                完了した件数を表示しています。 今週は
                {
                  ticketList.filter(
                    (ticket) =>
                      ticket.completedAt && ticket.status === Status.COMPLETED
                  ).length
                }
                件のチケットを完了にしました！
              </p>
              <p>{getMessage()}</p>
            </StyledMessageContainer>
          </StyledChartContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

const StyledChartContainer = styled.div`
  border: 1px solid ${Colors.WHITE};
  border-top: none;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  ${mixinPadding12px}
  ${mixinBgMainLight}
`;
const StyledMessageContainer = styled.div`
  ${mixinTextColor}
  ${mixinNormalFontSize16px}
`;
