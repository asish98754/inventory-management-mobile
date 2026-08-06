import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import ProductHeader from "../../components/product/ProductHeader";
import ProductInfoCard from "../../components/product/ProductInfoCard";
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

      <ProductStatusBadge
        quantity={product.quantity}
        alertThreshold={product.alertThreshold}
      />

      <ProductInfoCard
        label="Quantity"
        value={`${product.quantity}`}
      />

      <ProductInfoCard
        label="Alert Threshold"
        value={`${product.alertThreshold}`}
      />

      <ProductInfoCard
        label="Reference"
        value={product.reference}
      />

      <ProductInfoCard
        label="Description"
        value={product.description}
      />

      <ProductInfoCard
        label="Last Updated"
        value={new Date(product.updatedAt).toLocaleDateString()}
      />

      <View style={styles.buttonRow}>
        <Button
          title="Stock In"
          onPress={handleStockIn}
          style={[styles.button, styles.greenButton]}
        />
        <Button
          title="Stock Out"
          onPress={handleStockOut}
          style={[styles.button, styles.orangeButton]}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Edit"
          onPress={handleEdit}
          style={[styles.button, styles.blueButton]}
        />
        <Button
          title="Delete"
          onPress={handleDelete}
          style={[styles.button, styles.redButton]}
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
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
    height: 40,
  },
});
