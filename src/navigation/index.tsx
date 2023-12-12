import { SCREENS } from "@shared-constants";
import BottomTabNavigation from "./BottomTabNavigation";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import LoginScreen from "@screens/login/LoginScreen";
import RegisterSceen from "@screens/register/RegisterScreen";

const Stack = createStackNavigator();
// const LightTheme: ExtendedTheme = {
//     dark: false,
//     colors: {
//       ...DefaultTheme.colors,
//       ...palette,
//     },
//   };
const Navigation = () => {
//   const { isAuthenticated } = useContext(AppContext);
//   React.useEffect((): any => {
//     return () => (isReadyRef.current = false);
//   }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    //   theme={LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {true && (
          <>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
              <Stack.Screen name={SCREENS.REGISTER_SCREEN} component={RegisterSceen} />
              {/* <Stack.Screen
                name={SCREENS.FORGOT_PASSWORD}
                component={ForgotPassword}
              /> */}
            </Stack.Group>

            {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name={SCREENS.MODAL_AUTHENTICATION}
                component={ModalAuthentication}
              />
            </Stack.Group> */}
          </>
        )}
        <Stack.Group>
          {/* <Stack.Screen name={SCREENS.DRAWER} component={DrawerNavigation} /> */}
          <Stack.Screen name={SCREENS.BOTTOM} component={BottomTabNavigation} />
        </Stack.Group>

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;