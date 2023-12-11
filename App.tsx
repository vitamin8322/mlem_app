import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import HomeScreen from '@screens/HomeScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SplashScreen from 'react-native-splash-screen';
import {NativeBaseProvider} from 'native-base';
import {Icon} from 'assets';
import Navigation from 'navigation';
const queryClient = new QueryClient();

function App(): JSX.Element {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
