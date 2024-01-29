import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SCREENS } from '@shared-constants';
import TransactionHistoryScreen from '@screens/transaction-history';
import ReportScreen from '@screens/report';
const Stack = createStackNavigator();

const ReportNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREENS.REPORT_SCREEN}
    >
      <Stack.Screen name={SCREENS.REPORT_SCREEN} component={ReportScreen} />
        
    </Stack.Navigator>
  )
}

export default ReportNavigation
