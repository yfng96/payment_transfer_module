import { ReactNode } from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'

interface ActionButtonProps {
  children: ReactNode;
  style?: ViewStyle;
  color?: string;
  action?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  alignment?: 'start' | 'end' | 'center';
}

export default function ActionButton({
  children,
  style,
  color = '#005abb',
  action,
  disabled = false,
  icon,
  alignment
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={`w-full py-3 px-4 rounded-lg justify-center ${alignment ? `items-${alignment}` : 'items-center'} relative`}
      style={[
        color ? { backgroundColor: color } : { backgroundColor: '#005abb' },
        style,
      ]}
      onPress={action}
      disabled={disabled}
    >
      {icon && <View className='absolute left-2'>{icon}</View>}
      {children}
    </TouchableOpacity>
  );
}

const styles = {
  button: 'rounded-lg p-3 flex flex-row justify-center items-center',
}
