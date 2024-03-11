import {
  LIST_ITEM_EXPENSES,
  LIST_ITEM_REVENUE,
  SCREENS,
  formatNumberWithCommas,
} from '@shared-constants';
import {Dinner} from 'assets';
import {useTheme} from 'contexts/app.context';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import {navigate, push} from 'react-navigation-helpers';

type Props = {
  isExpenses?: boolean;
  isTransactionRecent?: boolean;
  isTransactionHistory?: boolean;
  item: any;
  isPercent?: boolean;
};

const CardTransaction = (props: Props) => {
  const {t, i18n} = useTranslation('home');
  const {theme} = useTheme();
  const {
    isExpenses,
    isTransactionRecent,
    isTransactionHistory,
    item,
    isPercent,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        push(`${t(SCREENS.ADD_TRANSACTION)}`, {
          props,
        });
        navigate(`${t(SCREENS.ADD_TRANSACTION)}`);

        // navigate(SCREENS.MY_WALLET_SCREEN,{
        //   asdasd:'asd'
        // });
      }}>
      <View className="flex flex-row justify-between items-center px-2 py-2">
        {LIST_ITEM_REVENUE.filter(itemRevenue => {
          return itemRevenue.id === item.idCategory;
        }).map((filteredItem, index) => (
          <View key={index} className="flex flex-row items-center">
            {React.createElement(filteredItem?.icon, {
              height: 30,
              width: 30,
              fill: 'blue',
            })}
            <View className="ml-3">
              <Text style={{color: theme.textColor}} className="font-semibold">
                {filteredItem.title}
              </Text>
              {isExpenses && (
                <Text className="text-gray-500">
                  {formatNumberWithCommas(item?.money)} đ
                </Text>
              )}
            </View>
          </View>
        ))}
        {LIST_ITEM_EXPENSES.filter(itemExpenses => {
          return itemExpenses.id === item.idCategory;
        }).map((filteredItem, index) => (
          <View key={index} className="flex flex-row items-center">
            {React.createElement(filteredItem?.icon, {
              height: 30,
              width: 30,
              fill: 'blue',
            })}
            <View className="ml-3">
              <Text style={{color: theme.textColor}} className="font-semibold">
                {filteredItem.title}
              </Text>
              {isExpenses && (
                <Text className="text-gray-500">
                  {formatNumberWithCommas(
                    item?.money ? item?.money : item?.value,
                  )}{' '}
                  đ
                </Text>
              )}
            </View>
          </View>
        ))}
        {isExpenses && (
          <Text className="font-semibold text-red-500">
            {Math.floor(item.percent)}%
          </Text>
        )}
        {(isTransactionRecent || isTransactionHistory) && (
          <View className="flex flex-row justify-center item-center gap-x-2">
            <Text
              style={{color: theme.textColor}}
              className="font-semibold text-[16px]">
              {formatNumberWithCommas(item?.money ? item.money : item.value)}đ
            </Text>
            {isPercent && (
              <Text className="text-[12px]">{item.percent.toFixed(1)}%</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CardTransaction;
