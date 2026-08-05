export const PRODUCT_CATEGORIES = [
  "FRESH_FRUITS",
  "CITRUS",
  "BERRIES",
  "TROPICAL_FRUITS",
  "STONE_FRUITS",
  "MELONS",
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  FRESH_FRUITS: "#f44336",
  CITRUS: "#ffeb3b",
  BERRIES: "#9c27b0",
  TROPICAL_FRUITS: "#ff9800",
  STONE_FRUITS: "#ff7043",
  MELONS: "#4caf50",
};

export function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] ?? "#888888";
}
