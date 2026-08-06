import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import { Product } from "../../types/product";

interface Props {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({
  product,
  onPress,
}: Props) {

  const status =
    product.quantity === 0
      ? {
          label: "Out of Stock",
          color: "#F44336",
        }
      : product.quantity <=
        product.alertThreshold
      ? {
          label: "Low Stock",
          color: "#FFC107",
        }
      : {
          label: "Normal",
          color: "#4CAF50",
        };

  return (

    <Pressable
      style={styles.card}
      onPress={onPress}
    >

      <View style={styles.header}>

        <Text style={styles.name}>
          {product.name}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                status.color,
            },
          ]}
        >

          <Text
            style={styles.badgeText}
          >
            {status.label}
          </Text>

        </View>

      </View>

      <Text>
        {product.category}
      </Text>

      <Text>
        Ref: {product.reference}
      </Text>

      <Text>
        Quantity: {product.quantity}
      </Text>

    </Pressable>

  );
}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "white",

    padding: 16,

    borderRadius: 12,

    marginVertical: 8,

    elevation: 2,

  },

  header: {

    flexDirection: "row",

    justifyContent:
      "space-between",

    marginBottom: 8,

  },

  name: {

    fontSize: 18,

    fontWeight: "bold",

  },

  badge: {

    borderRadius: 12,

    paddingHorizontal: 10,

    paddingVertical: 4,

  },

  badgeText: {

    color: "white",

    fontSize: 12,

    fontWeight: "bold",

  },

});
