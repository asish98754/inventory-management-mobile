import { VictoryPie } from "victory-native";
import { View, Text, StyleSheet } from "react-native";
import { getCategoryColor } from "../../constants/categories";

interface Props {
  data: {
    category: string;
    count: number;
  }[];
}

function formatCategoryLabel(category: string) {
  return category
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DashboardChart({
  data,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.legend}>
        {data.map((item) => (
          <View style={styles.legendItem} key={item.category}>
            <View
              style={[
                styles.colorBox,
                { backgroundColor: getCategoryColor(item.category) },
              ]}
            />
            <Text style={styles.legendText}>
              {formatCategoryLabel(item.category)}
            </Text>
          </View>
        ))}
      </View>

      <VictoryPie
        data={data.map((item) => ({
          x: item.category,
          y: item.count,
          category: item.category,
        }))}
        radius={120}
        labels={() => ""}
        style={{
          data: {
            fill: ({ datum }) => getCategoryColor(datum.category),
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 16,
    width: "100%",
  },
  legend: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    marginBottom: 10,
    marginHorizontal: 8,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
});
