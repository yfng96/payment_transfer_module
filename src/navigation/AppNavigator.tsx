import React, { useEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import SplashScreen from '~/screens/SplashScreen';
import HomeScreen from '~/screens/HomeScreen';
import RecipientSelectionScreen from '~/screens/RecipientSelectionScreen';
import TransferDetailFormScreen from '~/screens/TransferDetailFormScreen';
import TransferConfirmationScreen from '~/screens/TransferConfirmationScreen';
import WelcomeScreen from '~/screens/WelcomeScreen';
import { makeServer } from '~/api/server';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '~/store';
import { StaticParamList } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export type RootStackParamList = StaticParamList<typeof Stack>;

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: { auth: { token: string } }) => state.auth.token);

  useEffect(() => {
    makeServer({ token }); // Start the Mirage server
  }, [token]);

  return (
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
  );
};

export default AppNavigator;