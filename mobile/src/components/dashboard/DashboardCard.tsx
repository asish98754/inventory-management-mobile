import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  value: number;
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    backgroundColor: "#fff",

    margin: 8,

    padding: 20,

    borderRadius: 12,

    alignItems: "center",

    elevation: 3,
  },

  value: {
    fontSize: 28,

    fontWeight: "bold",
  },

  title: {
    marginTop: 8,

    color: "#666",
  },
});
