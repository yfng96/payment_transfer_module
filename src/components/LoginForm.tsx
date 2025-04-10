import { View, TextInput, ActivityIndicator, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '~/features/auth/authAction';
import ActionButton from './ActionButton';
import { AuthState } from '~/types';
import { getBalance } from '~/features/wallet/walletAction';
import CustomTextInput from './CustomTextInput';
import { AppDispatch } from '~/store';

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loginLoading } = useSelector((state: { auth: AuthState }) => state.auth);

  const handleLogin = () => {
    dispatch(login({ email, password }))
      .then(unwrapResult)
      .then(() => {
        dispatch(getBalance());
        navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }));
      }).catch((error) => {
        Toast.show({
          type: 'error',
          text1: error.message,
          position: 'bottom',
        });
      });
  };

  return (
    <View className={styles.formContainer}>
      <CustomTextInput
        className='text-[16px] w-full'
        placeholder='Email'
        value={email}
        onChangeText={val => setEmail(val)}
        editable={!loginLoading}
      />
      <CustomTextInput
        placeholder='Password'
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={val => setPassword(val)}
        editable={!loginLoading}
        icon={
          <MaterialCommunityIcons
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color='black'
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <View>
        <ActionButton action={handleLogin} icon={loginLoading && <ActivityIndicator size='small' color='white' />} style={{ gap: 8 }} disabled={loginLoading || !email || !password}>
          <Text className={styles.loginButtonText}>Login</Text>
        </ActionButton>
        <View className='mt-5'>
          <Text className={styles.signUpText}>
            Don't have an account? <Text className='font-bold'>Sign Up</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = {
  formContainer: 'flex-1 gap-5',
  loginButtonText: 'text-white text-[18px]',
  signUpText: 'text-center text-[#005abb]'
}

export default LoginForm