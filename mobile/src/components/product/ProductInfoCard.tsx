import { StyleSheet, Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
}

export default function ProductInfoCard({
  label,
  value,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  label: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 6,
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212121",
  },
});
