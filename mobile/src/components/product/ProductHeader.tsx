import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  image: any;
  name: string;
  category: string;
}

export default function ProductHeader({
  image,
  name,
  category,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.category}>
        {category}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 24,
  },

  imageContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  image: {
    width: 150,
    height: 150,
  },

  name: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2E7D32",
  },

  category: {
    fontSize: 16,
    color: "#757575",
    marginTop: 6,
  },
});
