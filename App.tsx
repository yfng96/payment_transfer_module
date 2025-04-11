import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { makeServer } from '~/api/server';
import { store } from '~/store';
import AppNavigator from '~/navigation/AppNavigator';
import { navigationRef } from '~/navigation/NavigationService';
import './global.css';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1">
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}