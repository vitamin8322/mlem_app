import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import HomeScreen from '@screens/HomeScreen';
const Stack = createStackNavigator();

const CashbackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREENS.HOME_SCREEN}
    >
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
        
    </Stack.Navigator>
  )
}

export default CashbackNavigation
