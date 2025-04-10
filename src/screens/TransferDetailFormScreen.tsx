import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '~/components/ActionButton';
import { BANK_OPTIONS } from '~/constant';
import { Balance, BankType, Transaction } from '~/types';
import CustomTextInput from '~/components/CustomTextInput';
import { resetTransactionInfo, setTransactionAccInfo } from '../features/transaction/transactionSlice';
import { AppDispatch } from '~/store';
import PriceInput from '~/components/PriceInput';

const TransferDetailFormScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<any>>();
  const balance = useSelector((state: { wallet: { balance: Balance } }) => state.wallet.balance);
  const transaction = useSelector((state: { transaction: { transaction: Transaction } }) => state.transaction.transaction);

  const [amount, setAmount] = useState<string>('0.00');
  const [accNo, setAccNo] = useState<string>('');
  const [remark, setRemark] = useState<string>('');
  const [bank, setBank] = useState<BankType | null>(null);
  const [error, setError] = useState<{
    accNo: string | null;
    amount: string | null;
    remark: string | null;
    bank: string | null;
  }>({
    accNo: null,
    amount: null,
    remark: null,
    bank: null,
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (transaction.accType === 1 && !transaction.bankCode) {
      const timeoutId = setTimeout(() => {
        bottomSheetModalRef.current?.present();
      }, 500);

      return () => clearTimeout(timeoutId);
    }

    return () => {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [])

  useEffect(() => {
    setAccNo(transaction.accNo);

    if (transaction.bankCode) {
      let selectedBank: BankType | null = BANK_OPTIONS.find(option => option.code === transaction.bankCode) ?? null;
      setBank(selectedBank);
    }
  }, [transaction])

  const handleAmountChange = (text: string): void => {
    const numericText = text.replace(/\D/g, '').replace(/^0+/, '');

    let formattedText = numericText;
    if (numericText.length <= 2) {
      formattedText = `0.${numericText.padStart(2, '0')}`;
    } else {
      const integerPart = numericText.slice(0, numericText.length - 2);
      const decimalPart = numericText.slice(numericText.length - 2);
      formattedText = `${integerPart}.${decimalPart}`;
    }
    setAmount(formattedText);

    if (parseFloat(formattedText) > balance.amount) {
      setError({ ...error, amount: '** Exceeds available balance' });
    } else if (error.amount) {
      setError({ ...error, amount: null });
    }
  };

  const selectBank = (bank: BankType): void => {
    setBank(bank);
    if (error.bank) {
      setError({ ...error, bank: null });
    }
    bottomSheetModalRef.current?.dismiss();
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const validate = (): boolean => {
    console.log("validate");
    let hasError: boolean = false;
    let validateError = { ...error };

    if (!accNo.trim()) {
      hasError = true;
      validateError.accNo = '** Required';
    }

    if (!remark.trim()) {
      hasError = true;
      validateError.remark = '** Required';
    }

    if (!bank && transaction.accType === 1) {
      hasError = true;
      validateError.bank = '** Required';
    }

    if (!amount || parseFloat(amount) <= 0) {
      hasError = true;
      validateError.amount = '** Required';
    }

    if (parseFloat(amount) > balance.amount) {
      hasError = true;
      validateError.amount = '** Exceeds available balance';
    }

    setError(validateError);

    return hasError ? false : true;
  }

  const handleClose = (): void => {
    dispatch(resetTransactionInfo());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    )
  }

  const confirmSubmit = (): void => {
    dispatch(setTransactionAccInfo({
      accNo: accNo,
      bankCode: bank?.code,
      amount: parseFloat(amount),
      reference: remark,
    }));
    navigation.navigate('TransferConfirmation');
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View className={styles.container}>
          <View className='flex-1'>
            <ScrollView contentContainerClassName={styles.scrollviewContainer}>
              <View className={styles.header}>
                <Text className={styles.headerText}>Transfer</Text>
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
              <View className={styles.card}>
                <Text className={styles.cardTitle}>Recipient Details</Text>
                {transaction.accType === 1 && (
                  <>
                    <View className={styles.formField} style={{ borderColor: error.bank ? 'red' : '#005abb' }}>
                      <TouchableOpacity activeOpacity={1} onPress={handlePresentModalPress}>
                        <View className={styles.row}>
                          <TextInput
                            className='text-[16px]'
                            placeholder='Select Recipient Bank'
                            value={bank ? bank.name : ''}
                            editable={false}
                          />
                          <MaterialIcons name='keyboard-arrow-right' size={20} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    {error.bank && (
                      <View>
                        <Text className={styles.errorText}>
                          {error.bank}
                        </Text>
                      </View>
                    )}
                  </>
                )}
                <View>
                  <CustomTextInput
                    placeholder={transaction.accType === 2 ? 'Enter Mobile Number' : 'Enter Account Number'}
                    value={accNo}
                    onChangeText={(val) => {
                      setAccNo(val);
                      if (error.accNo) {
                        setError({ ...error, accNo: null });
                      }
                    }}
                    keyboardType='numeric'
                    borderColor={error.accNo ? 'red' : '#005abb'}
                  />
                  {error.accNo && (
                    <View className='mt-2'>
                      <Text className={styles.errorText}>
                        {error.accNo}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View className={styles.card}>
                <Text className={styles.cardTitle}>Amount</Text>
                <View>
                  <PriceInput value={amount} onChangeText={handleAmountChange} error={error.amount} />
                  <View>
                    <Text className={styles.helperText}>
                      can transfer up to {balance.currency} {balance.amount.toFixed(2)}
                    </Text>
                  </View>
                  {error.amount && (
                    <View className='mt-2'>
                      <Text className={styles.errorText}>
                        {error.amount}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View className={styles.card}>
                <Text className={styles.cardTitle}>Recipient Reference</Text>
                <View>
                  <CustomTextInput
                    borderColor={error.remark ? 'red' : '#005abb'}
                    placeholder='Enter Recipient Reference'
                    value={remark}
                    onChangeText={(val) => {
                      setRemark(val);
                      if (error.remark) {
                        setError({ ...error, remark: null });
                      }
                    }}
                    maxLength={140}
                  />
                  <View className={styles.charCountContainer}>
                    <Text className={styles.helperText}>
                      {remark.length}/140
                    </Text>
                  </View>
                  {error.remark && (
                    <View>
                      <Text className={styles.errorText}>
                        {error.remark}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <BottomSheetModal
                ref={bottomSheetModalRef}
                backdropComponent={(props) => (
                  <View
                    {...props}
                    className={styles.backdrop}
                    style={[props.style]}
                    onTouchEnd={() => bottomSheetModalRef.current?.dismiss()}
                  />
                )}>
                <BottomSheetView className={styles.bottomSheetContainer}>
                  <View className={styles.modalHeader}>
                    <Text className={styles.modalHeaderText}>Recipient Bank</Text>
                    <View className={styles.modalCloseIconContainer}>
                      <TouchableOpacity
                        onPress={() => bottomSheetModalRef.current?.dismiss()}
                        className={styles.modalCloseIcon}
                      >
                        <MaterialCommunityIcons name='close' size={25} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View className={styles.modalContent}>
                    {BANK_OPTIONS.map((option, index) => (
                      <Fragment key={index}>
                        {index > 0 && <View className={styles.divider} />}
                        <ActionButton alignment='start' color='transparent' action={() => selectBank(option)}>
                          <Text className={styles.modalOptionText}>{option.name}</Text>
                        </ActionButton>
                      </Fragment>
                    ))}
                  </View>
                </BottomSheetView>
              </BottomSheetModal>
            </ScrollView>
          </View>
          <View className={styles.footer}>
            <ActionButton action={() => {
              if (validate()) {
                confirmSubmit();
              }
            }} >
              <Text className={styles.buttonText}>Next</Text>
            </ActionButton>
          </View>
        </View>
      </BottomSheetModalProvider >
    </GestureHandlerRootView >
  );
};
const styles = {
  container: `flex flex-col h-full`,
  header: `flex-row justify-center p-5 relative`,
  headerText: `text-lg`,
  scrollviewContainer: `pb-8`,
  backIconContainer: `absolute left-5 top-4`,
  closeIconContainer: `absolute right-4 top-4`,
  card: `p-4 bg-white flex gap-5 rounded-lg mx-5 mt-5`,
  cardTitle: `text-lg font-bold`,
  formField: `flex flex-row h-[60px] justify-between items-center border border-[#005abb] rounded-lg p-2.5 gap-2.5`,
  row: `flex flex-row w-full items-center justify-between`,
  helperText: `text-gray-500 ml-2`,
  errorText: `text-red-500 ml-2`,
  charCountContainer: `flex flex-row justify-end`,
  backdrop: `bg-black/50`,
  bottomSheetContainer: `flex-1 px-5 pb-20`,
  divider: `h-px w-full bg-gray-300 my-2`,
  modalHeader: `flex-row justify-center w-full`,
  modalHeaderText: `text-xl font-bold`,
  modalCloseIconContainer: `absolute right-0`,
  modalContent: `mt-6 flex items-start`,
  modalOptionText: `text-base`,
  modalCloseIcon: `absolute right-0 top-0`,
  footer: `py-5 px-4 bg-white`,
  buttonText: `text-white text-lg`,
};

export default TransferDetailFormScreen;
