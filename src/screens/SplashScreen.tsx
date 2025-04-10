import { useNavigation, NavigationProp, StackActions } from '@react-navigation/native';
import CustomText from '~/components/CustomText';
import CustomTextBold from '~/components/CustomTextBold';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
// import { RootState } from 'store'; // Adjust the import path to your store file
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const token = useSelector((state: RootState) => state.auth.token);
  const expiredAt = useSelector((state: RootState) => state.auth.expiredAt);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token && expiredAt) {
        const currentTime = new Date().getTime();
        const expiredAtTime = new Date(expiredAt).getTime();
        if (currentTime < expiredAtTime) {
          navigation.dispatch(StackActions.replace('Home', {}));
          return;
        }
      }
      navigation.dispatch(StackActions.replace('Welcome', {}));
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomTextBold style={{ fontSize: 40, color: "#005abb" }}>Digital Bank</CustomTextBold>
    </View>
  );
};

export default SplashScreen;
