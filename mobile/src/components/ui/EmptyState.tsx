import { Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View
      style={{
        padding: 30,
        alignItems: "center",
      }}
    >
      <Text>No products found.</Text>
    </View>
  );
}
