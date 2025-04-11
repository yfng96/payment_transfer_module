import React, { ReactNode } from 'react';
import { TextInput, View } from 'react-native';

interface CustomTextInputProps {
  editable?: boolean;
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
  onChangeText?: (text: string) => void;
  borderColor?: string;
  [key: string]: any;
}

function CustomTextInput({
  editable,
  value,
  placeholder,
  icon,
  borderColor,
  onChangeText,
  ...props
}: CustomTextInputProps) {
  return (
    <View
      className={styles.formField}
      style={{ borderColor: borderColor ?? '#005abb' }}
    >
      <View className='flex-1'>
        <TextInput
          style={[{ fontSize: 16, width: '100%', borderColor: '#005abb' }]}
          placeholder={placeholder ?? 'Enter value here'}
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          {...props}
        />
      </View>
      {icon}
    </View>
  );
}

const styles = {
  formField: `flex flex-row h-[60px] justify-between items-center border rounded-lg p-2.5 gap-2.5`,
};

export default CustomTextInput;