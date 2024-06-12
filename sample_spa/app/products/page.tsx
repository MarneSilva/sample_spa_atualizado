import AddProduct from "@/components/AddProduct";
import ListProduct from "@/components/ListProduct";
import { ProductContextProvider } from "@/context/ProductContext";

const Products = async ({}) => {
  return (
    <main className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-light tracking-wide text-center pt-8 pb-10">
        Lista de produtos
      </h1>

      <div className="grid place-items-center">
        <ProductContextProvider>
          <ListProduct />
          <AddProduct />
        </ProductContextProvider>
      </div>
    </main>
  );
};

export default Products;