import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREENS } from "@shared-constants";
import { TransactionHistory, TransactionHistoryActive, Home, HomeActive, SaleReport, Report, ReportActive, Account, AccountActive, Add } from "assets";
import HomeNavigation from "./HomeNavigation";
import TransactionHistoryNavigation from "./TransactionHistoryNavigation";
import { useTranslation } from "react-i18next";
import ReportNavigation from "./ReportNavigation";
import AccountNavigation from "./AccountNavigation";
import TransactionNavigation from "./TransactionNavigation";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const { t, i18n } = useTranslation("home");
  const renderTabIcon = (
        route: any,
        focused: boolean,
        color: string,
        size: number,
      ) => {
        let iconName = <Home height={24} width={24} />;
        switch (route.name) {
          case t(SCREENS.HOME):
            iconName = !focused ? (
              <Home height={24} width={24} />
            ) : (
              <HomeActive height={24} width={24} />
            );
            break;
          case `${t(SCREENS.TRANSACTION_HISTORY)}`:
            iconName = !focused ? (
              <TransactionHistory height={24} width={24} />
            ) : (
              <TransactionHistoryActive height={24} width={24} />
            );
            break;
          case `${t(SCREENS.ADD_TRANSACTION)}`:
            iconName = (
              <Add height={34} width={34} />
            ) 
            break;
          case t(SCREENS.REPORT):
            iconName = !focused ? (
              <Report height={24} width={24} />
            ) : (
              <ReportActive height={24} width={24} />
            );
            break;
          case t(SCREENS.ACCOUNT):
            iconName = !focused ? (
              <Account height={24} width={24} />
            ) : (
              <AccountActive height={24} width={24} />
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
              tabBarActiveTintColor: '#000',
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: '#FFF',
              },
              tabBarHideOnKeyboard: true,
            })}
          >
            <Tab.Screen
              name={`${t(SCREENS.HOME)}`}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  navigation.navigate(t(SCREENS.HOME));
                },
              })}
              component={HomeNavigation}
              // options={{ tabBarLabel: '' }}
            />
            <Tab.Screen
              name={`${t(SCREENS.TRANSACTION_HISTORY)}`}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  navigation.navigate(t(SCREENS.TRANSACTION_HISTORY));
                },
              })}
              component={TransactionHistoryNavigation}
            />
            <Tab.Screen
              name={`${t(SCREENS.ADD_TRANSACTION)}`}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  navigation.navigate(t(SCREENS.ADD_TRANSACTION));
                },
              })}
              component={TransactionNavigation}
              options={{ tabBarLabel: '' }}
            />

            <Tab.Screen
              name={`${t(SCREENS.REPORT)}`}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  navigation.navigate(t(SCREENS.REPORT));
                },
              })}
              component={ReportNavigation}
            />
            <Tab.Screen
              name={`${t(SCREENS.ACCOUNT)}`}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  if (false) {
                    e.preventDefault();
                    navigation.navigate(SCREENS.LOGIN_SCREEN);
                  } else {
                    navigation.navigate(SCREENS.ACCOUNT);
                  }
                },
              })}
              component={AccountNavigation}
            />
          </Tab.Navigator>
        </>
      );

      // #908898
}

export default BottomTabNavigation;
