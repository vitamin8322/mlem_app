import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AppContext, useTheme} from 'contexts/app.context';
import {useTranslation} from 'react-i18next';
import LayoutBase from 'shared/layout';
import {useQuery} from '@tanstack/react-query';
import {REACT_QUERY_KEY, formatNumberWithCommas} from '@shared-constants';
import {reportYear} from '@services/apis/transaction.api';
import {Calendar} from 'react-native-calendars';
import {BarChart} from 'react-native-gifted-charts';

const AnnualReportScreen = () => {
  const {t, i18n} = useTranslation('home');

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dataBarChart, setDataBarChart] = useState();
  const [month, setMonth] = useState<any>();

  function transformData(data: any, type: any) {
    return data.monthlyData.map((item: any) => ({
      value: item.total[type],
      label: item.month,
    }));
  }

  const {isLoading: isdataMonthDataLoading, data: dataMonthData} = useQuery({
    queryKey: [REACT_QUERY_KEY.TRANSACTION_MONTH, currentYear],
    queryFn: () => reportYear(currentYear),
    onSuccess(res) {
      // setDataCircle(data.data.data.expenses);
      console.log(res.data.data);

      const data = transformData(res?.data.data, 'expense');
      setDataBarChart(data);
    },
  });
  console.log('dataBarChart', dataBarChart);
  return (
    <LayoutBase name={t('annualReport')}>
      <ScrollView>
      <View className={'flex flex-row justify-center items-center'}>
        <TouchableOpacity
          onPress={() => {
            const data = transformData(dataMonthData?.data.data, 'expense');
            setDataBarChart(data);
          }}>
          <Text className="border px-3 py-1">Tiền chi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const data = transformData(dataMonthData?.data.data, 'revenue');
            setDataBarChart(data);
          }}>
          <Text className="border px-3 py-1">Tiền thu</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            const data = convertToStackData(
              dataMonthData?.data.data.monthlyData,
            );
          }}>
          <Text className="border px-3 py-1">Tổng</Text>
        </TouchableOpacity> */}
      </View>

      {dataMonthData && dataBarChart && (
        <View className={'mt-5'}>
          <BarChart
            frontColor={'#177AD5'}
            data={dataBarChart}
            barWidth={20}
            // isAnimated
            spacing={10}
            renderTooltip={(item: any, index: number) => {
              return (
                <View
                  style={{
                    marginBottom: 20,
                    marginLeft: -6,
                    backgroundColor: '#ffcefe',
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    borderRadius: 4,
                    width: 100,
                  }}>
                  <Text>{formatNumberWithCommas(String(item.value))} đ</Text>
                </View>
              );
            }}
          />
          <View className="flex flex-row justify-between items-center h-10 border-y my-2 px-3">
            <Text className="font-semibold text-[18px]">Tổng</Text>
            <Text className="font-semibold text-[18px]">{formatNumberWithCommas(dataBarChart.reduce((total:any, item:any) => total + item.value, 0))||0}</Text>
          </View>
          {dataBarChart.map((item: any) => {
            return (
              <View className="flex flex-row justify-between items-center h-10 border-t px-3">
                <Text className="font-semibold text-[18px]">{item.label}</Text>
                <Text className="font-semibold text-[18px]">{formatNumberWithCommas(item.value) || 0}</Text>
              </View>
            );
          })}
        </View>
      )}
      </ScrollView>
    </LayoutBase>
  );
};

export default AnnualReportScreen;
