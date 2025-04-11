import { useState } from 'react';
import { Text, View, } from 'react-native';
import LoginForm from '~/components/LoginForm';
import ActionButton from '~/components/ActionButton';

const WelcomeScreen: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  return (
    <View className={styles.screen}>
      <View className={showLoginForm ? styles.loginWelcomeContainer : styles.welcomeContainer}>
        {showLoginForm ? (
          <Text className={styles.welcomeText} style={{ fontWeight: 'bold' }} >
            Digital Bank
          </Text>
        ) : (
          <>
            <Text className={styles.welcomeText}>Welcome to</Text>
            <Text className={styles.welcomeText}>
              the <Text className='font-bold'>Digital Bank!</Text>
            </Text>
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
            <Text className={styles.loginButtonText}>Login</Text>
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
  formField: 'flex flex-row h-[60px] justify-between items-center border border-[#005abb] rounded-lg p-2.5 mb-5 gap-2.5',
  signUpText: 'text-center text-[#005abb]'
}

export default WelcomeScreen;
