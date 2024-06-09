import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import HomeScreen from '@screens/home/HomeScreen';
import MyWalletScreen from '@screens/my-wallet';
import TransactionHistoryScreen from '@screens/transaction-history';
import FormWalletScreen from '@screens/form-wallet';
import ForgotPasswordScreen from '@screens/forgot-password/ForgotPasswordScreen';
const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREENS.HOME_SCREEN}
    >
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={SCREENS.MY_WALLET_SCREEN} >
        {(props) =>{
          return <MyWalletScreen {...props} />}}

        </Stack.Screen>
      <Stack.Screen name={SCREENS.TRANSACTION_HISTORY} component={TransactionHistoryScreen} />
      {/* <Stack.Screen name={SCREENS.FORM_WALLET_SCREEN} component={FormWalletScreen} /> */}
      <Stack.Screen name={SCREENS.FORM_WALLET_SCREEN} >
        {(props) =>{
          return <FormWalletScreen {...props} />}}

        </Stack.Screen>
        
    </Stack.Navigator>
  )
}

export default HomeNavigation
