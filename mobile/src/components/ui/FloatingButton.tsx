import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface Props {
  onPress: () => void;
  style?: ViewStyle;
  color?: string;
}

export default function FloatingButton({
  onPress,
  style,
  color = "#ff9800",
}: Props) {

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        +
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
