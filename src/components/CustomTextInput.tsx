import React, { ReactNode } from 'react'
import { TextInput, View } from 'react-native';

interface CustomTextInputProps {
  editable?: boolean;
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
  onChangeText?: (text: string) => void;
  [key: string]: any;
}

function CustomTextInput({ editable, value, placeholder, icon, onChangeText, ...props }: CustomTextInputProps) {
  return (
    <View className={styles.formField}>
      <View className='flex-1'>
        <TextInput
          className='text-[16px] w-full'
          placeholder={placeholder ?? 'Enter value here'}
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          {...props}
        />
      </View>
      {icon}
    </View>
  )
}


const styles = {
  formField: `flex flex-row h-[60px] justify-between items-center border border-[#005abb] rounded-lg p-2.5 gap-2.5`,
};

export default CustomTextInput