import {
  LIST_CATEGORY,
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
  isNavigate?: any;
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
    isNavigate,
  } = props;
  const icon =
    LIST_CATEGORY[item?.icon]?.icon ||
    LIST_CATEGORY[item?.idCategory?.icon]?.icon;

    console.log('item', item);
    
  return (
    item && (
      <TouchableOpacity
        onPress={() => {
          if (isNavigate && isTransactionRecent) {
            push(`${t(isNavigate)}`, {
              props,
            });
            navigate(`${t(isNavigate)}`, {
              idCategory: item.idCategory._id
            });
          }
        }}>
        <View className="flex flex-row justify-between items-center px-5 py-2">
          {/* {item.category && (
            <View className="flex flex-row items-center">
              {React.createElement(LIST_CATEGORY[item.icon].icon, {
                height: 30,
                width: 30,
                fill: `#${item?.idCategory?.fill}`,
              })}
              <View className="ml-3">
                <Text
                  style={{color: theme.textColor}}
                  className="font-semibold">
                  {item?.category?.name}
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
          )} */}
          {/* {LIST_ITEM_REVENUE.filter(itemRevenue => {
            return itemRevenue.id === item.idCategory;
          }).map((filteredItem, index) => (
            <View key={index} className="flex flex-row items-center">
              {React.createElement(filteredItem?.icon, {
                height: 30,
                width: 30,
                fill: 'blue',
              })}
              <View className="ml-3">
                <Text
                  style={{color: theme.textColor}}
                  className="font-semibold">
                  {filteredItem.title}
                </Text>
                {isExpenses && (
                  <Text className="text-gray-500">
                    {formatNumberWithCommas(item?.money)} đ
                  </Text>
                )}
              </View>
            </View>
          ))} */}
          <View className="flex flex-row items-center">
            {React.createElement(icon, {
              height: 30,
              width: 30,
              fill:  `#${item?.idCategory?.fill}`,
            })}
            <View className="ml-3">
              <Text style={{color: theme.textColor}} className="font-semibold">
                {item.idCategory.name}
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
    )
  );
};

export default CardTransaction;
