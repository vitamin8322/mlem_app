import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import HomeScreen from '@screens/home/HomeScreen';
import LoginScreen from '@screens/login/LoginScreen';
const Stack = createStackNavigator();

const CashbackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREENS.HOME_SCREEN}
    >
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={LoginScreen} />
        
    </Stack.Navigator>
  )
}

export default CashbackNavigation
