import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import HomeScreen from '@screens/home/HomeScreen';
import MyWalletScreen from '@screens/my-wallet';
import TransactionHistoryScreen from '@screens/transaction-history';
const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREENS.HOME_SCREEN}
    >
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={SCREENS.MY_WALLET_SCREEN} component={MyWalletScreen} />
      <Stack.Screen name={SCREENS.TRANSACTION_HISTORY} component={TransactionHistoryScreen} />
        
    </Stack.Navigator>
  )
}

export default HomeNavigation
