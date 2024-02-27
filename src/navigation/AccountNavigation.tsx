import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import TransactionHistoryScreen from '@screens/transaction-history';
import LoginScreen from '@screens/login';
import AccountScreen from '@screens/account';
import LanguageScreen from '@screens/languege';
const Stack = createStackNavigator();

const AccountNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREENS.HOME_SCREEN}
    >
      {/* <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} /> */}
      <Stack.Screen name={SCREENS.ACCOUNT} component={AccountScreen} />
      <Stack.Screen name={SCREENS.LANGUAGE_SCREEN} component={LanguageScreen} />
    </Stack.Navigator>
  )
}

export default AccountNavigation
