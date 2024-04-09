import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import TransactionHistoryScreen from '@screens/transaction-history';
import ReportScreen from '@screens/report';
import TransactionScreen from '@screens/transaction';
import { useTranslation } from 'react-i18next';
import ListCategory from '@screens/list-category';
import CreateOrEditCategory from '@screens/create-or-edit-category';
const Stack = createStackNavigator();

const ReportNavigation = () => {
  const { t, i18n } = useTranslation("home");
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={`${t(SCREENS.ADD_TRANSACTION)}`}
    >
      <Stack.Screen name={`${t(SCREENS.ADD_TRANSACTION)}`} >
        {(props) =>{
          // console.log(1213,props);
          
          return <TransactionScreen {...props} />}}
      </Stack.Screen>
      <Stack.Screen name={SCREENS.LIST_CATEGORY_SCREEN} >
        {(props) =>{
          // console.log(1213,props);
          
          return <ListCategory {...props} />}}
      </Stack.Screen>
      <Stack.Screen name={`${t(SCREENS.CREATE_OR_EDIT_CATEGORY_SCREEN)}`} >
        {(props) =>{
          // console.log(1213,props);
          
          return <CreateOrEditCategory {...props} />}}
      </Stack.Screen>
        
    </Stack.Navigator>
  )
}

export default ReportNavigation
