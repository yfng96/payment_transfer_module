import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import SplashScreen from '~/screens/SplashScreen';
import HomeScreen from '~/screens/HomeScreen';
import WelcomeScreen from '~/screens/WelcomScreen';
import { makeServer } from '~/api/server';

import './global.css';
import RecipientSelectionScreen from '~/screens/RecipientSelectionScreen';
import TransferDetailFormScreen from '~/screens/TransferDetailFormScreen';
import { store } from '~/store';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    makeServer(); // Start the Mirage server
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Start' component={SplashScreen} />
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='RecipientSelection' component={RecipientSelectionScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_bottom'
              }}
            />
            <Stack.Screen name='TransferDetailForm' component={TransferDetailFormScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});