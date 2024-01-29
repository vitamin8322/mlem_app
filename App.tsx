import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {LogBox, SafeAreaView, Text, View} from 'react-native';
import HomeScreen from '@screens/home/HomeScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SplashScreen from 'react-native-splash-screen';
import {NativeBaseProvider} from 'native-base';
import "./src/translations/i18n";
import {Icon} from 'assets';
import Navigation from 'navigation';
import LoginScreen from '@screens/login/LoginScreen';
const queryClient = new QueryClient();

function App(): JSX.Element {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </QueryClientProvider>
      {/* <HomeScreen />
      <LoginScreen /> */}
    </>
  );
}

export default App;
