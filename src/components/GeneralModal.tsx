import { ReactNode } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import ActionButton from './ActionButton';

const GeneralModal = ({
  isOpen,
  handleClose,
  icon,
  showCancelButton,
  handleProceed,
  children,
  proceedLabel,
  cancelLabel,
}: {
  isOpen: boolean;
  handleClose: () => void;
  icon?: ReactNode;
  showCancelButton?: boolean;
  handleProceed: () => void;
  children: ReactNode;
  proceedLabel?: string;
  cancelLabel?: string;
}) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={handleClose}
    >
      <View
        className={styles.modalOverlay}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <View className={styles.modalContent}>
          {icon}
          {children}

          <View
            style={{
              gap: 15,
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View>
              <ActionButton action={handleProceed}>
                <Text className={styles.submitButtonText}>{proceedLabel ?? 'OK'}</Text>
              </ActionButton>
            </View>
            {showCancelButton && (
              <View>
                <TouchableOpacity onPress={handleClose}>
                  <Text className={styles.cancelButtonText}>{cancelLabel ?? 'Cancel'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalOverlay: 'flex-1 justify-center items-center bg-gray-100 bg-opacity-50',
  modalContent: 'w-4/5 bg-white p-5 rounded-lg items-center gap-5',
  title: 'text-lg mb-5 font-bold',
  pinInput: 'w-full p-2 text-2xl border border-gray-300 rounded text-center mb-5',
  submitButtonText: 'text-white text-lg',
  cancelButtonText: 'text-black text-lg text-center',
};

export default GeneralModal;
