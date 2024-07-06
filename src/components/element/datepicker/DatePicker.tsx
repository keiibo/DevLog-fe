import { DatePicker as AdDatePicker, DatePickerProps } from 'antd';
import locale from 'antd/es/date-picker/locale/ja_JP';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { forwardRef } from 'react';
import 'dayjs/locale/ja';

type TProps = DatePickerProps & {
  minDate?: Dayjs | null;
  maxDate?: Dayjs | null;
};

const DatePicker = forwardRef<HTMLDivElement, TProps>((props: TProps, ref) => {
  const { minDate, maxDate, ...rest } = props;
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);

  const disabledDate = (date: Dayjs): boolean => {
    const isOver = maxDate && date.isSameOrAfter(maxDate);
    const isUnder = minDate && date.isSameOrBefore(minDate);
    return isOver || isUnder || false;
  };

  return (
    <div ref={ref}>
      <AdDatePicker {...rest} locale={locale} disabledDate={disabledDate} />
    </div>
  );
});

export default DatePicker;
