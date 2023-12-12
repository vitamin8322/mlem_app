import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import HomeScreen from '@screens/home/HomeScreen';
const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREENS.HOME_SCREEN}
    >
      <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
        
    </Stack.Navigator>
  )
}

export default HomeNavigation
