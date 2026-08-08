import { useCallback, useRef, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";

import DashboardCard from "../../components/dashboard/DashboardCard";
import DashboardChart from "../../components/dashboard/DashboardChart";

import Loading from "../../components/ui/Loading";

import Button from "../../components/ui/Button";

import { DashboardService } from "../../services/dashboard.service";

import { DashboardStatistics } from "../../types/dashboard";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  const [statistics, setStatistics] =
    useState<DashboardStatistics>();

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);
  const scrollRef = useRef<ScrollView | null>(null);

  async function loadDashboard() {
    try {
      const data =
        await DashboardService.getStatistics();

      setStatistics(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  if (loading || !statistics) {
    return <Loading />;
  }

  return (
    <ScrollView
      ref={scrollRef}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);

            loadDashboard();
          }}
        />
      }
      contentContainerStyle={styles.container}
    >
      <View style={styles.row}>
        <DashboardCard
          title="Total Products"
          value={statistics.totalProducts}
        />

        <DashboardCard
          title="Out of Stock"
          value={statistics.outOfStock}
        />
      </View>

      <View style={styles.row}>
        <DashboardCard
          title="Low Stock"
          value={statistics.lowStock}
        />

        <DashboardCard
          title="Normal Stock"
          value={statistics.normalStock}
        />
      </View>

      <DashboardChart
        data={statistics.categories}
      />

      <Button
        title="View Products"
        onPress={() =>
          navigation.navigate("ProductsTab", {
            screen: "ProductList",
          })
        }
        color="#FF9800"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
  },

  row: {
    flexDirection: "row",
  },
});
