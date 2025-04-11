import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import { makeServer } from '~/api/server';
import SplashScreen from '~/screens/SplashScreen';
import HomeScreen from '~/screens/HomeScreen';
import WelcomeScreen from '~/screens/WelcomScreen';
import RecipientSelectionScreen from '~/screens/RecipientSelectionScreen';
import TransferDetailFormScreen from '~/screens/TransferDetailFormScreen';
import TransferConfirmationScreen from '~/screens/TransferConfirmationScreen';
import { store } from '~/store';
import './global.css';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  useEffect(() => {
    makeServer(); // Start the Mirage server
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1">
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="RecipientSelection"
              component={RecipientSelectionScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_bottom',
              } as NativeStackNavigationOptions}
            />
            <Stack.Screen
              name="TransferDetailForm"
              component={TransferDetailFormScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              } as NativeStackNavigationOptions}
            />
            <Stack.Screen
              name="TransferConfirmation"
              component={TransferConfirmationScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              } as NativeStackNavigationOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}