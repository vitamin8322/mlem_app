import SelectType from '@shared-components/SelectType';
import {
  LIST_CATEGORY,
  LIST_ITEM_EXPENSES,
  LIST_ITEM_EXPENSES_UPDATE,
  LIST_ITEM_REVENUE,
  LIST_ITEM_REVENUE_UPDATE,
  SCREENS,
} from '@shared-constants';
import {Dinner} from 'assets';
import {AppContext} from 'contexts/app.context';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigate} from 'react-navigation-helpers';
import LayoutBase from 'shared/layout';

const ListCategory = ({navigation, route}: any) => {
  const {params} = route;
  const {category} = useContext(AppContext);

  const [selectTransaction, setSelectTransaction] = useState<number>(
    params.page,
  );
  const ListItem = [category.expCategory, category.revCategory];
  
  const [dataView, setDataView] = useState<any>(ListItem[params.page]);

  const handleSelectExp = () => {
    setDataView(ListItem[0]);
  };
  const handleSelectRev = () => {
    setDataView(ListItem[1]);
  };
  
  useEffect(() => {
    // Update dataView whenever category changes
    setDataView(ListItem[params.page]);
  }, [category]);

  return (
    <LayoutBase name={'Danh sach'}>
      <View>
        <View className={'px-5'}>
          <SelectType
            setSelectTransaction={setSelectTransaction}
            selectTransaction={selectTransaction}
            handleSelectExp={handleSelectExp}
            handleSelectRev={handleSelectRev}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 150,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigate(SCREENS.CREATE_OR_EDIT_CATEGORY_SCREEN, {
                page: selectTransaction,
                edit: false
              });
            }}>
            <View
              className={
                'flex flex-row items-center px-5 py-2 gap-x-4 border-b'
              }>
              <Text className={'font-semibold text-[16px] h-10 pt-3'}>
                Thêm danh mục
              </Text>
            </View>
          </TouchableOpacity>
          {dataView.map((item: any) => {
            return (
              <TouchableOpacity onPress={() => {
                navigate(SCREENS.CREATE_OR_EDIT_CATEGORY_SCREEN, {
                  page: selectTransaction,
                  edit: true,
                  item: item
                });
              }}>
                <View
                  className={
                    'flex flex-row items-center px-5 py-2 gap-x-4 border-b'
                  }>
                  {React.createElement(LIST_CATEGORY[item?.icon].icon, {
                    height: 40,
                    width: 40,
                    fill: `#${item.fill}`,
                  })}
                  <Text className={'font-semibold text-[16px]'}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </LayoutBase>
  );
};

export default ListCategory;
