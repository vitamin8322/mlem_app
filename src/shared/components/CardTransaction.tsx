import {
  LIST_ITEM_EXPENSES,
  LIST_ITEM_REVENUE,
  formatNumberWithCommas,
} from '@shared-constants';
import {Dinner} from 'assets';
import {useTheme} from 'contexts/app.context';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  isExpenses?: boolean;
  isTransactionRecent?: boolean;
  isTransactionHistory?: boolean;
  item: any;
};

const CardTransaction = (props: Props) => {
  const {theme} = useTheme();
  const {isExpenses, isTransactionRecent, isTransactionHistory, item} = props;

  return (
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
                {formatNumberWithCommas(item?.money)} đ
              </Text>
            )}
          </View>
        </View>
      ))}
      {isExpenses && <Text className="font-semibold text-red-500">{Math.floor(item.percent)}%</Text>}
      {(isTransactionRecent || isTransactionHistory) && (
        <Text style={{color: theme.textColor}}>{formatNumberWithCommas(item?.money)} đ</Text>
      )}
    </View>
  );
};

export default CardTransaction;
