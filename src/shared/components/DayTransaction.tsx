import {
  LIST_ITEM_EXPENSES,
  LIST_ITEM_REVENUE,
  formatNumberWithCommas,
} from '@shared-constants';
import {Dinner} from 'assets';
import moment from 'moment';
import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';

type Props = {
  dataDay: any;
  extraData: any;
};

const DayTransaction = (props: Props) => {
  const {dataDay, extraData} = props;
  let itemDay = extraData[moment(dataDay[0].date).format('YYYY-MM-DD')];
  return (
    <View className="w-full">
      <View className="flex flex-row justify-between items-center px-3 bg-gray-400">
        <Text className="text-white">
          {moment(dataDay[0].date).format('DD/MM/YYYY (dd)')}
        </Text>
        <Text className="text-white">
          {formatNumberWithCommas(String(itemDay.revenue - itemDay.expense))}đ
        </Text>
      </View>
      <FlatList
        data={dataDay}
        renderItem={({item}: any) => {
          const expItems = LIST_ITEM_EXPENSES.filter(itemExpenses => {
            return itemExpenses.id === item.idCategory;
          });
          const revItems = LIST_ITEM_REVENUE.filter(itemRevenue => {
            return itemRevenue.id === item.idCategory;
          });
          
          return (
            <View className="py-1 px-2">
              {expItems.map((filteredItem, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between items-center px-3">
                  <View className="flex flex-row justify-center items-center">
                    {React.createElement(filteredItem?.icon, {
                      height: 30,
                      width: 30,
                      fill: 'blue',
                    })}
                    <Text
                      className="ml-3 text-[16px] font-semibold"
                      numberOfLines={1}>
                      {filteredItem.title}
                    </Text>
                  </View>
                  <Text className="text-[16px] font-semibold text-red-500">
                    {formatNumberWithCommas(String(item.money))}đ
                  </Text>
                </View>
              ))}
              {revItems.map((filteredItem, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between items-center px-3">
                  <View className="flex flex-row justify-center items-center">
                    {React.createElement(filteredItem?.icon, {
                      height: 30,
                      width: 30,
                      fill: 'blue',
                    })}
                    <Text
                      className="ml-3 text-[16px] font-semibold"
                      numberOfLines={1}>
                      {filteredItem.title}
                    </Text>
                  </View>
                  <Text className="text-[16px] font-semibold text-blue-500">
                    {formatNumberWithCommas(String(item.money))}đ
                  </Text>
                </View>
              ))}
            </View>
          );
        }}
        keyExtractor={item =>  `${item._id}`}
      />
    </View>
  );
};

export default DayTransaction;
