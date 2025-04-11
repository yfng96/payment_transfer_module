import { useEffect, useRef, useState } from 'react';
import { Modal, View, TextInput, Text, TouchableOpacity, Alert, Keyboard } from 'react-native';
import ActionButton from './ActionButton';

// modal to prompt pin code input
const PinModal = ({
  handlePinInput,
  isOpen,
  handleClose,
}: {
  handlePinInput: (pin: string) => void;
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const [pin, setPin] = useState('');
  const pinInputRef = useRef<TextInput>(null)

  const handlePinChange = (input: string): void => {
    if (input.length <= 6) {
      setPin(input);
    }
  };

  const handleSubmit = (): void => {
    if (pin.length === 6) {
      handlePinInput(pin);
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit PIN');
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        pinInputRef.current?.focus();
      }, 100);
    } else {
      setPin('');
      Keyboard.dismiss();
    }
  }, [isOpen]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <View
        className={styles.modalOverlay}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <View className={styles.modalContent}>
          <Text className={styles.title}>Enter 6-Digit PIN</Text>

          {/* PIN Input */}
          <TextInput
            ref={pinInputRef}
            className={styles.pinInput}
            value={pin}
            onChangeText={handlePinChange}
            keyboardType="numeric"
            maxLength={6}
            secureTextEntry={true}
            autoFocus={true}
          />
          <View
            style={{
              gap: 15,
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View>
              <ActionButton action={handleSubmit} disabled={pin.length !== 6}>
                <Text className={styles.submitButtonText}>Submit</Text>
              </ActionButton>
            </View>
            <View>
              <TouchableOpacity onPress={handleClose}>
                <Text className={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalOverlay: 'flex-1 justify-center items-center bg-gray-100 bg-opacity-50',
  modalContent: 'w-4/5 bg-white p-5 rounded-lg items-center',
  title: 'text-lg mb-5 font-bold',
  pinInput: 'w-full p-2 text-2xl border border-gray-300 rounded text-center mb-5',
  submitButtonText: 'text-white text-lg',
  cancelButtonText: 'text-black text-lg text-center',
};

export default PinModal;
