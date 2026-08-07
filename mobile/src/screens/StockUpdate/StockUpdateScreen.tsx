import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { ProductService } from "../../services/product.service";

export default function StockUpdateScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { productId, type } = route.params;

  const [quantity, setQuantity] = useState("");

  function handleQuantityChange(text: string) {
    if (/^\d*$/.test(text)) {
      setQuantity(text);
    }
  }

  async function updateStock() {
    const qty = Number(quantity);

    if (!quantity || !/^\d+$/.test(quantity) || !Number.isInteger(qty) || qty <= 0) {
      Alert.alert(
        "Validation",
        "Please enter a valid quantity."
      );
      return;
    }

    try {
      await ProductService.updateStock(productId, {
        type,
        quantity: qty,
      });

      Alert.alert(
        "Success",
        `Stock ${type === "IN" ? "added" : "removed"} successfully.`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.message ??
          "Unable to update stock, Sorry for the inconvenience."
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === "IN" ? "Stock In" : "Stock Out"}
      </Text>

      <Text style={styles.label}>
        Quantity
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={handleQuantityChange}
      />

      <Button
        title="Update Stock"
        onPress={updateStock}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
});