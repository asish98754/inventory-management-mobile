export type RootStackParamList = {
  Dashboard: undefined;
  ProductList: undefined;
  ProductDetail: {
    productId: string;
  };
  ProductForm: {
    productId?: string;
  };
};
