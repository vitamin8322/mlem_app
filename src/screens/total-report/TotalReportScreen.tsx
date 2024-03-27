import {reportTotal} from '@services/apis/transaction.api';
import {REACT_QUERY_KEY, formatNumberWithCommas} from '@shared-constants';
import {useQuery} from '@tanstack/react-query';
import {useTheme} from 'contexts/app.context';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LayoutBase from 'shared/layout';

type Props = {};

const TotalReportScreen = (props: Props) => {
  const {t, i18n} = useTranslation('home');
  const {theme} = useTheme();

  const {isLoading: istotalReportDataLoading, data: totalReportData} = useQuery(
    {
      queryKey: [REACT_QUERY_KEY.TOTAL_REPORT],
      queryFn: () => reportTotal(),
    },
  );

  console.log(totalReportData?.data.data);

  return (
    <LayoutBase name={t('totalReport')}>
      {totalReportData?.data.data && (
        <>
          <View
            style={{borderColor: theme.textColor}}
            className="flex flex-row justify-between items-center px-3 border-b h-12">
            <Text
              style={{color: theme.textColor}}
              className="text-[16px] font-semibold">
              {t('income')}
            </Text>
            <View className="flex flex-row justify-between items-center">
              <Text
                style={{color: theme.textColor}}
                className="text-[16px] font-semibold mr-6">
                {formatNumberWithCommas(String(totalReportData?.data.data.total[0].revenue))}
              </Text>
              <Text
                style={{color: theme.textColor}}
                className="text-[16px] font-semibold">
                đ
              </Text>
            </View>
          </View>
          <View
            style={{borderColor: theme.textColor}}
            className="flex flex-row justify-between items-center px-3 border-b h-12">
            <Text
              style={{color: theme.textColor}}
              className="text-[16px] font-semibold">
              {t('expense')}
            </Text>
            <View className="flex flex-row justify-between items-center">
              <Text
                style={{color: theme.textColor}}
                className="text-[16px] font-semibold mr-6">
                {formatNumberWithCommas(String(totalReportData?.data.data.total[0].expense))}
              </Text>
              <Text
                style={{color: theme.textColor}}
                className="text-[16px] font-semibold">
                đ
              </Text>
            </View>
          </View>
          <View
            style={{borderColor: theme.textColor}}
            className="flex flex-row justify-between items-center px-3 border-b h-12">
            <Text
              style={{color: theme.textColor}}
              className="text-[16px] font-semibold">
              {t('total')}
            </Text>
            <View className="flex flex-row justify-between items-center">
              <Text
                style={{color: theme.textColor}}
                className="text-[16px] font-semibold mr-6">
                {formatNumberWithCommas(String(totalReportData?.data.data.total[0].revenue - totalReportData?.data.data.total[0].expense))}
              </Text>
              <Text
                style={{color: theme.textColor}}
                className="text-[16px] font-semibold">
                đ
              </Text>
            </View>
          </View>
        </>
      )}
    </LayoutBase>
  );
};

export default TotalReportScreen;
