import { useCallback, useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '~/components/ActionButton';
import { BANK_OPTIONS } from '~/constant';
import { Transaction } from '~/types';
import { resetTransactionInfo } from '../features/transaction/transactionSlice';
import { AppDispatch } from '~/store';
import * as LocalAuthentication from 'expo-local-authentication';
import { createTransfer } from '~/features/transaction/transactionAction';
import { unwrapResult } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import PinModal from '~/components/PinModal';
import GeneralModal from '~/components/GeneralModal';
import { updateBalance } from '~/features/wallet/walletSlice';

const TransferConfirmationScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<any>>();
  const transaction = useSelector(
    (state: { transaction: { transaction: Transaction } }) =>
      state.transaction.transaction
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handlePaymentTransfer = async (): Promise<void> => {
    const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometricSupported || !isEnrolled) {
      setShowPinModal(true);
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to Complete Payment',
      disableDeviceFallback: false,
    });

    if (result.success) {
      proceedWithPayment();
    } else {
      setShowPinModal(true);
    }
  };

  const proceedWithPayment = (): void => {
    if (showPinModal) {
      setShowPinModal(false);
    }

    setIsSubmitting(true);

    dispatch(
      createTransfer({
        accNo: transaction.accNo,
        accType: transaction.accType,
        bankCode: transaction.bankCode,
        reference: transaction.reference,
        amount: transaction.amount,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setIsSubmitting(false);
        dispatch(updateBalance(-transaction.amount));
        dispatch(resetTransactionInfo());

        setShowSuccessModal(true);
      })
      .catch((e) => {
        setIsSubmitting(false);
        if (e.code === 'FAILED') {
          Toast.show({
            type: 'error',
            text1: 'Payment transfer failed. Please try again.',
            position: 'bottom',
          });
        }
      });
  };

  const handleClose = (): void => {
    dispatch(resetTransactionInfo());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  const getBankName = useCallback((code: string): string => {
    const bank = BANK_OPTIONS.find((bank) => bank.code === code);
    return bank ? bank.name : '';
  }, []);

  return (
    <View className={styles.container}>
      <View className='flex-1'>
        <ScrollView contentContainerClassName={styles.scrollviewContainer}>
          <View className={styles.header}>
            <Text className={styles.headerText}>Confirmation</Text>
            <View className={styles.backIconContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name='arrow-back-ios' size={25} />
              </TouchableOpacity>
            </View>
            <View className={styles.closeIconContainer}>
              <TouchableOpacity onPress={handleClose}>
                <MaterialCommunityIcons name='close' size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View className={styles.amountContainer}>
            <Text className={styles.amountLabel}>Amount</Text>
            <Text className={styles.amountValue}>
              RM {transaction.amount.toFixed(2)}
            </Text>
          </View>

          <View className={styles.detailsContainer}>
            <View className={styles.divider} />
            <View className={styles.section}>
              <Text className={styles.sectionTitle}>To</Text>
              <View className={styles.cardContainer}>
                {transaction.accType === 1 ? (
                  <MaterialCommunityIcons name='bank' size={30} />
                ) : (
                  <MaterialCommunityIcons name='cellphone' size={30} />
                )}
                <View>
                  {!!transaction.recipientName && (
                    <Text className={styles.recipientName}>
                      {transaction.recipientName}
                    </Text>
                  )}
                  <Text className={styles.bankOrMobile}>
                    {transaction.accType === 1
                      ? getBankName(transaction.bankCode)
                      : 'Mobile Number'}
                  </Text>
                  <Text className={styles.accountNumber}>
                    {transaction.accNo}
                  </Text>
                </View>
              </View>
            </View>
            <View className={styles.divider} />
            <View className={styles.section}>
              <Text className={styles.sectionTitle}>Recipient Reference</Text>
              <View className={styles.cardContainer}>
                <Text className={styles.referenceText}>
                  {transaction.reference}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View className={styles.footer}>
        <ActionButton
          action={handlePaymentTransfer}
          icon={
            isSubmitting && <ActivityIndicator size='small' color='white' />
          }
          style={{ gap: 8 }}
          disabled={isSubmitting}
        >
          <Text className={styles.buttonText}>Confirm</Text>
        </ActionButton>
      </View>
      <PinModal
        handlePinInput={proceedWithPayment}
        isOpen={showPinModal}
        handleClose={() => setShowPinModal(false)}
      />
      <GeneralModal
        isOpen={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        icon={
          <MaterialCommunityIcons
            name='check-circle'
            size={100}
            color='#00ba09'
          />
        }
        showCancelButton={false}
        handleProceed={() => {
          setShowSuccessModal(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
        }}
      >
        <Text className='text-center text-2xl font-bold'>
          Transfer Successful
        </Text>
      </GeneralModal>
    </View>
  );
};

const styles = {
  container: `flex flex-col h-full`,
  header: `flex-row justify-center p-5 relative`,
  headerText: `text-lg`,
  scrollviewContainer: `pb-8`,
  backIconContainer: `absolute left-5 top-4`,
  closeIconContainer: `absolute right-4 top-4`,
  amountContainer: `flex items-center justify-center mt-4`,
  amountLabel: `text-lg`,
  amountValue: `text-3xl font-bold`,
  detailsContainer: `mt-5`,
  section: `flex flex-col mt-5`,
  sectionTitle: `text-lg font-bold mx-5 pl-3`,
  cardContainer: `flex flex-row items-center bg-white p-4 my-2 rounded-lg shadow-lg shadow-black-400 mx-5 gap-2.5`,
  recipientName: `text-sm`,
  bankOrMobile: `text-sm`,
  accountNumber: `text-xl`,
  divider: `h-px bg-gray-300 mt-3 mb-1 mx-5`,
  referenceText: `text-base`,
  footer: `py-5 px-4 bg-white`,
  buttonText: `text-white text-lg`,
};

export default TransferConfirmationScreen;
