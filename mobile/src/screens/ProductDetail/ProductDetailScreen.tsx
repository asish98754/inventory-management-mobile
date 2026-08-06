import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import ProductHeader from "../../components/product/ProductHeader";
import ProductStatusBadge from "../../components/product/ProductStatusBadge";
import Button from "../../components/ui/Button";
import Loading from "../../components/ui/Loading";
import { ProductService } from "../../services/product.service";
import { productImages } from "../../utils/productImages";

export default function ProductDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const productId = route.params?.productId;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await ProductService.getProduct(productId);
        setProduct(data);
      } catch (error) {
        Alert.alert("Error", "Unable to load product details.");
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <Loading />;
  }

  const imageKey = product.image?.toString().toLowerCase();
  const imageSource =
    imageKey && productImages[imageKey]
      ? productImages[imageKey]
      : productImages.default;

  function handleStockIn() {
    Alert.alert("Stock In", "Stock In action not implemented yet.");
  }

  function handleStockOut() {
    Alert.alert("Stock Out", "Stock Out action not implemented yet.");
  }

  function handleEdit() {
    navigation.navigate("ProductForm", { productId: product.id });
  }

  function handleDelete() {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => Alert.alert("Deleted", "Product deletion not implemented."),
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ProductHeader
          image={imageSource}
          name={product.name}
          category={product.category}
        />

      <View style={styles.statusActionsRow}>
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <Text style={styles.iconText}>✏️</Text>
        </TouchableOpacity>

        <View style={styles.statusCenter}>
          <ProductStatusBadge
            quantity={product.quantity}
            alertThreshold={product.alertThreshold}
          />
        </View>

        <TouchableOpacity onPress={handleDelete} style={[styles.iconButton, styles.deleteIconButton]}>
          <Text style={styles.iconText}>🗑</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Quantity</Text>
          <Text style={styles.infoValue}>{product.quantity}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Alert Threshold</Text>
          <Text style={styles.infoValue}>{product.alertThreshold}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Reference</Text>
          <Text style={styles.infoValue}>{product.reference}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Description</Text>
          <Text style={styles.infoValue}>{product.description}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Last Updated</Text>
          <Text style={styles.infoValue}>{new Date(product.updatedAt).toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.circleButtonRow}>
        <Button
          title="Stock In"
          onPress={handleStockIn}
          style={[styles.circleButton, styles.greenButton]}
          textStyle={styles.circleButtonText}
        />
        <Button
          title="Stock Out"
          onPress={handleStockOut}
          style={[styles.circleButton, styles.orangeButton]}
          textStyle={styles.circleButtonText}
        />
      </View>

      <View style={styles.footerSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    paddingBottom: 24,
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 15,
    color: "#757575",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 15,
    color: "#212121",
    maxWidth: "60%",
    textAlign: "right",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  statusActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  circleButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  circleButton: {
    width: 30,
    height: 60,
    borderRadius: 65,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  circleButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  statusCenter: {
    flex: 1,
    alignItems: "center",
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  deleteIconButton: {
    backgroundColor: "#FFEDED",
  },
  iconText: {
    fontSize: 24,
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 10,
    color: "#333",
    fontWeight: "600",
  },
  greenButton: {
    backgroundColor: "#4CAF50",
  },
  orangeButton: {
    backgroundColor: "#FF9800",
  },
  blueButton: {
    backgroundColor: "#2196F3",
  },
  redButton: {
    backgroundColor: "#F44336",
  },
  footerSpacer: {
    height: 20,
  },
});
