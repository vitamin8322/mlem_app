import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import TransactionHistoryScreen from '@screens/transaction-history';
import { useTranslation } from 'react-i18next';
const Stack = createStackNavigator();

const TransactionHistoryNavigation = () => {
  const { t, i18n } = useTranslation("home");
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={String(t(SCREENS.TRANSACTION_HISTORY))}
    >
      <Stack.Screen name={t(SCREENS.TRANSACTION_HISTORY)} component={TransactionHistoryScreen} />
        
    </Stack.Navigator>
  )
}

export default TransactionHistoryNavigation
