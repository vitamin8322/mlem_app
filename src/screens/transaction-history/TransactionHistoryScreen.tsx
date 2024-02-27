import {dailyTransactions} from '@services/apis/transaction.api';
import DayTransaction from '@shared-components/DayTransaction';
import {REACT_QUERY_KEY, formatNumberWithCommas} from '@shared-constants';
import {useQuery} from '@tanstack/react-query';
import {Dinner} from 'assets';
import classNames from 'classnames';
import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
type Props = {};
const TransactionHistoryScreen = (props: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const {
    isLoading: isdailyTransactionsDataLoading,
    data: dailyTransactionsData,
  } = useQuery({
    queryKey: [REACT_QUERY_KEY.DAILY_TRANSACTION, currentYear, currentMonth],
    queryFn: () => dailyTransactions(currentYear,currentMonth),
  });

  const onMonthChange = useCallback((date: any) => {
    setCurrentMonth(date.month);
    setCurrentYear(date.year);
  }, [currentMonth, currentYear]);

  const dayComponent = useMemo(() => {
    return ({date, state, marking}: any) => {
      return (
        <View
          className={classNames(
            'w-14 h-[46px] border border-gray-400 mb-[-15px]',
            {'bg-gray-400': state === 'disabled'},
            {'bg-yellow-200': state === 'today'},
            {'bg-white': state !== 'disabled' && state !== 'today'},
          )}>
          <TouchableOpacity>
            <Text className="ml-1 text-[12px] mb-0">{date?.day}</Text>
            <Text className="text-[10px] text-blue-500 font-semibold text-right">
              {marking?.revenue !== '0' && marking?.revenue
                ? formatNumberWithCommas(String(marking?.revenue))
                : ''}
            </Text>
            <Text className="text-[10px] text-red-500 font-semibold text-right mb-[-5px]">
              {marking?.expense !== '0' && marking?.expense
                ? formatNumberWithCommas(String(marking?.expense))
                : ''}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
  }, [currentMonth, currentYear]);

  return (
    <View>
      <View className="mb-3">
        <Calendar
          onMonthChange={onMonthChange}
          markedDates={dailyTransactionsData?.data.data.calender}
          dayComponent={dayComponent}
        />
      </View>
      <FlatList
        data={dailyTransactionsData?.data.data.day}
        extraData={dailyTransactionsData?.data.data.calender}
        renderItem={({item}: any) => {
          
          return (
            <DayTransaction
              dataDay={item}
              extraData={dailyTransactionsData?.data.data.calender}
            />
          );
        }}
        keyExtractor={item => `${item[0]._id}`}
        contentContainerStyle={{
          paddingBottom: 370,
        }}
      />
    </View>
  );
};
export default TransactionHistoryScreen;
