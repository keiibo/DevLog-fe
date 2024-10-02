import React, { useCallback, useEffect, useState } from 'react';
import { Status, TTicket } from '../../../types/TTicket';
import { Colors } from '../../../../../style/Colors';
import { Flex, Tooltip } from 'antd';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';
import styled from 'styled-components';
import {
  CategoryLabel,
  CategoryLabelMode
} from '../../../../../components/composition/categoryLabel/CategoryLabel';
import {
  mixinPadding12px,
  mixinBgMainLight,
  mixinTextColor,
  mixinNormalFontSize16px
} from '../../../../../style/Mixin';
import {
  startMessages,
  midMessages,
  endMessages
} from '../../../../../constant/Message';
import { startOfWeek, endOfWeek, parseISO, isWithinInterval } from 'date-fns';

type TProps = {
  ticketList: TTicket[];
};

export const WeeklyBoard = ({ ticketList }: TProps): React.JSX.Element => {
  const [weekData, setWeekData] = useState<{ name: string; count: number }[]>(
    []
  );
  // 今週の開始日と終了日を取得（週の開始日を日曜日とする場合）
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 0 });

  const [message, setMessage] = useState<string>('');

  const [maxCount, setMaxCount] = useState(5);

  useEffect(() => {
    // 初回レンダリング時にのみメッセージを設定
    const initialMessage = getMessage();
    setMessage(initialMessage);
  }, []);

  useEffect(() => {
    const currentWeekData = getCurrentWeekData(ticketList);
    setWeekData(currentWeekData);
    // データ群の最大件数を取得
    const maxDataCount = Math.max(...currentWeekData.map((data) => data.count));
    setMaxCount(maxDataCount < 5 ? 5 : maxDataCount + 2); // 5未満の場合は5を設定
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
    // ランダムにメッセージを選択する関数
    const getRandomMessage = (messages: string[]) => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    };

    if (dayOfWeek >= 0 && dayOfWeek <= 1) {
      // 週の始まり
      return getRandomMessage(startMessages);
    } else if (dayOfWeek >= 2 && dayOfWeek <= 3) {
      // 週の中間
      return getRandomMessage(midMessages);
    } else if (dayOfWeek >= 4 && dayOfWeek <= 6) {
      // 週の終わり
      return getRandomMessage(endMessages);
    } else {
      return '日付が不正です。';
    }
  };
  return (
    <Flex vertical style={{ width: '100%' }}>
      <CategoryLabel mode={CategoryLabelMode.NONE} label="ウィークリーボード" />
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
                ticketList.filter((ticket) => {
                  if (
                    ticket.completedAt &&
                    ticket.status === Status.COMPLETED
                  ) {
                    const completedDate = parseISO(ticket.completedAt);
                    return isWithinInterval(completedDate, {
                      start: weekStart,
                      end: weekEnd
                    });
                  }
                  return false;
                }).length
              }
              件のチケットを完了にしました！
            </p>
            <p>{message}</p>
          </StyledMessageContainer>
        </StyledChartContainer>
      </Flex>
    </Flex>
  );
};
const StyledChartContainer = styled.div`
  border: 1px solid ${Colors.WHITE};
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  ${mixinPadding12px}
  ${mixinBgMainLight}
`;
const StyledMessageContainer = styled.div`
  ${mixinTextColor}
  ${mixinNormalFontSize16px}
`;
