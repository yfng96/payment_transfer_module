import { Text, TextStyle, StyleProp } from 'react-native';
import { ReactNode } from 'react';

export default function CustomText({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
}) {
  return (
    <Text
      style={[
        { fontFamily: (style as TextStyle)?.fontWeight === 'bold' ? 'Roboto_700Bold' : 'Roboto_400Regular' },
        style,
      ]}
      className={className}
    >
      {children}
    </Text>
  );
}