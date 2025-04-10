import { useNavigation, NavigationProp, StackActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const token = useSelector((state: RootState) => state.auth.token);
  const expiredAt = useSelector((state: RootState) => state.auth.expiredAt);

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
    <View className={style.screenContainer}>
      <Text className={style.title}>Digital Bank</Text>
    </View>
  );
};

const style = {
  screenContainer: 'flex-1 justify-center items-center',
  title: 'text-4xl text-[#005abb] font-bold'
}

export default SplashScreen;
