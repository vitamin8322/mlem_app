import {dailyTransactions} from '@services/apis/transaction.api';
import DayTransaction from '@shared-components/DayTransaction';
import {REACT_QUERY_KEY, formatNumberWithCommas} from '@shared-constants';
import {useQuery} from '@tanstack/react-query';
import {Dinner} from 'assets';
import classNames from 'classnames';
import {useTheme} from 'contexts/app.context';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
type Props = {};
const TransactionHistoryScreen = (props: Props) => {
  const {theme} = useTheme();

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const {
    isLoading: isdailyTransactionsDataLoading,
    data: dailyTransactionsData,
  } = useQuery({
    queryKey: [REACT_QUERY_KEY.DAILY_TRANSACTION, currentYear, currentMonth],
    queryFn: () => dailyTransactions(currentYear, currentMonth),
  });

  const onMonthChange = useCallback(
    (date: any) => {
      setCurrentMonth(date.month);
      setCurrentYear(date.year);
    },
    [currentMonth, currentYear],
  );

  const CustomCalendarHeader = () => {
    return (
      <View>
        <Text style={{color: theme.textColor}} className='font-semibold text-[18px]' >{currentMonth}/{currentYear} </Text>
      </View>
    );
  };

  const dayComponent = useMemo(() => {
    return ({date, state, marking}: any) => {
      return (
        <View
          className={classNames(
            'w-14 h-[46px] border border-gray-400 mb-[-15px]',
            {'bg-gray-400': state === 'disabled'},
            {'bg-pink-400': state === 'today'},
            {[`bg-[${theme.backgroundColor}]`]: state !== 'disabled' && state !== 'today'},
          )}>
          <TouchableOpacity>
            <Text style={{color: theme.textColor}} className="ml-1 text-[12px] mb-0">{date?.day}</Text>
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
    <View style={{backgroundColor: theme.backgroundColor}}>
      <View className="mb-3">
        <Calendar
          onMonthChange={onMonthChange}
          markedDates={dailyTransactionsData?.data.data.calender}
          renderHeader={CustomCalendarHeader}
          dayComponent={dayComponent}
          headerStyle={{
            backgroundColor: theme.backgroundColor,
          }}
          style={{
            backgroundColor: theme.backgroundColor,
          }}
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
