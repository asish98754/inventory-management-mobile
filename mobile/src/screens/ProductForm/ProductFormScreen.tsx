import { useCallback, useEffect, useRef, useState } from "react";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  Controller,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "../../components/forms/FormInput";

import { Picker } from "@react-native-picker/picker";

import Button from "../../components/ui/Button";

import Loading from "../../components/ui/Loading";

import {
  PRODUCT_CATEGORIES,
} from "../../constants/categories";

import {
  productSchema,
  ProductFormData,
} from "../../utils/productValidation";

import {
  ProductService,
} from "../../services/product.service";
import {
  getProductImageKey,
} from "../../utils/productImages";

export default function ProductFormScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const productId =
    route.params?.productId;

  const isEditMode =
    Boolean(productId);

  const [loading, setLoading] =
    useState(isEditMode);

  const [formMessage, setFormMessage] = useState("");
  const [formMessageType, setFormMessageType] = useState<
    "success" | "error" | "info"
  >("success");
  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef<ScrollView | null>(null);

  const defaultFormValues: ProductFormData = {
    name: "",
    reference: "",
    description: "",
    category: "",
    quantity: 0,
    alertThreshold: 0,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm<ProductFormData>({
    resolver: zodResolver(
      productSchema
    ),

    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (!productId) {
      return;
    }

    loadProduct();
  }, [productId]);

  useEffect(() => {
    if (isEditMode) {
      return;
    }

    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        reset(defaultFormValues);
        setFormMessage("");
      }
    );

    return unsubscribe;
  }, [isEditMode, navigation, reset]);

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  function handleNumericInputChange(
    text: string,
    onChange: (value: number) => void
  ) {
    if (text === "") {
      onChange(0);
      return;
    }

    if (/^\d*$/.test(text)) {
      onChange(Number(text));
    }
  }

  async function loadProduct() {
    try {
      const product =
        await ProductService.getProduct(
          productId
        );

      reset({
        name: product.name,
        reference: product.reference,
        description:
          product.description,
        category: product.category,
        quantity: product.quantity,
        alertThreshold:
          product.alertThreshold,
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to load product."
      );

      navigation.goBack();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);

    if (productId) {
      await loadProduct();
      return;
    }

    reset({
      name: "",
      reference: "",
      description: "",
      category: "",
      quantity: 0,
      alertThreshold: 0,
    });
    setRefreshing(false);
  }

  async function onSubmit(
    data: ProductFormData
  ) {
    setFormMessage("");

    const image = getProductImageKey(data.name);
    const payload = {
      ...data,
      ...(image ? { image } : {}),
    };

    try {
      if (isEditMode) {
        if (!isDirty) {
          setFormMessage("No changes to update.");
          setFormMessageType("info");
          return;
        }

        await ProductService.updateProduct(
          productId,
          payload
        );

        Alert.alert(
          "Success",
          "Product updated successfully.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]
        );

        return;
      }

      await ProductService.createProduct(
        payload
      );

      Alert.alert(
        "Success",
        "Product created successfully.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("ProductsTab" as any),
          },
        ]
      );
    } catch (error: any) {
      const apiErrors =
        error?.response?.data?.errors;
      const errorMessage =
        error?.response?.data?.message ??
        "Unable to save product.";

      const validationMessage = Array.isArray(apiErrors)
        ? apiErrors
            .map((entry: any) => entry.message)
            .filter(Boolean)
            .join("\n")
        : null;

      setFormMessage(
        validationMessage || errorMessage
      );
      setFormMessageType("error");
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.scrollView}
          contentContainerStyle={[
            styles.container,
            styles.scrollContent,
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <Text style={styles.title}>
            {isEditMode
              ? "Edit Product"
              : "Add Product"}
          </Text>

      {/* Name */}

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Product Name"
            placeholder="e.g. Apple"
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />

      {/* Reference */}

      <Controller
        control={control}
        name="reference"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Reference"
            placeholder="e.g. FRU-001"
            value={value}
            onChangeText={onChange}
            autoCapitalize="characters"
            error={errors.reference?.message}
          />
        )}
      />

      {/* Description */}

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Description"
            placeholder="Enter product description"
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            error={errors.description?.message}
          />
        )}
      />

      {/* Category */}

      <View style={styles.field}>
        <Text style={styles.label}>
          Category
        </Text>

        <View
          style={[
            styles.pickerContainer,
            errors.category &&
              styles.pickerError,
          ]}
        >
          <Controller
            control={control}
            name="category"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
              >
                <Picker.Item
                  label="Select category"
                  value=""
                />

                {PRODUCT_CATEGORIES.map(
                  (category) => (
                    <Picker.Item
                      key={category}
                      label={category}
                      value={category}
                    />
                  )
                )}
              </Picker>
            )}
          />
        </View>

        {errors.category?.message ? (
          <Text style={styles.error}>
            {errors.category.message}
          </Text>
        ) : null}
      </View>

      {/* Quantity */}

      <Controller
        control={control}
        name="quantity"
        render={({
          field: {
            onChange,
            value,
          },
        }) => (
          <FormInput
            label="Current Quantity"
            placeholder="0"
            keyboardType="number-pad"
            value={String(value)}
            onFocus={() =>
              scrollRef.current?.scrollToEnd({
                animated: true,
              })
            }
            onChangeText={(text) =>
              handleNumericInputChange(
                text,
                onChange
              )
            }
            error={
              errors.quantity?.message
            }
          />
        )}
      />

      {/* Alert Threshold */}

      <Controller
        control={control}
        name="alertThreshold"
        render={({
          field: {
            onChange,
            value,
          },
        }) => (
          <FormInput
            label="Alert Threshold"
            placeholder="e.g. 10"
            keyboardType="number-pad"
            value={String(value)}
            onFocus={() =>
              scrollRef.current?.scrollToEnd({
                animated: true,
              })
            }
            onChangeText={(text) =>
              handleNumericInputChange(
                text,
                onChange
              )
            }
            error={
              errors.alertThreshold
                ?.message
            }
          />
        )}
      />

        <View style={styles.button}>
          <Button
            title={
              isSubmitting
                ? "Saving..."
                : isEditMode
                ? "Update Product"
                : "Create Product"
            }
            onPress={handleSubmit(
              onSubmit
            )}
          />
        </View>

        {formMessage ? (
          <Text
            style={[
              styles.formMessage,
              formMessageType === "success"
                ? styles.successMessage
                : formMessageType === "error"
                ? styles.errorMessage
                : styles.infoMessage,
            ]}
          >
            {formMessage}
          </Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  scrollContent: {
    flexGrow: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 7,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },

  pickerError: {
    borderColor: "#F44336",
  },

  error: {
    color: "#F44336",
    fontSize: 13,
    marginTop: 5,
  },

  button: {
    marginTop: 10,
  },

  formMessage: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 15,
  },
  successMessage: {
    color: "#4CAF50",
  },
  errorMessage: {
    color: "#F44336",
  },
  infoMessage: {
    color: "#FF9800",
  },
});