import { Text, TextStyle, StyleProp } from 'react-native';
import { ReactNode } from 'react';

export default function CustomTextBold({
  children,
  style,
  className
}: {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
}) {
  return (
    <Text
      style={[
        { fontFamily: 'Roboto_700Bold' },
        style,
      ]}
      className={className}
    >
      {children}
    </Text>
  );
}