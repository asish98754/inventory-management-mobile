import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Text,
} from "react-native";

import {
  useEffect,
  useState,
} from "react";

import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import ProductCard from "../../components/cards/ProductCard";

import Loading from "../../components/ui/Loading";
import EmptyState from "../../components/ui/EmptyState";
import FloatingButton from "../../components/ui/FloatingButton";

import { PRODUCT_CATEGORIES } from "../../constants/categories";
import { Product } from "../../types/product";

import { ProductService } from "../../services/product.service";

export default function ProductListScreen() {
  const navigation = useNavigation<any>();

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("ALL");

  const [refreshing, setRefreshing] =
    useState(false);

  async function loadProducts() {
    try {
      const data =
        await ProductService.getAllProducts();

      setProducts(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "ALL" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchRow}>
        <TextInput
          placeholder="Search products..."
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("ProductForm")
          }
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        <Picker.Item
          label="All Categories"
          value="ALL"
        />

        {PRODUCT_CATEGORIES.map((item) => (
          <Picker.Item
            key={item}
            label={item}
            value={item}
          />
        ))}
      </Picker>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadProducts();
            }}
          />
        }
        ListEmptyComponent={<EmptyState />}
        ListFooterComponent={<View style={styles.footerSpacer} />}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate(
                "ProductDetail",
                {
                  productId: item.id,
                }
              )
            }
          />
        )}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },

  addButton: {
    marginLeft: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ff9800",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 12,
  },

  listContent: {
    paddingBottom: 36,
  },
  footerSpacer: {
    height: 40,
  },
});
