import { ReactNode } from 'react'
import { View, ViewStyle } from 'react-native'

function ActionButton({ children, style, color, action, disabled }: {
  children: ReactNode;
  style?: ViewStyle;
  color?: string;
  action?: () => void;
  disabled?: boolean;
}) {
  return (
    <View
      className={styles.loginButton}
      style={{
        backgroundColor: color || '#005abb',
        ...style,
      }}
      onTouchEnd={disabled ? () => { } : action}
    >
      {children}
    </View>
  )
}

const styles = {
  loginButton: 'rounded-lg p-3 flex flex-row  justify-center items-center',
}

export default ActionButton