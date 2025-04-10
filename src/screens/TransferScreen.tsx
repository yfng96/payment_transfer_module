import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TransferScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [accTypeSelection, setAccTypeSelection] = useState<number>(0);
  const [amount, setAmount] = useState<string>('0.00');
  const [reference, setReference] = useState<string>('');
  const balance = 50000000;
  type CategoryType = 'Drink' | 'Market' | 'Transfer';

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const selectAccType = (type: number) => {
    setAccTypeSelection(type);
    bottomSheetModalRef.current?.dismiss();
  };

  const handleAmountChange = (text: string) => {
    // Remove all non-numeric characters except for digits
    const numericText = text.replace(/\D/g, '').replace(/^0+/, '');

    // Adjust the value based on length
    if (numericText.length <= 2) {
      setAmount(`0.${numericText.padStart(2, '0')}`);
    } else {
      const integerPart = numericText.slice(0, numericText.length - 2);
      const decimalPart = numericText.slice(numericText.length - 2);
      setAmount(`${integerPart}.${decimalPart}`);
    }
  };

  return (
    <View className={styles.flexContainer}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#f5f5f5' }}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 16 }}>Transfer</Text>
        </View>
      </View>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <View style={{ display: "flex", height: "100%" }}>
            <View style={{ flex: 1, padding: 20 }}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <View
                  style={{
                    borderRadius: 50,
                    backgroundColor: '#90afff',
                    width: 25,
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 16, color: 'white' }}>1</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text className="text-2xl font-bold">To</Text>
                  <View
                    style={{
                      marginTop: 12,
                      borderBottomColor: '#939393',
                      borderBottomWidth: 1,
                      width: '100%',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                    }}
                    onTouchEnd={handlePresentModalPress}>
                    <Text style={{ fontSize: 18, color: '#939393', }}>Recipient</Text>
                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color="#939393"
                      style={{ position: 'absolute', right: 0 }}
                    />
                  </View>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 30 }}>
                <View
                  style={{
                    borderRadius: 50,
                    backgroundColor: '#90afff',
                    width: 25,
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 16, color: 'white' }}>2</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text className="text-2xl font-bold">Amount</Text>
                  <View
                    style={{
                      marginTop: 12,
                      borderBottomColor: '#939393',
                      borderBottomWidth: 1,
                      width: '100%',
                      paddingVertical: 4,
                      paddingHorizontal: 4,
                    }}>
                    <Text style={{ fontSize: 18, color: 'black', marginLeft: 4 }}>RM {amount}</Text>
                    <View style={{ position: 'absolute', left: 0, top: 0, width: '100%' }}>
                      <TextInput
                        style={{ fontSize: 18, color: '#000', paddingVertical: 5, opacity: 0 }}
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        onChangeText={handleAmountChange}
                        value={`RM ${amount}`}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 30 }}>
                <View
                  style={{
                    borderRadius: 50,
                    backgroundColor: '#90afff',
                    width: 25,
                    height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 16, color: 'white' }}>3</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text className="text-2xl font-bold">Recipient Reference</Text>
                  <View
                    style={{
                      marginTop: 12,
                      borderBottomColor: '#939393',
                      borderBottomWidth: 1,
                      width: '100%',
                      paddingVertical: 4,
                      paddingHorizontal: 4,
                    }}>
                    <TextInput
                      style={{ fontSize: 18, color: '#000', paddingVertical: 5 }}
                      placeholder="Enter recipient reference"
                      onChangeText={(text) => setReference(text)}
                      value={reference}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 30, backgroundColor: '#90afff', padding: 10, borderRadius: 10, justifyContent: 'center' }} onTouchEnd={() => { }}>
                <Text style={{ fontSize: 20, color: 'white' }}>
                  Next
                </Text>
              </View></View>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              onChange={handleSheetChanges}
              backdropComponent={(props) => (
                <View
                  {...props}
                  className={styles.backdrop}
                  style={[props.style]}
                  onTouchEnd={() => bottomSheetModalRef.current?.dismiss()}
                />
              )}>
              <BottomSheetView className={styles.contentContainer}>
                <View className={styles.accSelection} onTouchEnd={() => selectAccType(1)}>
                  <Text style={{ fontSize: 16 }}>Account No. </Text>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="black"
                    className={styles.iconRight}
                  />
                </View>
                <View className={styles.divider} />
                <View className={styles.accSelection} onTouchEnd={() => selectAccType(2)}>
                  <Text style={{ fontSize: 16 }}>Mobile No. </Text>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="black"
                    className={styles.iconRight}
                  />
                </View>
                <View className={styles.divider} style={{ marginBottom: 20 }} />
                <View
                  className={styles.cancelButton}
                  onTouchEnd={() => bottomSheetModalRef.current?.dismiss()}>
                  <Text className={styles.cancelButtonText}>Cancel</Text>
                </View>
              </BottomSheetView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View >
  );
};
const styles = {
  flexContainer: `flex-1 bg-white`,
  button: `flex-row items-center justify-center bg-[#90afff] p-2 rounded-lg mb-5 gap-2 w-full`,
  buttonText: `text-white text-lg`,
  contentContainer: `flex-1 items-center px-5`,
  accSelection: `h-10 w-full rounded-t-lg flex-row justify-center items-center`,
  iconRight: `absolute right-0`,
  divider: `h-px w-full bg-[#e0e0e0] my-2`,
  cancelButton: `flex-row items-center justify-center bg-red-500 p-2 rounded-lg mb-5 gap-2 w-full`,
  cancelButtonText: `text-white text-lg`,
  backdrop: `bg-black/50`,
};

export default TransferScreen;