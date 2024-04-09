import SelectType from '@shared-components/SelectType';
import {LIST_ITEM_EXPENSES, LIST_ITEM_REVENUE, SCREENS} from '@shared-constants';
import {Dinner} from 'assets';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { navigate } from 'react-navigation-helpers';
import LayoutBase from 'shared/layout';

const ListCategory = ({navigation, route}: any) => {
  const {params} = route;
  
  const [selectTransaction, setSelectTransaction] = useState<number>(
    params.page,
  );
  const ListItem = [ LIST_ITEM_EXPENSES, LIST_ITEM_REVENUE,];
  const [dataView, setDataView] = useState<any>(ListItem[params.page])

  const handleSelectExp = () => {
    setDataView(ListItem[0])
  }
  const handleSelectRev = () => {
    setDataView(ListItem[1])
  }

  return (
    <LayoutBase name={'Danh sachs'}>

    <View>
      <View className={'px-5'}>
        <SelectType setSelectTransaction={setSelectTransaction} selectTransaction={selectTransaction} handleSelectExp={handleSelectExp} handleSelectRev={handleSelectRev} />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigate(SCREENS.CREATE_OR_EDIT_CATEGORY_SCREEN,{
            page:selectTransaction
          });
        }}>
        <View
          className={'flex flex-row items-center px-5 py-2 gap-x-4 border-b'}>
          <Text className={'font-semibold text-[16px] h-10 pt-3'}>Thêm danh mục</Text>
        </View>
      </TouchableOpacity>
      {dataView.map((item:any) => {
        return (
          <View
            className={'flex flex-row items-center px-5 py-2 gap-x-4 border-b'}>
            {React.createElement(item?.icon, {
              height: 40,
              width: 40,
              fill: 'blue',
            })}
            <Text className={'font-semibold text-[16px]'}>{item.title}</Text>
          </View>
        );
      })}
    </View>
    </LayoutBase>

  );
};

export default ListCategory;
