import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native';
import { Text, View } from 'react-native';

function PriceInput({
  value,
  onChangeText,
  error,
}: {
  value: string;
  onChangeText: (text: string) => void;
  error?: string | null;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const cursorOpacity = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    let animation: Animated.CompositeAnimation | undefined;

    if (isFocused) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(cursorOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    } else {
      cursorOpacity.setValue(0);
    }
    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isFocused, cursorOpacity]);

  const handleTextLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width);
  };

  return (
    <View
      className={`${styles.formField} ${error ? styles.errorBorder : styles.defaultBorder}`}
    >
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <View className={styles.inputContainer}>
          <Text className={styles.amountText} onLayout={handleTextLayout}>
            RM {value}
          </Text>
          {isFocused && (
            <Animated.Text
              className={styles.cursor}
              style={{
                opacity: cursorOpacity,
                left: textWidth + 2, // Adjust spacing as needed
              }}
            >
              |
            </Animated.Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View className={styles.transparentInputWrapper}>
        <View pointerEvents="none">
          <TextInput
            ref={inputRef}
            className={styles.transparentInput}
            placeholder="Enter amount"
            keyboardType="numeric"
            onChangeText={onChangeText}
            caretHidden={true}
            selectTextOnFocus={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = {
  formField: `flex flex-row h-[60px] justify-between items-center rounded-lg p-2.5 gap-2.5`,
  defaultBorder: `border border-[#005abb]`,
  errorBorder: `border border-red-500`,
  inputContainer: `flex-row items-center relative w-full`,
  amountText: `text-lg text-black ml-1`,
  transparentInputWrapper: `absolute left-2 top-3 w-full`,
  transparentInput: `text-lg text-transparent py-1 opacity-0 bg-black`,
  cursor: "position absolute text-[18px] text-[#005abb] font-bold",
};

export default PriceInput;
