import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREENS } from "@shared-constants";
import { Home, SaleReport } from "assets";
import HomeNavigation from "./HomeNavigation";
import CashbackNavigation from "./CashbackNavigation";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    const renderTabIcon = (
        route: any,
        focused: boolean,
        color: string,
        size: number,
      ) => {
        let iconName = <Home height={24} width={24} />;
        switch (route.name) {
          case SCREENS.HOME:
            iconName = !focused ? (
              <Home height={24} width={24} />
            ) : (
              <Home height={24} width={24} />
            );
            break;
          case SCREENS.SALE_REPORT:
            iconName = !focused ? (
              <SaleReport height={24} width={24} />
            ) : (
              <SaleReport height={24} width={24} />
            );
            break;
        }
        return <>{iconName}</>;
      };

      return (
        <>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) =>
                renderTabIcon(route, focused, color, size),
              tabBarActiveTintColor: '#FE7A3E',
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: '#FFF',
              },
              tabBarHideOnKeyboard: true,
            })}
          >
            <Tab.Screen
              name={SCREENS.HOME}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  navigation.navigate(SCREENS.HOME);
                },
              })}
              component={HomeNavigation}
            />
            <Tab.Screen
              name={SCREENS.SALE_REPORT}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  navigation.navigate(SCREENS.SALE_REPORT);
                },
              })}
              component={CashbackNavigation}
            />
          </Tab.Navigator>
        </>
      );


}

export default BottomTabNavigation;
