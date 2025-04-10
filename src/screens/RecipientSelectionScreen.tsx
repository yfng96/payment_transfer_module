import { Fragment, useCallback, useRef, useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '~/components/ActionButton';
import RecipientList from '~/components/RecipientList';
import { RECIPIENT_OPTIONS } from '~/constant';
import { RecipientInfo, RecipientListType } from '~/types';
import { resetTransactionInfo, setTransactionAccInfo } from '../features/transaction/transactionSlice';
import { AppDispatch } from '~/store';

const RecipientSelectionScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<any>>();
  const favouriteRecipients = useSelector(
    (state: { wallet: { favouriteRecipient: RecipientListType } }) =>
      state.wallet.favouriteRecipient
  );
  const recentRecipients = useSelector(
    (state: { wallet: { recentRecipient: RecipientListType } }) =>
      state.wallet.recentRecipient
  );
  const [selectedTab, setSelectedTab] = useState(0);

  const sliderPosition = new Animated.Value(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleTabChange = (index: number): void => {
    setSelectedTab(index);

    // Animate the slider position based on selected tab
    Animated.timing(sliderPosition, {
      toValue: index * 100,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  const selectAccType = (type: number): void => {
    dispatch(setTransactionAccInfo({
      accType: type,
    }))
    bottomSheetModalRef.current?.dismiss();
    navigation.navigate('TransferDetailForm');
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSelectRecipient = (recipient: RecipientInfo): void => {
    dispatch(setTransactionAccInfo({
      accType: recipient.type,
      accNo: recipient.accountNo,
      bankCode: recipient.bankCode,
      recipientName: recipient.name
    }));
    bottomSheetModalRef.current?.dismiss();
    navigation.navigate('TransferDetailForm');
  }

  const handleClose = (): void => {
    dispatch(resetTransactionInfo());
    navigation.goBack();
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View className={styles.container}>
          <View className={styles.header}>
            <Text className={styles.headerText}>Transfer To</Text>
            <View className={styles.closeIconContainer}>
              <TouchableOpacity
                onPress={handleClose}
                className={styles.closeIcon}
              >
                <MaterialCommunityIcons name='close' size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View className={styles.newTransferButtonContainer}>
            <ActionButton
              color='#ffffff'
              style={{ height: 80 }}
              icon={<MaterialIcons name='add-circle' size={45} color='#2773ff' />}
              action={handlePresentModalPress}
            >
              <Text className={styles.newTransferButtonText}>New Transfer</Text>
            </ActionButton>
          </View>
          <View className={styles.tabsContainer}>
            <View className={styles.tabs}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleTabChange(0)}
                className={styles.tabButton}
              >
                <Text className={styles.tabText}>Favourite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleTabChange(1)}
                className={styles.tabButton}
              >
                <Text className={styles.tabText}>Recent</Text>
              </TouchableOpacity>
            </View>
            <Animated.View
              className={styles.slider}
              style={{ left: sliderPosition, bottom: -8 }}
            />
          </View>
          <View className={styles.recipientListContainer}>
            {selectedTab === 0 && <RecipientList list={favouriteRecipients.list} onSelect={handleSelectRecipient} />}
            {selectedTab === 1 && <RecipientList list={recentRecipients.list} onSelect={handleSelectRecipient} />}
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
                <Text className={styles.modalHeaderText}>New Transfer</Text>
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
                {RECIPIENT_OPTIONS.map((option, index) => (
                  <Fragment key={index} >
                    {index > 0 && <View className={styles.divider} />}
                    <ActionButton alignment='start' color='transparent' action={() => selectAccType(index + 1)}>
                      <Text className={styles.modalOptionText}>{option.name}</Text>
                    </ActionButton>
                  </Fragment>
                ))}
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView >
  );
};

const styles = {
  container: `flex`,
  header: `flex-row justify-center p-5`,
  headerText: `text-lg`,
  closeIconContainer: `absolute right-0`,
  closeIcon: `absolute right-5 top-5`,
  newTransferButtonContainer: `mt-2 px-5`,
  newTransferButtonText: `text-lg`,
  tabsContainer: `flex-row gap-8 mx-5 mt-8`,
  tabs: `flex-row gap-5`,
  tabButton: `w-24`,
  tabText: `text-[#2773ff] text-base text-center`,
  slider: `absolute h-[3px] w-24 bg-[#2773ff] rounded`,
  recipientListContainer: `mt-4`,
  bottomSheetContainer: `flex-1 px-5 pb-20`,
  divider: `h-px w-full bg-[#e0e0e0] my-2`,
  backdrop: `bg-black/50`,
  modalHeader: `flex-row justify-center w-full`,
  modalHeaderText: `text-xl font-bold`,
  modalCloseIconContainer: `absolute right-0`,
  modalCloseIcon: `absolute right-0 top-0`,
  modalContent: `mt-6 flex items-start`,
  modalOptionText: `text-base`,
};

export default RecipientSelectionScreen;
