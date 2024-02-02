import classNames from 'classnames';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
type Props = {};
const TransactionHistoryScreen = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const onDayPress = useCallback((day: any) => {
    // console.log(day);
    setSelectedDate(day.dateString);
  }, []);

  const onMonthChange = useCallback((date: any) => {
    // console.log(date.month);
    setCurrentMonth(date.month);
  }, []);
  const markedDates = useMemo(
    () => ({
      '2024-02-01': {selected: true, marked: true, selectedColor: 'red'},
      '2024-02-02': {marked: true},
      '2024-02-03': {
        selected: true,
        marked: true,
        selectedColor: 'red',
        income: '123',
        expense: '10',
      },
    }),
    [],
  );
  const dayComponent = useMemo(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    return ({date, state, marking}: any) => {
      const isCurrentMonth = currentMonth === date?.month;
      const isCurrentDay = isCurrentMonth && currentDay === date?.day;
      const isDifferentMonth = !isCurrentMonth;
      return (
        <View
          className={classNames(
            'w-14 h-[46px] border border-gray-400',
            {'bg-gray-400': isDifferentMonth},
            {'bg-yellow-200': isCurrentDay},
          )}>
          <TouchableOpacity onPress={() => onDayPress(date)}>
            <Text className="ml-1 text-[12px] mb-0">{date?.day}</Text>
            <Text className="text-[10px] text-blue-500 font-semibold text-right">
              {marking?.income}
            </Text>
            <Text className="text-[10px] text-red-500 font-semibold text-right mb-[-5px]">
              {marking?.expense}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
  }, [currentMonth, onDayPress]);

  return (
    <View>
      <Calendar
        onMonthChange={onMonthChange}
        markedDates={markedDates}
        dayComponent={dayComponent}
        />
    </View>
  );
};
export default TransactionHistoryScreen;

// theme={{
//   calendarBackground: '#166088',
//   textSectionTitleColor: '#DBE9EE',
//   textMonthFontWeight: 'bold',
//   monthTextColor: '#DBE9EE',
//   arrowColor: '#DBE9EE',
//   dayTextColor: '#DBE9EE',
//   textDisabledColor: '#729DAF',
//   selectedDayTextColor: '#166088',
//   dotColor: '#DBE9EE',
// }}
