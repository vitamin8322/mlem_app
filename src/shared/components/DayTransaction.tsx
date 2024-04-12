import { allCategoryUser } from '@services/apis/category.api';
import {
  LIST_CATEGORY,
  LIST_ITEM_EXPENSES,
  LIST_ITEM_EXPENSES_UPDATE,
  LIST_ITEM_REVENUE,
  LIST_ITEM_REVENUE_UPDATE,
  REACT_QUERY_KEY,
  formatNumberWithCommas,
} from '@shared-constants';
import { useQuery } from '@tanstack/react-query';
import {Dinner} from 'assets';
import classNames from 'classnames';
import { useTheme } from 'contexts/app.context';
import moment from 'moment';
import React, { useState } from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';

type Props = {
  dataDay: any;
  extraData: any;
};

const DayTransaction = (props: Props) => {
  const {theme} = useTheme();
  
  const {dataDay, extraData} = props;
  console.log('dataDay', dataDay);
  const [data, setData] = useState<any>();
  
  let itemDay = extraData[moment(dataDay[0].date).format('YYYY-MM-DD')];
  // const {isLoading: isCategoryDataLoading, data: categoryData} = useQuery({
  //   queryKey: [REACT_QUERY_KEY.ALL_CATEGORY],
  //   queryFn: () => allCategoryUser(),
  //   onSuccess(response) {
  //     const expItems = response.data.data.filter(item => item.type === 'exp');
  //     const revItems = response.data.data.filter(item => item.type === 'rev');
      
  //     setData([...LIST_ITEM_EXPENSES_UPDATE, ...response.data.data, ...LIST_ITEM_REVENUE_UPDATE]);
  //     // setDataRev([...LIST_ITEM_REVENUE_UPDATE, ...revItems, ...edit]);
  //     // console.log(LIST_ITEM_EXPENSES_UPDATE.concat(expItems));

  //   },
  // });
  return (
    <View style={{backgroundColor: theme.backgroundColor}} className="w-full">
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
            <View style={{backgroundColor: theme.backgroundColor}}  className="py-1 px-2 ">
                <View
                  className="flex flex-row justify-between items-center px-3">
                  <View className="flex flex-row justify-center items-center">
                    {React.createElement(LIST_CATEGORY[item.category.icon].icon, {
                      height: 30,
                      width: 30,
                      fill: `#${item?.category?.fill}`,
                    })}
                    <Text
                      style={{color: theme.textColor}}
                      className="ml-3 text-[16px] font-semibold"
                      numberOfLines={1}>
                      {item.category.name}
                    </Text>
                  </View>
                  <Text className={classNames("text-[16px] font-semibold ",{
                    "text-red-500" : item.category.type === 'exp',
                    "text-blue-500" : item.category.type === 'rev',

                  })}>
                    {formatNumberWithCommas(String(item.money))}đ
                  </Text>
                </View>
            </View>
          );
        }}
        keyExtractor={item =>  `${item._id}`}
      />
    </View>
  );
};

export default DayTransaction;
