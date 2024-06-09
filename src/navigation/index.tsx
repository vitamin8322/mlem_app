import { SCREENS } from "@shared-constants";
import BottomTabNavigation from "./BottomTabNavigation";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import LoginScreen from "@screens/login/LoginScreen";
import RegisterSceen from "@screens/register/RegisterScreen";
import { useContext } from "react";
import { AppContext } from "contexts/app.context";
import ForgotPasswordScreen from "@screens/forgot-password/ForgotPasswordScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    //   theme={LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated && (
          <>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
              <Stack.Screen name={SCREENS.REGISTER_SCREEN} component={RegisterSceen} />
              {/* <Stack.Screen
                name={SCREENS.FORGOT_PASSWORD}
                component={ForgotPassword}
              /> */}
            </Stack.Group>
          </>
        )}
        <Stack.Group>
          {/* <Stack.Screen name={SCREENS.DRAWER} component={DrawerNavigation} /> */}
          <Stack.Screen name={SCREENS.BOTTOM} component={BottomTabNavigation} />
        </Stack.Group>

        <Stack.Screen name={SCREENS.FORGOT_PASSWORD_SCREEN} >
        {(props) =>{
          return <ForgotPasswordScreen />}}

        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;