import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {AppContext, useTheme} from 'contexts/app.context';
import {useTranslation} from 'react-i18next';
import LayoutBase from 'shared/layout';
import {useQuery} from '@tanstack/react-query';
import {REACT_QUERY_KEY, formatNumberWithCommas} from '@shared-constants';
import {categoryMonth, reportYear} from '@services/apis/transaction.api';
import {Calendar} from 'react-native-calendars';
import {BarChart} from 'react-native-gifted-charts';

const ReportCategoryScreen = ({navigation, route}: any) => {
  const {params} = route;
  const {t, i18n} = useTranslation('home');
  console.log('params', params.idCategory);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dataBarChart, setDataBarChart] = useState();
  const [month, setMonth] = useState<any>();

  function transformData(data: any) {
    return data.result.map((item: any) => ({
      value: item.count,
      label:
        item._id.month === '01'
          ? item._id.month + '/' + item._id.year
          : item._id.month,
      year: item._id.year,
    }));
  }

  const {isLoading: isdataCategoryMonthLoading, data: dataCategoryMonth} =
    useQuery({
      queryKey: [REACT_QUERY_KEY.TRANSACTION_MONTH, params.idCategory],
      queryFn: () => categoryMonth(params.idCategory),
      onSuccess(res) {
        // setDataCircle(data.data.data.expenses);
        console.log(11, res.data.data);

        const data = transformData(res?.data.data);
        console.log('data');

        setDataBarChart(data);
      },
    });
  // console.log('dataBarChart', dataBarChart);
  return (
    <LayoutBase name={t('annualReport')}>
      <ScrollView>
        {dataCategoryMonth && dataBarChart && (
          <View className={'mt-5'}>
            <BarChart
              frontColor={'#177AD5'}
              data={dataBarChart}
              barWidth={30}
              // isAnimated
              spacing={25}
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
              <Text className="font-semibold text-[18px]">
                {formatNumberWithCommas(
                  dataBarChart.reduce(
                    (total: any, item: any) => total + item.value,
                    0,
                  ),
                ) || 0}
              </Text>
            </View>
            {dataBarChart
              .filter(item => item.value !== 0)
              .map((item: any) => {
                return (
                  <View className="flex flex-row justify-between items-center h-10 border-t px-3">
                    <Text className="font-semibold text-[18px]">
                      {item.label + '/' + item.year}
                    </Text>
                    <Text className="font-semibold text-[18px]">
                      {formatNumberWithCommas(item.value) || 0}
                    </Text>
                  </View>
                );
              })}
          </View>
        )}
      </ScrollView>
    </LayoutBase>
  );
};

export default ReportCategoryScreen;
