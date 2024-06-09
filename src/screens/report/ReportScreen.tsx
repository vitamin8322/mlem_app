import {monthTransaction} from '@services/apis/transaction.api';
import CardTransaction from '@shared-components/CardTransaction';
import CxPieChart from '@shared-components/CxPieChart';
import {REACT_QUERY_KEY, SCREENS, formatNumberWithCommas} from '@shared-constants';
import {useQuery} from '@tanstack/react-query';
import {Dinner, StartApp, Test} from 'assets';
import classNames from 'classnames';
import React, {useCallback, useMemo, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Svg, {Circle, G, Line, Text as TextSvg} from 'react-native-svg';
const ReportScreen = () => {
  const {t} = useTranslation('home');
  
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isSelectExp, setIsSelectExp] = useState(true);
  const [dataCircle, setDataCircle] = useState<any>();

  const {isLoading: isdataMonthDataLoading, data: dataMonthData} = useQuery({
    queryKey: [REACT_QUERY_KEY.TRANSACTION_MONTH, currentYear, currentMonth],
    queryFn: () => monthTransaction(currentYear, currentMonth),
    onSuccess(data) {
      setDataCircle(data.data.data.expenses);
    },
  });

  const onMonthChange = useCallback(
    (date: any) => {
      setCurrentMonth(date.month);
      setCurrentYear(date.year);
    },
    [currentMonth, currentYear],
  );

  const dayComponent = useMemo(() => {
    return () => {
      return <View className="h-52"></View>;
    };
  }, [currentMonth, currentYear]);

  return (
    <>
      <Calendar
        onMonthChange={onMonthChange}
        // markedDates={dailyTransactionsData?.data.data.calender}
        dayComponent={dayComponent}
        hideDayNames
        style={{
          height: 50,
          backgroundColor: 'transparent',
        }}
      />
      <View className="flex flex-row justify-center items-center gap-x-2 px-3 mt-3">
        <View className="flex flex-row justify-between items-center w-[48%] h-12 px-2 border border-gray-400 rounded-md">
          <Text>{t("expense")}</Text>
          <Text className="font-semibold text-red-500">
            -
            {formatNumberWithCommas(
              String(dataMonthData?.data.data.total[0]?.expense || 0),
            )}
            đ
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center w-[48%] h-12 px-2 border border-gray-400 rounded-md">
          <Text>{t("income")}</Text>
          <Text className="font-semibold text-blue-500">
            +
            {formatNumberWithCommas(
              String(dataMonthData?.data.data.total[0]?.revenue || 0),
            )}
            đ
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center h-12 px-2 border border-gray-400 rounded-md mx-3 mt-2">
        <Text>{t("expandinc")}</Text>
        <Text className="font-semibold ">
          {formatNumberWithCommas(
            String(
              Number(dataMonthData?.data.data.total[0]?.revenue || 0) -
                Number(dataMonthData?.data.data.total[0]?.expense || 0),
            ),
          )}
          đ
        </Text>
      </View>
      {dataMonthData && dataCircle && (
        <>
          <View className="flex flex-row justify-center items-center px-3 mt-2">
            <View
              className={classNames('border-b-2 w-[48%] ', {
                'border-red-400': isSelectExp,
              })}>
              <TouchableOpacity
                onPress={() => {
                  setIsSelectExp(true);
                  setDataCircle(dataMonthData.data.data.expenses);
                }}>
                <Text
                  className={classNames('text-center font-semibold', {
                    'border-red-400': isSelectExp,
                  })}>
                  {t("expense")}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              className={classNames('border-b-2 w-[48%] ', {
                'border-red-400': !isSelectExp,
              })}>
              <TouchableOpacity
                onPress={() => {
                  setIsSelectExp(false);
                  setDataCircle(dataMonthData.data.data.revenues);
                }}>
                <Text
                  className={classNames('text-center font-semibold', {
                    'border-red-400': !isSelectExp,
                  })}>
                  {t("income")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <CxPieChart data={dataCircle} />
          {dataCircle.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={dataCircle.sort((a: any, b: any) => {
                return a.value - b.value;
              })}
              renderItem={({item}) => (
                <CardTransaction isTransactionRecent isPercent item={item} isNavigate={SCREENS.REPORT_CATEGORY_SCREEN} />
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text className="text-center">Không có dữ liệu</Text>
          )}
        </>
      )}
    </>
  );
};

export default ReportScreen;
