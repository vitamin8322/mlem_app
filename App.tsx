import 'react-native-gesture-handler';
import React, {useContext, useEffect} from 'react';
import {LogBox, SafeAreaView, Text, View} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SplashScreen from 'react-native-splash-screen';
import {NativeBaseProvider} from 'native-base';
import i18n from './src/translations/i18n';
import {I18nextProvider} from 'react-i18next';
import {ToastProvider} from 'react-native-toast-notifications';
import Navigation from 'navigation';
import {MenuProvider} from 'react-native-popup-menu';
import {asyncStorageService} from 'utils/storage';
import {AppProvider} from 'contexts/app.context';
const queryClient = new QueryClient();

function App(): JSX.Element {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
    ]);
    LogBox.ignoreLogs([`Possible unhandled promise rejection`]);
    LogBox.ignoreLogs([
      "Warning: This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the property `nativeEvent` on a released/nullified synthetic event. This is set to null. If you must keep the original synthetic event around, use event.persist(). See https://reactjs.org/link/event-pooling for more information.",
    ]);
    const initializeLanguage = async () => {
      const lang = await asyncStorageService.getValue('lang');
      i18n.changeLanguage(lang || 'vi');
    };

    initializeLanguage();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <NativeBaseProvider>
            <MenuProvider>
              <I18nextProvider i18n={i18n}>
                <ToastProvider>
                  <Navigation />
                </ToastProvider>
              </I18nextProvider>
            </MenuProvider>
          </NativeBaseProvider>
        </AppProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
