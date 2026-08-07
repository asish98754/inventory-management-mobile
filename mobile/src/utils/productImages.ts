const appleImage = require("../../assets/fruits/apple.jpg");
const bananaImage = require("../../assets/fruits/banana.jpg");
const orangeImage = require("../../assets/fruits/orange.jpg");
const grapesImage = require("../../assets/fruits/grapes.jpg");
const kiwiImage = require("../../assets/fruits/kiwi.jpg");
const mangoImage = require("../../assets/fruits/mango.jpg");
const pearImage = require("../../assets/fruits/pear.jpg");
const pineappleImage = require("../../assets/fruits/pineapple.jpg");
const watermelonImage = require("../../assets/fruits/watermelon.jpg");
const peachImage = require("../../assets/fruits/peach.jpg");
const strawberryImage = require("../../assets/fruits/strawberry.jpg");
const defaultImage = require("../../assets/fruits/default.jpg");

export const productImages: Record<string, any> = {
  apple: appleImage,
  "apple.jpg": appleImage,
  banana: bananaImage,
  "banana.jpg": bananaImage,
  orange: orangeImage,
  "orange.jpg": orangeImage,
  grapes: grapesImage,
  "grapes.jpg": grapesImage,
  kiwi: kiwiImage,
  "kiwi.jpg": kiwiImage,
  mango: mangoImage,
  "mango.jpg": mangoImage,
  pear: pearImage,
  "pear.jpg": pearImage,
  pineapple: pineappleImage,
  "pineapple.jpg": pineappleImage,
  watermelon: watermelonImage,
  "watermelon.jpg": watermelonImage,
  peach: peachImage,
  "peach.jpg": peachImage,
  strawberry: strawberryImage,
  "strawberry.jpg": strawberryImage,

  default: defaultImage,
};

export function getProductImageKey(value?: string | null): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toString().trim().toLowerCase();

  if (productImages[normalized]) {
    return normalized;
  }

  const aliases: Array<[string, string]> = [
    ["apple", "apple.jpg"],
    ["banana", "banana.jpg"],
    ["orange", "orange.jpg"],
    ["grape", "grapes.jpg"],
    ["grapes", "grapes.jpg"],
    ["kiwi", "kiwi.jpg"],
    ["mango", "mango.jpg"],
    ["pear", "pear.jpg"],
    ["pineapple", "pineapple.jpg"],
    ["watermelon", "watermelon.jpg"],
    ["peach", "peach.jpg"],
    ["strawberry", "strawberry.jpg"],
  ];

  return aliases.find(([name]) => normalized.includes(name))?.[1];
}
