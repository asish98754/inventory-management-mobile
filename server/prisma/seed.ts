import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient, ProductCategory } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const fruitSeedData: Prisma.ProductCreateManyInput[] = [
  {
    name: "Apple",
    reference: "FR001",
    description: "Fresh Red Apple",
    category: ProductCategory.FRESH_FRUITS,
    quantity: 120,
    alertThreshold: 20,
    image: "apple.jpg",
  },
  {
    name: "Banana",
    reference: "FR002",
    description: "Fresh Banana",
    category: ProductCategory.TROPICAL_FRUITS,
    quantity: 80,
    alertThreshold: 15,
    image: "banana.jpg",
  },
  {
    name: "Orange",
    reference: "FR003",
    description: "Juicy Orange",
    category: ProductCategory.CITRUS,
    quantity: 60,
    alertThreshold: 10,
    image: "orange.jpg",
  },
  {
    name: "Mango",
    reference: "FR004",
    description: "Sweet Mango",
    category: ProductCategory.TROPICAL_FRUITS,
    quantity: 52,
    alertThreshold: 12,
    image: "mango.jpg",
  },
  {
    name: "Pineapple",
    reference: "FR005",
    description: "Juicy Pineapple",
    category: ProductCategory.TROPICAL_FRUITS,
    quantity: 46,
    alertThreshold: 10,
    image: "pineapple.jpg",
  },
  {
    name: "Strawberry",
    reference: "FR006",
    description: "Sweet Strawberry",
    category: ProductCategory.BERRIES,
    quantity: 95,
    alertThreshold: 18,
    image: "strawberry.jpg",
  },
  {
    name: "Blueberry",
    reference: "FR007",
    description: "Fresh Blueberry",
    category: ProductCategory.BERRIES,
    quantity: 70,
    alertThreshold: 14,
    image: "blueberry.jpg",
  },
  {
    name: "Grape",
    reference: "FR008",
    description: "Seedless Grape",
    category: ProductCategory.BERRIES,
    quantity: 88,
    alertThreshold: 16,
    image: "grape.jpg",
  },
  {
    name: "Peach",
    reference: "FR009",
    description: "Soft Peach",
    category: ProductCategory.STONE_FRUITS,
    quantity: 45,
    alertThreshold: 10,
    image: "peach.jpg",
  },
  {
    name: "Plum",
    reference: "FR010",
    description: "Purple Plum",
    category: ProductCategory.STONE_FRUITS,
    quantity: 38,
    alertThreshold: 8,
    image: "plum.jpg",
  },
  {
    name: "Watermelon",
    reference: "FR011",
    description: "Refreshing Watermelon",
    category: ProductCategory.MELONS,
    quantity: 32,
    alertThreshold: 7,
    image: "watermelon.jpg",
  },
  {
    name: "Kiwi",
    reference: "FR012",
    description: "Green Kiwi",
    category: ProductCategory.TROPICAL_FRUITS,
    quantity: 55,
    alertThreshold: 11,
    image: "kiwi.jpg",
  },
  {
    name: "Papaya",
    reference: "FR013",
    description: "Sweet Papaya",
    category: ProductCategory.TROPICAL_FRUITS,
    quantity: 40,
    alertThreshold: 9,
    image: "papaya.jpg",
  },
  {
    name: "Pear",
    reference: "FR014",
    description: "Juicy Pear",
    category: ProductCategory.FRESH_FRUITS,
    quantity: 65,
    alertThreshold: 12,
    image: "pear.jpg",
  },
  {
    name: "Dragon Fruit",
    reference: "FR015",
    description: "Exotic Dragon Fruit",
    category: ProductCategory.TROPICAL_FRUITS,
    quantity: 24,
    alertThreshold: 6,
    image: "dragonfruit.jpg",
  },
  {
    name: "Lemon",
    reference: "FR016",
    description: "Fresh Lemon",
    category: ProductCategory.CITRUS,
    quantity: 72,
    alertThreshold: 14,
    image: "lemon.jpg",
  },
  {
    name: "Guava",
    reference: "FR017",
    description: "Aromatic Guava",
    category: ProductCategory.TROPICAL_FRUITS,
    quantity: 34,
    alertThreshold: 8,
    image: "guava.jpg",
  },
  {
    name: "Cherry",
    reference: "FR018",
    description: "Sweet Cherry",
    category: ProductCategory.STONE_FRUITS,
    quantity: 57,
    alertThreshold: 10,
    image: "cherry.jpg",
  },
  {
    name: "Avocado",
    reference: "FR019",
    description: "Creamy Avocado",
    category: ProductCategory.TROPICAL_FRUITS,
    quantity: 43,
    alertThreshold: 9,
    image: "avocado.jpg",
  },
  {
    name: "Pomegranate",
    reference: "FR020",
    description: "Ruby Pomegranate",
    category: ProductCategory.TROPICAL_FRUITS,
    quantity: 36,
    alertThreshold: 8,
    image: "pomegranate.jpg",
  },
];

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: fruitSeedData,
    skipDuplicates: true,
  });

  console.log("✅ Database Seeded Successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
