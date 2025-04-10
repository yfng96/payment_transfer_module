import CustomText from '~/components/CustomText';
import CustomTextBold from '~/components/CustomTextBold';
import { useState } from 'react';
import { View, } from 'react-native';
import LoginForm from '~/components/LoginForm';
import ActionButton from '~/components/ActionButton';

const WelcomeScreen = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <View className={styles.screen}>
      <View className={showLoginForm ? styles.loginWelcomeContainer : styles.welcomeContainer}>
        {showLoginForm ? (
          <CustomTextBold className={styles.welcomeText}>
            Digital Bank
          </CustomTextBold>
        ) : (
          <>
            <CustomText className={styles.welcomeText}>Welcome to</CustomText>
            <CustomText className={styles.welcomeText}>
              the <CustomTextBold>Digital Bank!</CustomTextBold>
            </CustomText>
          </>
        )}
      </View>
      {showLoginForm ? (
        <LoginForm />
      ) : (
        <View>
          <ActionButton
            action={() => setShowLoginForm(true)}
          >
            <CustomText className={styles.loginButtonText}>Login</CustomText>
          </ActionButton>
        </View >
      )}

    </View >
  );
};

const styles = {
  screen: 'flex-1 bg-white p-8',
  loginWelcomeContainer: 'flex-1 items-center justify-center',
  welcomeContainer: 'flex-1 justify-center',
  welcomeText: 'text-[#005abb] text-[35px]',
  loginButtonText: 'text-white text-[18px]',
  formField: "flex flex-row h-[60px] justify-between items-center border border-[#005abb] rounded-lg p-2.5 mb-5 gap-2.5",
  signUpText: "text-center text-[#005abb]"
}

export default WelcomeScreen;
