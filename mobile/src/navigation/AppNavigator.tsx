import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import ProductListScreen from "../screens/ProductList/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetail/ProductDetailScreen";
import ProductFormScreen from "../screens/ProductForm/ProductFormScreen";

import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: "Dashboard",
          }}
        />

        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{
            title: "Products",
          }}
        />

        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            title: "Product Details",
          }}
        />

        <Stack.Screen
          name="ProductForm"
          component={ProductFormScreen}
          options={{
            title: "Product",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
