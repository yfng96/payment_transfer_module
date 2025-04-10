import { View, TextInput, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomText from './CustomText';
import CustomTextBold from './CustomTextBold';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { AppDispatch } from '~/screens/store';
import { AuthState } from '~/screens/features/auth/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '~/screens/features/auth/authAction';
import Toast from 'react-native-toast-message';
import ActionButton from './ActionButton';

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginLoading } = useSelector((state: { auth: AuthState }) => state.auth);

  const handleLogin = () => {
    dispatch(login({ email, password }))
      .then(unwrapResult)
      .then(() => {
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
    <View style={{ flex: 1 }}>
      <View className={styles.formField}>
        <View className="flex-1">
          <TextInput
            className='text-[16px]'
            style={{ fontFamily: 'Roboto_400Regular' }}
            placeholder="Email"
            value={email}
            onChangeText={val => setEmail(val)}
            editable={!loginLoading}
          />
        </View>
      </View>
      <View className={styles.formField}>
        <View className="flex-1">
          <TextInput
            className='text-[16px] font-[Roboto_400Regular]'
            style={{ fontFamily: 'Roboto_400Regular' }}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={val => setPassword(val)}
            editable={!loginLoading}
          />
        </View>
        <MaterialCommunityIcons
          name={showPassword ? 'eye' : 'eye-off'}
          size={24}
          color="black"
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <ActionButton action={handleLogin} style={{ gap: 8 }} disabled={loginLoading || !email || !password}>
        <>
          {loginLoading && (
            <ActivityIndicator size="small" color="white" />
          )}
          <CustomText className={styles.loginButtonText}>Login</CustomText>
        </>
      </ActionButton>
      <View className="mt-5">
        <CustomText className={styles.signUpText}>
          Don't have an account? <CustomTextBold>Sign Up</CustomTextBold>
        </CustomText>
      </View>
    </View>
  )
}

const styles = {
  loginButtonText: 'text-white text-[18px]',
  formField: "flex flex-row h-[60px] justify-between items-center border border-[#005abb] rounded-lg p-2.5 mb-5 gap-2.5",
  signUpText: "text-center text-[#005abb]"
}

export default LoginForm