export interface Product {
  id: string;
  name: string;
  reference: string;
  description: string;
  category: string;
  quantity: number;
  alertThreshold: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
