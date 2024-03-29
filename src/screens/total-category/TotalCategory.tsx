import {totalCategory} from '@services/apis/transaction.api';
import {REACT_QUERY_KEY} from '@shared-constants';
import {useQuery} from '@tanstack/react-query';
import classNames from 'classnames';
import React, {useState} from 'react';
import CxPieChart from '@shared-components/CxPieChart';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import CardTransaction from '@shared-components/CardTransaction';
import LayoutBase from 'shared/layout';

const TotalCategory = () => {
  const [dataCircle, setDataCircle] = useState<any>();
  const [isSelectExp, setIsSelectExp] = useState(true);
  const {t} = useTranslation('home');

  const {isLoading: isdataTotalCategoryLoading, data: dataTotalCategory} =
    useQuery({
      queryKey: [REACT_QUERY_KEY.TOTAL_CATEGORY],
      queryFn: () => totalCategory(),
      onSuccess(data) {
        setDataCircle(data.data.data.expenses);
      },
    });

  return (
    <LayoutBase name={t('selectLanguage')}>
      {dataTotalCategory && dataCircle &&
      <View>
        <View className="flex flex-row justify-center items-center px-3 mt-2">
          <View
            className={classNames('border-b-2 w-[48%] ', {
              'border-red-400': isSelectExp,
            })}>
            <TouchableOpacity
              onPress={() => {
                setIsSelectExp(true);
                setDataCircle(dataTotalCategory.data.data.expenses);
              }}>
              <Text
                className={classNames('text-center font-semibold', {
                  'border-red-400': isSelectExp,
                })}>
                {t('expense')}
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
                setDataCircle(dataTotalCategory.data.data.revenues);
              }}>
              <Text
                className={classNames('text-center font-semibold', {
                  'border-red-400': !isSelectExp,
                })}>
                {t('income')}
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
              <CardTransaction isTransactionRecent isPercent item={item} />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          // <Text className="text-center">Không có 11dữ liêu</Text>

          <Text className="text-center">Không có dữ liệu</Text>
        )}
      </View>
}
    </LayoutBase>
  );
};

export default TotalCategory;
