import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import ProductListScreen from "../screens/ProductList/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetail/ProductDetailScreen";
import ProductFormScreen from "../screens/ProductForm/ProductFormScreen";
import StockUpdateScreen from "../screens/StockUpdate/StockUpdateScreen";

import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function ProductsStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Details" }}
      />
      <Stack.Screen
        name="ProductForm"
        component={ProductFormScreen}
        options={{ title: "Product" }}
      />
      <Stack.Screen
        name="StockUpdate"
        component={StockUpdateScreen}
        options={{ title: "Update Stock" }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#4CAF50",
          tabBarInactiveTintColor: "#777",
          tabBarIcon: ({ color, size }) => {
            let iconName: string = "";

            if (route.name === "DashboardTab") {
              iconName = "dashboard";
            } else if (route.name === "AddProductTab") {
              iconName = "add-circle";
            } else if (route.name === "ProductsTab") {
              iconName = "inventory";
            }

            return (
              <MaterialIcons
                name={iconName as any}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="DashboardTab"
          component={DashboardScreen}
          options={{
            title: "Dashboard",
            tabBarLabel: "Dashboard",
          }}
        />

        <Tab.Screen
          name="AddProductTab"
          component={ProductFormScreen}
          options={{
            title: "Add Product",
            tabBarLabel: "Add Product",
          }}
          initialParams={{ productId: undefined }}
        />

        <Tab.Screen
          name="ProductsTab"
          component={ProductsStack}
          options={{
            title: "View Products",
            tabBarLabel: "View Products",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
