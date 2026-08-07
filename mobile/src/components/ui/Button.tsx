import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
  textStyle?: object;
  color?: string;
  textColor?: string;
}

export default function Button({
  title,
  onPress,
  style,
  textStyle,
  color,
  textColor,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        color ? { backgroundColor: color } : null,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          textStyle,
          textColor ? { color: textColor } : null,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 160,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
