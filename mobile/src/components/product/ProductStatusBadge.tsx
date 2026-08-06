import { StyleSheet, Text, View } from "react-native";

interface Props {
  quantity: number;
  alertThreshold: number;
}

export default function ProductStatusBadge({
  quantity,
  alertThreshold,
}: Props) {
  const status =
    quantity === 0
      ? {
          text: "OUT OF STOCK",
          color: "#F44336",
        }
      : quantity <= alertThreshold
      ? {
          text: "LOW STOCK",
          color: "#FFC107",
        }
      : {
          text: "NORMAL STOCK",
          color: "#4CAF50",
        };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: status.color,
        },
      ]}
    >
      <Text style={styles.text}>
        {status.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
