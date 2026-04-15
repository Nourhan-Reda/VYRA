export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "women" | "men" | "children";
  stock:number;
  price:number;
}