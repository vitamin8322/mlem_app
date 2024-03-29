import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import TransactionHistoryScreen from '@screens/transaction-history';
import LoginScreen from '@screens/login';
import AccountScreen from '@screens/account';
import LanguageScreen from '@screens/languege';
import ChangeColorScreen from '@screens/change-color/ChangeColorScreen';
import AccountSettingScreen from '@screens/account-setting';
import TotalReportScreen from '@screens/total-report';
import TotalCategory from '@screens/total-category';
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
      <Stack.Screen name={SCREENS.CHANGE_COLOR_SCREEN} component={ChangeColorScreen} />
      <Stack.Screen name={SCREENS.ACCOUNT_SETTING_SCREEN} component={AccountSettingScreen} />
      <Stack.Screen name={SCREENS.TOTAL_REPORT_SCREEN} component={TotalReportScreen} />
      <Stack.Screen name={SCREENS.TOTAL_CATEGORY_SCREEN} component={TotalCategory} />
    </Stack.Navigator>
  )
}

export default AccountNavigation
